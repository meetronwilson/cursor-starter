/**
 * API route for syncing Stripe data with the database
 * This is an admin-only endpoint that should be protected in production
 */
import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { db } from '@/db';
import { subscriptions } from '@/db/schema/subscriptions-schema';
import { users } from '@/db/schema/users-schema';
import { products } from '@/db/schema/products-schema';
import { eq } from 'drizzle-orm';
import Stripe from 'stripe';
import crypto from 'crypto';

/**
 * POST handler for syncing Stripe data
 */
export async function POST() {
  try {
    // In production, you should add authentication here
    // to ensure only admins can access this endpoint
    
    const results = {
      subscriptions: 0,
      products: 0,
      errors: [] as string[],
    };

    // 1. Get all subscriptions from Stripe
    // We'll only expand customer to avoid the 4-level expansion limit
    const stripeSubscriptions = await stripe.subscriptions.list({
      status: 'all',
      expand: ['data.customer'],
    });

    // 2. Process each subscription
    for (const subscription of stripeSubscriptions.data) {
      try {
        const customerId = typeof subscription.customer === 'string' 
          ? subscription.customer 
          : subscription.customer.id;
        
        // 3. Find the user with this Stripe customer ID
        const user = await db.query.users.findFirst({
          where: eq(users.stripeCustomerId, customerId),
        });

        if (!user) {
          results.errors.push(`No user found with Stripe customer ID: ${customerId}`);
          continue;
        }

        // 4. Get the subscription items to access price and product
        // We need to retrieve the subscription again with different expansion
        const subscriptionWithItems = await stripe.subscriptions.retrieve(
          subscription.id,
          {
            expand: ['items.data.price.product'],
          }
        );

        const subscriptionItem = subscriptionWithItems.items.data[0];
        if (!subscriptionItem) {
          results.errors.push(`No subscription items found for subscription: ${subscription.id}`);
          continue;
        }

        const priceId = subscriptionItem.price.id;
        const productObject = subscriptionItem.price.product;
        const productId = typeof productObject === 'string' ? productObject : productObject?.id;

        if (!productId) {
          results.errors.push(`No product ID found for subscription: ${subscription.id}`);
          continue;
        }

        // 5. Ensure the product exists in our database
        const existingProduct = await db.query.products.findFirst({
          where: eq(products.stripeProductId, productId),
        });

        let dbProductId: string;

        if (!existingProduct) {
          // Create the product in our database
          const stripeProduct = typeof productObject === 'string' 
            ? await stripe.products.retrieve(productObject)
            : (productObject as Stripe.Product);

          const price = subscriptionItem.price.unit_amount || 0;

          // Generate a new UUID for the product
          const newProductId = crypto.randomUUID();
          
          await db.insert(products).values({
            id: newProductId,
            stripeProductId: productId,
            name: stripeProduct.name,
            description: stripeProduct.description || '',
            price: price,
            isActive: stripeProduct.active,
            stripePriceId: priceId,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
          
          dbProductId = newProductId;
          results.products++;
        } else {
          dbProductId = existingProduct.id;
        }

        // 6. Create or update the subscription in the database
        await db
          .insert(subscriptions)
          .values({
            userId: user.id,
            productId: dbProductId,
            stripeSubscriptionId: subscription.id,
            stripeCustomerId: customerId,
            stripePriceId: priceId,
            isActive: subscription.status === 'active',
            currentPeriodStart: new Date(subscription.current_period_start * 1000),
            currentPeriodEnd: new Date(subscription.current_period_end * 1000),
            cancelAtPeriodEnd: subscription.cancel_at_period_end,
            createdAt: new Date(subscription.created * 1000),
            updatedAt: new Date(),
          })
          .onConflictDoUpdate({
            target: subscriptions.stripeSubscriptionId,
            set: {
              isActive: subscription.status === 'active',
              stripePriceId: priceId,
              currentPeriodStart: new Date(subscription.current_period_start * 1000),
              currentPeriodEnd: new Date(subscription.current_period_end * 1000),
              cancelAtPeriodEnd: subscription.cancel_at_period_end,
              updatedAt: new Date(),
            },
          });

        results.subscriptions++;
      } catch (error) {
        results.errors.push(`Error processing subscription ${subscription.id}: ${error}`);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Stripe data synced successfully',
      results,
    });
  } catch (error) {
    console.error('Error syncing Stripe data:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to sync Stripe data',
      },
      { status: 500 }
    );
  }
}

/**
 * GET handler for checking sync status
 */
export async function GET() {
  try {
    // Get counts from database
    const subscriptionCount = await db.select({ count: { count: subscriptions.id } }).from(subscriptions);
    const productCount = await db.select({ count: { count: products.id } }).from(products);
    
    // Get counts from Stripe - no need for expansion here
    const stripeSubscriptions = await stripe.subscriptions.list({ limit: 100 });
    const stripeProducts = await stripe.products.list({ limit: 100 });
    
    return NextResponse.json({
      success: true,
      database: {
        subscriptions: subscriptionCount[0]?.count?.count || 0,
        products: productCount[0]?.count?.count || 0,
      },
      stripe: {
        subscriptions: stripeSubscriptions.data.length,
        products: stripeProducts.data.length,
      },
    });
  } catch (error) {
    console.error('Error checking sync status:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to check sync status',
      },
      { status: 500 }
    );
  }
} 