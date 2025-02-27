#!/bin/bash

# Script to set up a Stripe webhook
echo "Starting Stripe webhook setup..."

# Run the TypeScript script using ts-node
npx ts-node -r tsconfig-paths/register scripts/setup-stripe-webhook.ts

echo "Webhook setup process completed." 