/**
 * Script to set up a webhook endpoint in Stripe
 * This will create a webhook endpoint for your application
 */
import { stripe } from '@/lib/stripe';

async function setupStripeWebhook() {
  try {
    console.log('Setting up Stripe webhook...');

    // Check if there are existing webhooks
    const webhooks = await stripe.webhookEndpoints.list();
    
    if (webhooks.data.length > 0) {
      console.log('Existing webhooks found:');
      webhooks.data.forEach(webhook => {
        console.log(`- ${webhook.url} (${webhook.id})`);
      });
      
      // Ask user if they want to continue
      console.log('\nIf you want to delete these webhooks, you can do so in the Stripe dashboard.');
      console.log('https://dashboard.stripe.com/webhooks');
    }

    // Get the webhook secret from environment variables
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    
    if (!webhookSecret) {
      console.error('STRIPE_WEBHOOK_SECRET is not set in your environment variables.');
      console.error('Please set it before continuing.');
      return;
    }

    // Define the webhook URL
    // For local development, you'll need to use a tool like ngrok to expose your local server
    const webhookUrl = process.env.NEXT_PUBLIC_APP_URL 
      ? `${process.env.NEXT_PUBLIC_APP_URL}/api/webhooks/stripe` 
      : 'http://localhost:3000/api/webhooks/stripe';

    // Create the webhook endpoint
    const webhook = await stripe.webhookEndpoints.create({
      url: webhookUrl,
      enabled_events: [
        'checkout.session.completed',
        'customer.subscription.created',
        'customer.subscription.updated',
        'customer.subscription.deleted',
        'invoice.payment_succeeded',
        'invoice.payment_failed',
      ],
      description: 'Webhook for subscription events',
    });

    console.log(`Webhook created successfully!`);
    console.log(`Webhook ID: ${webhook.id}`);
    console.log(`Webhook URL: ${webhook.url}`);
    console.log(`Webhook Secret: ${webhookSecret}`);
    console.log('\nMake sure your application is running and can receive webhook events.');
    console.log('For local development, you may need to use a tool like ngrok to expose your local server.');
  } catch (error) {
    console.error('Error setting up Stripe webhook:', error);
  }
}

// Run the setup function
setupStripeWebhook()
  .then(() => {
    console.log('Setup completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Setup failed:', error);
    process.exit(1);
  }); 