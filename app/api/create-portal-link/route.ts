/**
 * API route for creating Stripe customer portal sessions
 */
import { NextRequest } from "next/server";
import { createPortalSession } from "@/lib/stripe";
import { getCurrentUser, getCurrentDbUser } from "@/lib/auth";
import { jsonResponse, errorResponse } from "@/lib/api";

/**
 * POST handler for creating a customer portal session
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
    
    // Check if the user has a Stripe customer ID
    if (!user.stripeCustomerId) {
      return errorResponse("No subscription found", 400);
    }
    
    // Get the return URL from the request or use a default
    const url = new URL(req.url);
    const returnUrl = url.searchParams.get("returnUrl") || `${url.origin}/dashboard`;
    
    // Create a portal session
    const session = await createPortalSession(user.stripeCustomerId, returnUrl);
    
    return jsonResponse({ url: session.url });
  } catch (error) {
    console.error("Error creating portal session:", error);
    return errorResponse(
      error instanceof Error ? error.message : "Failed to create portal session",
      500
    );
  }
} 