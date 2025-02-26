/**
 * Server actions for subscription management
 */
import { db } from "@/db";
import { subscriptions } from "@/db/schema/subscriptions-schema";
import { eq } from "drizzle-orm";
import { getCurrentDbUser } from "@/lib/auth";
import { stripe, listProductsWithPrices } from "@/lib/stripe";
import { ActionResponse, AuthenticatedAction } from "./types";
import { z } from "zod";
import { createValidatedAction } from "@/lib/validation";

// Define subscription data types
type SubscriptionData = {
  id: string;
  status: string;
  productName?: string;
  productId?: string;
  priceId?: string;
  interval?: string;
  amount?: number | null;
  currentPeriodEnd?: string | null;
  cancelAtPeriodEnd?: boolean | null;
};

type SubscriptionPlan = {
  id: string;
  name: string;
  description: string | null | undefined;
  features: string[];
  price: {
    monthly: number;
    annually: number;
  };
  priceIds: {
    monthly: string;
    annually: string;
  };
  popular: boolean;
};

/**
 * Get the current user's subscription
 */
export const getUserSubscription = async (): Promise<ActionResponse<SubscriptionData | null>> => {
  try {
    const user = await getCurrentDbUser();
    
    if (!user) {
      return { success: false, error: "Not authenticated" };
    }
    
    // Get the subscription from the database
    const subscription = await db.query.subscriptions.findFirst({
      where: eq(subscriptions.userId, user.id),
      orderBy: (subscriptions, { desc }) => [desc(subscriptions.createdAt)],
    });
    
    if (!subscription) {
      return { success: true, data: null };
    }
    
    // Get the subscription details from Stripe if it's active
    if (subscription.isActive && subscription.stripeSubscriptionId) {
      try {
        const stripeSubscription = await stripe.subscriptions.retrieve(
          subscription.stripeSubscriptionId
        );
        
        // Get the product details
        const product = await stripe.products.retrieve(
          stripeSubscription.items.data[0]?.price.product as string
        );
        
        return {
          success: true,
          data: {
            id: subscription.id,
            status: stripeSubscription.status,
            productName: product.name,
            priceId: stripeSubscription.items.data[0]?.price.id,
            interval: stripeSubscription.items.data[0]?.plan.interval,
            amount: stripeSubscription.items.data[0]?.price.unit_amount,
            currentPeriodEnd: new Date(stripeSubscription.current_period_end * 1000).toISOString(),
            cancelAtPeriodEnd: stripeSubscription.cancel_at_period_end,
          },
        };
      } catch (error) {
        console.error("Error retrieving Stripe subscription:", error);
        // Fall back to database subscription if Stripe API fails
      }
    }
    
    // Return the database subscription
    return {
      success: true,
      data: {
        id: subscription.id,
        status: subscription.isActive ? "active" : "canceled",
        productId: subscription.productId,
        priceId: subscription.stripePriceId,
        currentPeriodEnd: subscription.currentPeriodEnd?.toISOString(),
        cancelAtPeriodEnd: subscription.cancelAtPeriodEnd,
      },
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to get subscription",
    };
  }
};

/**
 * Get all available subscription plans
 */
export const getSubscriptionPlans = async (): Promise<ActionResponse<SubscriptionPlan[]>> => {
  try {
    const products = await listProductsWithPrices();
    
    // Format the products into plans
    const plans = products.map((product) => {
      const monthlyPrice = product.prices.find((price) => price.recurring?.interval === "month");
      const yearlyPrice = product.prices.find((price) => price.recurring?.interval === "year");
      
      // Convert null to undefined for description if needed
      const description = product.description === null ? undefined : product.description;
      
      return {
        id: product.id,
        name: product.name,
        description,
        features: product.metadata.features ? JSON.parse(product.metadata.features) : [],
        price: {
          monthly: monthlyPrice?.unit_amount ? monthlyPrice.unit_amount / 100 : 0,
          annually: yearlyPrice?.unit_amount ? yearlyPrice.unit_amount / 100 : 0,
        },
        priceIds: {
          monthly: monthlyPrice?.id || "",
          annually: yearlyPrice?.id || "",
        },
        popular: product.metadata.popular === "true",
      };
    });
    
    return { success: true, data: plans };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to get subscription plans",
    };
  }
};

// Schema for canceling a subscription
const cancelSubscriptionSchema = z.object({
  subscriptionId: z.string().min(1, "Subscription ID is required"),
});

type CancelSubscriptionResponse = {
  message: string;
};

/**
 * Cancel a subscription
 */
export const cancelSubscription: AuthenticatedAction<{ subscriptionId: string }, CancelSubscriptionResponse> = 
  createValidatedAction(cancelSubscriptionSchema, async (data) => {
    const user = await getCurrentDbUser();
    
    if (!user) {
      throw new Error("Not authenticated");
    }
    
    // Get the subscription from the database
    const subscription = await db.query.subscriptions.findFirst({
      where: eq(subscriptions.id, data.subscriptionId),
    });
    
    if (!subscription) {
      throw new Error("Subscription not found");
    }
    
    // Check if the user owns the subscription
    if (subscription.userId !== user.id) {
      throw new Error("Unauthorized");
    }
    
    // Cancel the subscription in Stripe
    if (subscription.stripeSubscriptionId) {
      await stripe.subscriptions.update(subscription.stripeSubscriptionId, {
        cancel_at_period_end: true,
      });
    }
    
    // Update the subscription in the database
    await db
      .update(subscriptions)
      .set({
        cancelAtPeriodEnd: true,
        updatedAt: new Date(),
      })
      .where(eq(subscriptions.id, data.subscriptionId));
    
    return { message: "Subscription canceled" };
  }); 