# Stripe Integration Setup Guide

This guide will help you set up Stripe integration for the application, including local webhook testing.

## Environment Variables

The following environment variables are required for Stripe integration:

- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: Your Stripe publishable key (starts with `pk_test_` for test mode)
- `STRIPE_SECRET_KEY`: Your Stripe secret key (starts with `sk_test_` for test mode)
- `STRIPE_WEBHOOK_SECRET`: Your Stripe webhook secret for verifying webhook events

These should be added to your `.env.local` file for local development.

## Setting Up Stripe CLI for Local Webhook Testing

1. **Install the Stripe CLI**

   - **macOS (with Homebrew):**
     ```bash
     brew install stripe/stripe-cli/stripe
     ```
   
   - **Windows (with Scoop):**
     ```bash
     scoop install stripe
     ```
   
   - **Other platforms:** Download from [Stripe CLI GitHub releases](https://github.com/stripe/stripe-cli/releases)

2. **Login to Stripe CLI**

   ```bash
   stripe login
   ```

   This will open a browser window where you can authorize the CLI to access your Stripe account.

3. **Forward Webhooks to Your Local Server**

   ```bash
   stripe listen --forward-to http://localhost:3000/api/webhooks/stripe
   ```

   This command will output a webhook signing secret. Copy this secret and add it to your `.env.local` file as `STRIPE_WEBHOOK_SECRET`.

## Creating Products and Prices in Stripe Dashboard

1. Log in to your [Stripe Dashboard](https://dashboard.stripe.com/)
2. Navigate to Products > Add Product
3. Create products that match our pricing tiers:
   - **Vibe Explorer** (Free tier)
   - **Vibe Creator** ($19/month)
   - **Vibe Team** ($49/user/month)
4. For each product, add the following metadata:
   - `features`: JSON array of features (e.g., `["Feature 1", "Feature 2"]`)
   - `popular`: Set to `true` for the recommended plan

## Testing Webhooks

To test webhooks locally:

1. Start your Next.js application:
   ```bash
   npm run dev
   ```

2. In a separate terminal, start the Stripe CLI webhook forwarding:
   ```bash
   stripe listen --forward-to http://localhost:3000/api/webhooks/stripe
   ```

3. In another terminal, trigger test webhook events:
   ```bash
   stripe trigger checkout.session.completed
   ```

   You can trigger other events as needed:
   ```bash
   stripe trigger customer.subscription.updated
   stripe trigger customer.subscription.deleted
   stripe trigger invoice.payment_succeeded
   stripe trigger invoice.payment_failed
   ```

## Verifying Webhook Handling

Check your application logs to verify that webhook events are being received and processed correctly. You should see log messages indicating that the webhook was received and the appropriate handler was called. 