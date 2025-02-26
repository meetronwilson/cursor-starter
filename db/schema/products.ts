/**
 * Products schema for the application
 */
import { pgTable, text, timestamp, uuid, integer, boolean } from 'drizzle-orm/pg-core';

/**
 * Products table schema
 * This table stores product information
 */
export const products = pgTable('products', {
  // Primary key
  id: uuid('id').primaryKey().defaultRandom(),
  
  // Product information
  name: text('name').notNull(),
  description: text('description'),
  imageUrl: text('image_url'),
  
  // Pricing
  price: integer('price').notNull(), // Price in cents
  
  // Product status
  isActive: boolean('is_active').default(true).notNull(),
  
  // Stripe product ID (for linking with Stripe)
  stripeProductId: text('stripe_product_id').unique(),
  stripePriceId: text('stripe_price_id'),
  
  // Timestamps
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}); 