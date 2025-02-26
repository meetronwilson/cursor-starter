/**
 * Stripe client and utilities for payment processing and subscriptions
 */
import Stripe from 'stripe';
import { ApiError } from './error';

// Initialize Stripe client with API key
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  console.error('Missing STRIPE_SECRET_KEY environment variable');
}

// Create Stripe instance
export const stripe = new Stripe(stripeSecretKey || '', {
  apiVersion: '2025-02-24.acacia', // Use the latest API version
  appInfo: {
    name: 'Next.js Starter Template',
    version: '1.0.0',
  },
});

/**
 * Create a Stripe customer
 */
export async function createCustomer(email: string, name?: string, metadata?: Record<string, string>) {
  try {
    return await stripe.customers.create({
      email,
      name,
      metadata,
    });
  } catch (error) {
    console.error('Error creating Stripe customer:', error);
    throw new ApiError('Failed to create customer', 500);
  }
}

/**
 * Retrieve a Stripe customer
 */
export async function getCustomer(customerId: string) {
  try {
    return await stripe.customers.retrieve(customerId);
  } catch (error) {
    console.error('Error retrieving Stripe customer:', error);
    throw new ApiError('Failed to retrieve customer', 500);
  }
}

/**
 * Create a Stripe checkout session
 */
export async function createCheckoutSession({
  customerId,
  priceId,
  successUrl,
  cancelUrl,
  metadata,
}: {
  customerId: string;
  priceId: string;
  successUrl: string;
  cancelUrl: string;
  metadata?: Record<string, string>;
}) {
  try {
    return await stripe.checkout.sessions.create({
      customer: customerId,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata,
    });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw new ApiError('Failed to create checkout session', 500);
  }
}

/**
 * Create a Stripe customer portal session
 */
export async function createPortalSession(customerId: string, returnUrl: string) {
  try {
    return await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: returnUrl,
    });
  } catch (error) {
    console.error('Error creating portal session:', error);
    throw new ApiError('Failed to create portal session', 500);
  }
}

/**
 * Retrieve a subscription
 */
export async function getSubscription(subscriptionId: string) {
  try {
    return await stripe.subscriptions.retrieve(subscriptionId);
  } catch (error) {
    console.error('Error retrieving subscription:', error);
    throw new ApiError('Failed to retrieve subscription', 500);
  }
}

/**
 * List all active products with prices
 */
export async function listProductsWithPrices() {
  try {
    // Get all active products
    const products = await stripe.products.list({
      active: true,
      expand: ['data.default_price'],
    });

    // Get all prices for each product
    const productsWithPrices = await Promise.all(
      products.data.map(async (product) => {
        const prices = await stripe.prices.list({
          product: product.id,
          active: true,
        });

        return {
          ...product,
          prices: prices.data,
        };
      })
    );

    return productsWithPrices;
  } catch (error) {
    console.error('Error listing products with prices:', error);
    throw new ApiError('Failed to list products', 500);
  }
} 