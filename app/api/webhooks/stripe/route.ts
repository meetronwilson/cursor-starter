/**
 * Stripe webhook handler
 * Processes events from Stripe and updates the database accordingly
 */
import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { db } from '@/db';
import { subscriptions } from '@/db/schema/subscriptions-schema';
import { users } from '@/db/schema/users-schema';
import { eq } from 'drizzle-orm';
import Stripe from 'stripe';

// Stripe webhook secret for verifying events
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

/**
 * POST handler for Stripe webhooks
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get('stripe-signature') || '';

    if (!signature || !webhookSecret) {
      return new NextResponse('Webhook signature or secret missing', { status: 400 });
    }

    // Verify the event came from Stripe
    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret);

    // Handle different event types
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        
        // Update the user's subscription status
        if (session.customer && session.subscription) {
          await handleSubscriptionCreated(
            typeof session.customer === 'string' ? session.customer : session.customer.id,
            typeof session.subscription === 'string' ? session.subscription : session.subscription.id
          );
        }
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        
        // Update the subscription in the database
        if (subscription.customer) {
          await handleSubscriptionUpdated(
            typeof subscription.customer === 'string' ? subscription.customer : subscription.customer.id,
            subscription
          );
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        
        // Mark the subscription as canceled in the database
        if (subscription.customer) {
          await handleSubscriptionDeleted(
            typeof subscription.customer === 'string' ? subscription.customer : subscription.customer.id,
            subscription.id
          );
        }
        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice;
        
        // Update the subscription payment status
        if (invoice.customer && invoice.subscription) {
          await handleInvoicePaymentSucceeded(
            typeof invoice.customer === 'string' ? invoice.customer : invoice.customer.id,
            typeof invoice.subscription === 'string' ? invoice.subscription : invoice.subscription.id
          );
        }
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        
        // Handle failed payment
        if (invoice.customer && invoice.subscription) {
          await handleInvoicePaymentFailed(
            typeof invoice.customer === 'string' ? invoice.customer : invoice.customer.id,
            typeof invoice.subscription === 'string' ? invoice.subscription : invoice.subscription.id
          );
        }
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Stripe webhook error:', error);
    return new NextResponse('Webhook error', { status: 400 });
  }
}

/**
 * Handle subscription created event
 */
async function handleSubscriptionCreated(customerId: string, subscriptionId: string) {
  try {
    // Get the subscription details from Stripe
    const subscriptionData = await stripe.subscriptions.retrieve(subscriptionId);
    
    // Find the user with this Stripe customer ID
    const user = await db.query.users.findFirst({
      where: eq(users.stripeCustomerId, customerId),
    });

    if (!user) {
      console.error(`No user found with Stripe customer ID: ${customerId}`);
      return;
    }

    // Get the product ID from the price
    const priceId = subscriptionData.items.data[0]?.price.id;
    const productId = subscriptionData.items.data[0]?.price.product as string;
    
    // Create or update the subscription in the database
    await db
      .insert(subscriptions)
      .values({
        userId: user.id,
        productId: productId, // This should be a reference to a product in your database
        stripeSubscriptionId: subscriptionId,
        stripeCustomerId: customerId,
        stripePriceId: priceId,
        isActive: subscriptionData.status === 'active',
        currentPeriodStart: new Date(subscriptionData.current_period_start * 1000),
        currentPeriodEnd: new Date(subscriptionData.current_period_end * 1000),
        cancelAtPeriodEnd: subscriptionData.cancel_at_period_end,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: subscriptions.stripeSubscriptionId,
        set: {
          isActive: subscriptionData.status === 'active',
          stripePriceId: priceId,
          currentPeriodStart: new Date(subscriptionData.current_period_start * 1000),
          currentPeriodEnd: new Date(subscriptionData.current_period_end * 1000),
          cancelAtPeriodEnd: subscriptionData.cancel_at_period_end,
          updatedAt: new Date(),
        },
      });

    console.log(`Subscription created for user: ${user.id}`);
  } catch (error) {
    console.error('Error handling subscription created:', error);
  }
}

/**
 * Handle subscription updated event
 */
async function handleSubscriptionUpdated(customerId: string, subscriptionData: Stripe.Subscription) {
  try {
    // Find the user with this Stripe customer ID
    const user = await db.query.users.findFirst({
      where: eq(users.stripeCustomerId, customerId),
    });

    if (!user) {
      console.error(`No user found with Stripe customer ID: ${customerId}`);
      return;
    }

    // Get the price ID from the subscription
    const priceId = subscriptionData.items.data[0]?.price.id;
    
    // Update the subscription in the database
    await db
      .update(subscriptions)
      .set({
        isActive: subscriptionData.status === 'active',
        stripePriceId: priceId,
        currentPeriodStart: new Date(subscriptionData.current_period_start * 1000),
        currentPeriodEnd: new Date(subscriptionData.current_period_end * 1000),
        cancelAtPeriodEnd: subscriptionData.cancel_at_period_end,
        updatedAt: new Date(),
      })
      .where(eq(subscriptions.stripeSubscriptionId, subscriptionData.id));

    console.log(`Subscription updated for user: ${user.id}`);
  } catch (error) {
    console.error('Error handling subscription updated:', error);
  }
}

/**
 * Handle subscription deleted event
 */
async function handleSubscriptionDeleted(customerId: string, subscriptionId: string) {
  try {
    // Find the user with this Stripe customer ID
    const user = await db.query.users.findFirst({
      where: eq(users.stripeCustomerId, customerId),
    });

    if (!user) {
      console.error(`No user found with Stripe customer ID: ${customerId}`);
      return;
    }

    // Update the subscription status to canceled
    await db
      .update(subscriptions)
      .set({
        isActive: false,
        canceledAt: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(subscriptions.stripeSubscriptionId, subscriptionId));

    console.log(`Subscription canceled for user: ${user.id}`);
  } catch (error) {
    console.error('Error handling subscription deleted:', error);
  }
}

/**
 * Handle invoice payment succeeded event
 */
async function handleInvoicePaymentSucceeded(customerId: string, subscriptionId: string) {
  try {
    // Find the user with this Stripe customer ID
    const user = await db.query.users.findFirst({
      where: eq(users.stripeCustomerId, customerId),
    });

    if (!user) {
      console.error(`No user found with Stripe customer ID: ${customerId}`);
      return;
    }

    // Update the subscription in the database
    await db
      .update(subscriptions)
      .set({
        isActive: true,
        updatedAt: new Date(),
      })
      .where(eq(subscriptions.stripeSubscriptionId, subscriptionId));

    console.log(`Payment succeeded for subscription: ${subscriptionId}`);
  } catch (error) {
    console.error('Error handling invoice payment succeeded:', error);
  }
}

/**
 * Handle invoice payment failed event
 */
async function handleInvoicePaymentFailed(customerId: string, subscriptionId: string) {
  try {
    // Find the user with this Stripe customer ID
    const user = await db.query.users.findFirst({
      where: eq(users.stripeCustomerId, customerId),
    });

    if (!user) {
      console.error(`No user found with Stripe customer ID: ${customerId}`);
      return;
    }

    // Update the subscription status
    await db
      .update(subscriptions)
      .set({
        isActive: false,
        updatedAt: new Date(),
      })
      .where(eq(subscriptions.stripeSubscriptionId, subscriptionId));

    console.log(`Payment failed for subscription: ${subscriptionId}`);
  } catch (error) {
    console.error('Error handling invoice payment failed:', error);
  }
} 