/**
 * User schema synchronized with Clerk authentication
 */
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

/**
 * Users table schema
 * This table stores user data synchronized from Clerk
 */
export const users = pgTable('users', {
  // Primary key
  id: uuid('id').primaryKey().defaultRandom(),
  
  // Clerk user ID (for linking with Clerk)
  clerkId: text('clerk_id').notNull().unique(),
  
  // User information
  email: text('email').notNull().unique(),
  firstName: text('first_name'),
  lastName: text('last_name'),
  imageUrl: text('image_url'),
  bio: text('bio'),
  
  // Stripe information
  stripeCustomerId: text('stripe_customer_id').unique(),
  
  // Timestamps
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect; 