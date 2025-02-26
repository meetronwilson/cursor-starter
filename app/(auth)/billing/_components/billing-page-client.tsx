/**
 * Client component for the billing page
 */
"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SubscriptionStatus } from "@/components/billing/subscription-status";
import { PricingTable } from "@/components/billing/pricing-table";
import { BillingHistory } from "./billing-history";
import { PaymentMethods } from "./payment-methods";

// Define types for subscription data
interface Subscription {
  id: string;
  status: string;
  productName?: string;
  productId?: string;
  priceId?: string;
  interval?: string;
  amount?: number;
  currentPeriodEnd?: string;
  cancelAtPeriodEnd?: boolean;
}

// Define types for plan data
interface Plan {
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
}

interface BillingPageClientProps {
  subscription: Subscription | null;
  plans: Plan[];
}

export function BillingPageClient({ subscription, plans }: BillingPageClientProps) {
  const [activeTab, setActiveTab] = useState("overview");

  // Convert our subscription type to match what SubscriptionStatus expects
  const formattedSubscription = subscription ? {
    id: subscription.id,
    status: subscription.status,
    productName: subscription.productName || "Unknown Plan",
    priceId: subscription.priceId || "",
    interval: (subscription.interval as "month" | "year") || "month",
    amount: subscription.amount || 0,
    currentPeriodEnd: subscription.currentPeriodEnd || new Date().toISOString(),
    cancelAtPeriodEnd: subscription.cancelAtPeriodEnd || false
  } : null;

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full max-w-md grid-cols-3">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="plans">Plans</TabsTrigger>
        <TabsTrigger value="history">History</TabsTrigger>
      </TabsList>
      
      <div className="mt-6">
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <SubscriptionStatus subscription={formattedSubscription} />
            <PaymentMethods />
          </div>
        </TabsContent>
        
        <TabsContent value="plans" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Subscription Plans</CardTitle>
              <CardDescription>
                Choose the plan that works best for you and your team.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PricingTable 
                plans={plans} 
                currentPlanId={subscription?.productId} 
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="history" className="space-y-6">
          <BillingHistory />
        </TabsContent>
      </div>
    </Tabs>
  );
} 