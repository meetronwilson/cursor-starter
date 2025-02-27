# Stripe Synchronization Instructions

This document provides instructions on how to synchronize your Stripe data with your application's database.

## The Problem

When you create subscriptions in Stripe, they need to be synchronized with your application's database. This synchronization typically happens through webhooks, where Stripe sends events to your application when subscriptions are created, updated, or deleted.

However, if your webhook is not properly set up or if it's not running (e.g., during local development), your database can become out of sync with Stripe.

## Solution 1: Set Up Stripe Webhooks

The best long-term solution is to properly set up Stripe webhooks:

1. **For Production:**
   - Go to the [Stripe Dashboard](https://dashboard.stripe.com/webhooks)
   - Create a new webhook endpoint pointing to your production URL:
     ```
     https://your-domain.com/api/webhooks/stripe
     ```
   - Select the following events:
     - `checkout.session.completed`
     - `customer.subscription.created`
     - `customer.subscription.updated`
     - `customer.subscription.deleted`
     - `invoice.payment_succeeded`
     - `invoice.payment_failed`
   - Copy the webhook signing secret and add it to your environment variables as `STRIPE_WEBHOOK_SECRET`

2. **For Local Development:**
   - Install the [Stripe CLI](https://stripe.com/docs/stripe-cli)
   - Run the following command to forward webhook events to your local server:
     ```bash
     stripe listen --forward-to http://localhost:3000/api/webhooks/stripe
     ```
   - Copy the webhook signing secret and add it to your `.env.local` file as `STRIPE_WEBHOOK_SECRET`

## Solution 2: Use the Admin Sync Tool

If your database is already out of sync with Stripe, you can use the admin sync tool to manually synchronize the data:

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

## When to Use the Sync Tool

Use the sync tool in the following situations:

- After setting up Stripe products and prices for the first time
- If you've manually created subscriptions in the Stripe dashboard
- If your webhook was down for a period of time
- During local development when you're not running the Stripe CLI
- If you notice discrepancies between your application and Stripe

## Troubleshooting

If you encounter issues with the sync process:

1. Check that your Stripe API keys are correctly set in your environment variables
2. Verify that your database is accessible and properly configured
3. Check the server logs for any errors during the sync process
4. Make sure the user in your application has a Stripe customer ID that matches the customer ID in Stripe

For detailed troubleshooting information, refer to the [STRIPE_SYNC_TROUBLESHOOTING.md](./STRIPE_SYNC_TROUBLESHOOTING.md) document.

For more information, refer to the [Stripe API documentation](https://stripe.com/docs/api) and the [webhook documentation](https://stripe.com/docs/webhooks). 