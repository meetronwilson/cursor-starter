/**
 * Subscriptions schema for Stripe integration
 */
import { pgTable, text, timestamp, uuid, boolean } from 'drizzle-orm/pg-core';
import { users } from './users';
import { products } from './products';

/**
 * Subscriptions table schema
 * This table stores subscription information linked to Stripe
 */
export const subscriptions = pgTable('subscriptions', {
  // Primary key
  id: uuid('id').primaryKey().defaultRandom(),
  
  // User relationship
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  
  // Product relationship
  productId: uuid('product_id').notNull().references(() => products.id),
  
  // Stripe subscription information
  stripeSubscriptionId: text('stripe_subscription_id').unique(),
  stripeCustomerId: text('stripe_customer_id'),
  stripePriceId: text('stripe_price_id'),
  
  // Subscription status
  isActive: boolean('is_active').default(true).notNull(),
  
  // Subscription period
  currentPeriodStart: timestamp('current_period_start'),
  currentPeriodEnd: timestamp('current_period_end'),
  
  // Cancellation
  cancelAtPeriodEnd: boolean('cancel_at_period_end').default(false),
  canceledAt: timestamp('canceled_at'),
  
  // Timestamps
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}); 