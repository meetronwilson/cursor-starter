#!/bin/bash

# Script to sync Stripe data with the database
echo "Starting Stripe sync process..."

# Run the TypeScript script using ts-node
npx ts-node -r tsconfig-paths/register scripts/sync-stripe-subscriptions.ts

echo "Sync process completed." 