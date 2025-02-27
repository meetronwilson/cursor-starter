# Stripe Synchronization Scripts

This directory contains scripts to help synchronize your Stripe data with your application's database.

## Prerequisites

Before running these scripts, make sure you have:

1. Set up your Stripe account and created products/prices
2. Set the following environment variables in your `.env.local` file:
   - `STRIPE_SECRET_KEY`
   - `STRIPE_WEBHOOK_SECRET`
   - `NEXT_PUBLIC_APP_URL` (optional, defaults to http://localhost:3000)

## Available Scripts

### 1. Sync Stripe Subscriptions

This script fetches all subscriptions from Stripe and syncs them with your database.

```bash
# Run the script
./scripts/sync-stripe.sh
```

What this script does:
- Fetches all subscriptions from Stripe
- Creates missing products in your database
- Creates or updates subscription records in your database
- Links subscriptions to the correct users based on Stripe customer IDs

Run this script if:
- You've created subscriptions in Stripe but they're not showing up in your app
- You've manually created/updated subscriptions in Stripe and want to sync them
- Your database and Stripe are out of sync

### 2. Set Up Stripe Webhook

This script sets up a webhook endpoint in Stripe to receive events.

```bash
# Run the script
./scripts/setup-webhook.sh
```

What this script does:
- Lists any existing webhook endpoints
- Creates a new webhook endpoint pointing to your application
- Configures the webhook to listen for subscription-related events

Run this script if:
- You need to set up a webhook for the first time
- You want to update your webhook configuration

## For Local Development

For local development, you'll need to use a tool like [ngrok](https://ngrok.com/) to expose your local server to the internet so Stripe can send webhook events.

1. Start your Next.js application:
   ```bash
   npm run dev
   ```

2. Start ngrok to expose your local server:
   ```bash
   ngrok http 3000
   ```

3. Update your webhook URL in Stripe to point to your ngrok URL:
   ```
   https://your-ngrok-url.ngrok.io/api/webhooks/stripe
   ```

4. Run the webhook setup script:
   ```bash
   ./scripts/setup-webhook.sh
   ```

## Troubleshooting

If you encounter issues:

1. Check your Stripe dashboard for any errors
2. Verify that your environment variables are set correctly
3. Make sure your application is running and can receive webhook events
4. Check your server logs for any errors related to Stripe webhooks

For more information, refer to the [Stripe API documentation](https://stripe.com/docs/api). 