/**
 * API route for creating Stripe checkout sessions
 */
import { NextRequest } from "next/server";
import { stripe, createCheckoutSession } from "@/lib/stripe";
import { getCurrentUser, getCurrentDbUser } from "@/lib/auth";
import { jsonResponse, errorResponse, validateRequest } from "@/lib/api";
import { z } from "zod";

// Validation schema for checkout request
const checkoutSchema = z.object({
  priceId: z.string().min(1, "Price ID is required"),
  successUrl: z.string().url("Valid success URL is required"),
  cancelUrl: z.string().url("Valid cancel URL is required"),
});

/**
 * POST handler for creating a checkout session
 */
export async function POST(req: NextRequest) {
  try {
    // Get the current user
    const clerkId = await getCurrentUser();
    
    if (!clerkId) {
      return errorResponse("Unauthorized", 401);
    }
    
    // Get the user from the database
    const user = await getCurrentDbUser();
    
    if (!user) {
      return errorResponse("User not found", 404);
    }
    
    // Validate the request body
    const validation = await validateRequest(req, checkoutSchema);
    
    if (!validation.success) {
      return errorResponse(validation.error, 400);
    }
    
    const { priceId, successUrl, cancelUrl } = validation.data;
    
    // Check if the user has a Stripe customer ID
    if (!user.stripeCustomerId) {
      // Create a Stripe customer if they don't have one
      const customer = await stripe.customers.create({
        email: user.email,
        name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || undefined,
        metadata: {
          clerkId: user.clerkId,
          userId: user.id,
        },
      });
      
      // Update the user with the Stripe customer ID
      // This would typically be done in a database transaction
      // but we're keeping it simple for this example
      await stripe.customers.update(customer.id, {
        metadata: {
          userId: user.id,
        },
      });
      
      // Create a checkout session
      const session = await createCheckoutSession({
        customerId: customer.id,
        priceId,
        successUrl,
        cancelUrl,
        metadata: {
          userId: user.id,
        },
      });
      
      return jsonResponse({ url: session.url });
    }
    
    // Create a checkout session with the existing customer
    const session = await createCheckoutSession({
      customerId: user.stripeCustomerId,
      priceId,
      successUrl,
      cancelUrl,
      metadata: {
        userId: user.id,
      },
    });
    
    return jsonResponse({ url: session.url });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return errorResponse(
      error instanceof Error ? error.message : "Failed to create checkout session",
      500
    );
  }
} 