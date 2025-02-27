/**
 * Script to sync Stripe subscriptions with the database
 * Run this script to manually sync subscriptions from Stripe to the database
 */
import { stripe } from '@/lib/stripe';
import { db } from '@/db';
import { subscriptions } from '@/db/schema/subscriptions-schema';
import { users } from '@/db/schema/users-schema';
import { products } from '@/db/schema/products-schema';
import { eq } from 'drizzle-orm';
import Stripe from 'stripe';
import crypto from 'crypto';

async function syncStripeSubscriptions() {
  try {
    console.log('Starting Stripe subscription sync...');

    // 1. Get all subscriptions from Stripe
    // We'll only expand customer to avoid the 4-level expansion limit
    const stripeSubscriptions = await stripe.subscriptions.list({
      status: 'all',
      expand: ['data.customer'],
    });

    console.log(`Found ${stripeSubscriptions.data.length} subscriptions in Stripe`);

    // 2. Process each subscription
    for (const subscription of stripeSubscriptions.data) {
      const customerId = typeof subscription.customer === 'string' 
        ? subscription.customer 
        : subscription.customer.id;
      
      // 3. Find the user with this Stripe customer ID
      const user = await db.query.users.findFirst({
        where: eq(users.stripeCustomerId, customerId),
      });

      if (!user) {
        console.warn(`No user found with Stripe customer ID: ${customerId}`);
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
        console.warn(`No subscription items found for subscription: ${subscription.id}`);
        continue;
      }

      const priceId = subscriptionItem.price.id;
      const productObject = subscriptionItem.price.product;
      const productId = typeof productObject === 'string' ? productObject : productObject?.id;

      if (!productId) {
        console.warn(`No product ID found for subscription: ${subscription.id}`);
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
        console.log(`Created product: ${stripeProduct.name}`);
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

      console.log(`Synced subscription: ${subscription.id} for user: ${user.id}`);
    }

    console.log('Stripe subscription sync completed successfully');
  } catch (error) {
    console.error('Error syncing Stripe subscriptions:', error);
  }
}

// Run the sync function
syncStripeSubscriptions()
  .then(() => {
    console.log('Sync completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Sync failed:', error);
    process.exit(1);
  }); 