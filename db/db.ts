/**
 * Database configuration and schema exports
 */
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { users, products, subscriptions } from '@/db/schema';
import { supabase } from '@/lib/db';

// Get connection string from environment variables
const connectionString = process.env.DATABASE_URL;

// Validate connection string
if (!connectionString) {
  console.warn('DATABASE_URL is not defined. Database operations will not work.');
}

// Create postgres connection
const client = postgres(connectionString || '', {
  prepare: false,
  ssl: 'require',
});

// Create drizzle client
export const db = drizzle(client, {
  schema: {
    users,
    products,
    subscriptions
  }
});

// Export schema for use in other files
export const schema = {
  users,
  products,
  subscriptions
};

// Export supabase client
export { supabase }; 