# Stripe Sync Troubleshooting

This document provides troubleshooting information for common issues encountered when syncing Stripe data with your application's database.

## Common Errors

### 1. "No user found with Stripe customer ID: cus_XXXXX"

This error occurs when the sync process finds a subscription in Stripe, but cannot find a corresponding user in your database with the matching Stripe customer ID.

**Solution:**

1. **Create the user first:** Make sure the user exists in your database before creating a subscription for them in Stripe.

2. **Update existing users:** If you have existing users, you need to set their `stripeCustomerId` field:

   ```typescript
   await db
     .update(users)
     .set({ stripeCustomerId: 'cus_XXXXX' })
     .where(eq(users.id, userId));
   ```

3. **Manual fix:** You can manually add the Stripe customer ID to the user in your database:
   - Find the user in your database
   - Set their `stripe_customer_id` field to the value from the error message

### 2. "PostgresError: invalid input syntax for type uuid"

This error occurred because we were trying to use a Stripe product ID (which is a string like "prod_XXXXX") as a UUID in our database.

**Solution:**

We've fixed this in the sync code by:
1. Finding the product in our database using the `stripeProductId`
2. Using the product's UUID (`id`) as the `productId` in the subscriptions table
3. If the product doesn't exist, we create it with a new UUID

## Testing the Sync

After fixing these issues, you can test the sync process:

1. Start your application:
   ```bash
   npm run dev
   ```

2. Navigate to the admin sync page:
   ```
   http://localhost:3000/admin/stripe-sync
   ```

3. Click the "Sync Now" button to fetch all subscriptions from Stripe and sync them with your database.

4. Check the sync status to verify that your database is now in sync with Stripe.

## Creating Test Data

If you want to test the sync process with sample data:

1. **Create a user in your application**
2. **Create a customer in Stripe** and note the customer ID
3. **Update the user with the Stripe customer ID**:
   ```typescript
   await db
     .update(users)
     .set({ stripeCustomerId: 'cus_XXXXX' })
     .where(eq(users.id, userId));
   ```
4. **Create a subscription in Stripe** for this customer
5. **Run the sync process** to import the subscription into your database

## Debugging

If you encounter other issues:

1. Check the server logs for detailed error messages
2. Verify that your Stripe API keys are correctly set in your environment variables
3. Make sure your database is accessible and properly configured
4. Check that the database schema matches what the sync code expects 