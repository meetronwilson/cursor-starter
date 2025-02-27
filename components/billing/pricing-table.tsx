/**
 * Pricing table component for subscription management
 * Displays available subscription tiers with features and pricing
 */
"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckIcon, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

// Define pricing plan types
export type PricingPlan = {
  id: string;
  name: string;
  description: string;
  price: {
    monthly: number;
    annually: number;
  };
  features: string[];
  priceIds: {
    monthly: string;
    annually: string;
  };
  popular?: boolean;
};

// Props for the pricing table component
interface PricingTableProps {
  plans: PricingPlan[];
  currentPlanId?: string;
  onSelectPlan?: (planId: string, priceId: string) => void;
}

export function PricingTable({ plans, currentPlanId, onSelectPlan }: PricingTableProps) {
  const [billingInterval, setBillingInterval] = useState<"monthly" | "annually">("monthly");
  const [loadingPlanId, setLoadingPlanId] = useState<string | null>(null);

  // Calculate the discount percentage for annual billing
  const getDiscountPercentage = (plan: PricingPlan) => {
    const monthlyTotal = plan.price.monthly * 12;
    const annualTotal = plan.price.annually;
    const discount = ((monthlyTotal - annualTotal) / monthlyTotal) * 100;
    return Math.round(discount);
  };

  // Format price with currency
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Handle plan selection
  const handleSelectPlan = async (plan: PricingPlan) => {
    const priceId = billingInterval === "monthly" ? plan.priceIds.monthly : plan.priceIds.annually;
    
    if (onSelectPlan) {
      onSelectPlan(plan.id, priceId);
    } else {
      try {
        setLoadingPlanId(plan.id);
        
        // Get the current URL for success and cancel URLs
        const origin = window.location.origin;
        const successUrl = `${origin}/billing?success=true`;
        const cancelUrl = `${origin}/billing?canceled=true`;
        
        console.log("Creating checkout session with:", {
          priceId,
          successUrl,
          cancelUrl
        });
        
        // Call the API to create a checkout session
        const response = await fetch("/api/create-checkout-session", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            priceId,
            successUrl,
            cancelUrl,
          }),
        });
        
        const responseData = await response.json();
        
        console.log("Checkout session response:", {
          status: response.status,
          ok: response.ok,
          data: responseData
        });
        
        if (!response.ok) {
          throw new Error(responseData.error || "Failed to create checkout session");
        }
        
        // Redirect to the checkout URL - access the url from the data property
        if (responseData.data && responseData.data.url) {
          console.log("Redirecting to checkout URL:", responseData.data.url);
          window.location.href = responseData.data.url;
        } else {
          console.error("No URL in response data:", responseData);
          throw new Error("No checkout URL returned");
        }
      } catch (error) {
        console.error("Checkout error:", error);
        toast.error(error instanceof Error ? error.message : "Failed to start checkout process");
        setLoadingPlanId(null);
      }
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Billing interval toggle */}
      <div className="flex justify-center mb-8">
        <div className="relative flex items-center p-1 bg-muted rounded-full">
          <button
            onClick={() => setBillingInterval("monthly")}
            className={cn(
              "relative px-4 py-2 text-sm font-medium rounded-full transition-all",
              billingInterval === "monthly"
                ? "text-primary-foreground bg-primary shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingInterval("annually")}
            className={cn(
              "relative px-4 py-2 text-sm font-medium rounded-full transition-all",
              billingInterval === "annually"
                ? "text-primary-foreground bg-primary shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Annually
            <span className="absolute -top-2 -right-2 px-1.5 py-0.5 text-xs font-semibold text-white bg-green-500 rounded-full">
              Save
            </span>
          </button>
        </div>
      </div>

      {/* Pricing cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            className={cn(
              "flex flex-col",
              plan.popular && "border-primary shadow-md"
            )}
          >
            {plan.popular && (
              <div className="absolute top-0 right-0 px-3 py-1 text-xs font-medium text-white transform translate-y-0 translate-x-0 bg-primary rounded-bl-lg rounded-tr-lg">
                Popular
              </div>
            )}
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="mb-4">
                <span className="text-4xl font-bold">
                  {formatPrice(billingInterval === "monthly" ? plan.price.monthly : plan.price.annually)}
                </span>
                <span className="text-muted-foreground">
                  /{billingInterval === "monthly" ? "month" : "year"}
                </span>
              </div>
              {billingInterval === "annually" && (
                <p className="mb-4 text-sm text-green-500">
                  Save {getDiscountPercentage(plan)}% with annual billing
                </p>
              )}
              <ul className="space-y-2">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <CheckIcon className="w-4 h-4 mr-2 text-green-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => handleSelectPlan(plan)}
                className={cn(
                  "w-full",
                  currentPlanId === plan.id
                    ? "bg-muted text-muted-foreground hover:bg-muted"
                    : plan.popular
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : ""
                )}
                disabled={currentPlanId === plan.id || loadingPlanId === plan.id}
              >
                {currentPlanId === plan.id ? (
                  "Current Plan"
                ) : loadingPlanId === plan.id ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Get Started"
                )}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
} 