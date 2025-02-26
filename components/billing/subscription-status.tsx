/**
 * Subscription status component for displaying the user's current subscription
 */
"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface SubscriptionStatusProps {
  subscription: {
    id: string;
    status: string;
    productName: string;
    priceId: string;
    interval: "month" | "year";
    amount: number;
    currentPeriodEnd: string;
    cancelAtPeriodEnd: boolean;
  } | null;
}

export function SubscriptionStatus({ subscription }: SubscriptionStatusProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Format date to readable string
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Format price with currency
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(price / 100); // Stripe amounts are in cents
  };

  // Handle portal session creation
  const handleManageSubscription = async () => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/create-portal-link", {
        method: "POST",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create portal session");
      }

      // Redirect to Stripe Customer Portal
      if (data.url) {
        router.push(data.url);
      } else {
        throw new Error("No portal URL returned");
      }
    } catch (error) {
      console.error("Portal error:", error);
      setIsLoading(false);
      // You could add toast notification here
    }
  };

  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500";
      case "trialing":
        return "bg-blue-500";
      case "past_due":
        return "bg-yellow-500";
      case "canceled":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  if (!subscription) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No Active Subscription</CardTitle>
          <CardDescription>You don&apos;t have an active subscription.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Subscribe to a plan to access premium features.</p>
        </CardContent>
        <CardFooter>
          <Button onClick={() => router.push("/pricing")}>View Plans</Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Subscription Status</CardTitle>
          <Badge className={getStatusColor(subscription.status)}>
            {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
          </Badge>
        </div>
        <CardDescription>Manage your subscription and billing information</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">Plan</h3>
          <p className="text-lg font-semibold">{subscription.productName}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">Price</h3>
          <p className="text-lg font-semibold">
            {formatPrice(subscription.amount)}/{subscription.interval}
          </p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">Current Period End</h3>
          <p className="text-lg font-semibold">{formatDate(subscription.currentPeriodEnd)}</p>
          {subscription.cancelAtPeriodEnd && (
            <p className="text-sm text-muted-foreground">
              Your subscription will end on this date.
            </p>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleManageSubscription} disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Loading...
            </>
          ) : (
            "Manage Subscription"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
} 