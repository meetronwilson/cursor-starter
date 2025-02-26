/**
 * Billing page for managing subscriptions and payment information
 */
"use client";

import { useState, useEffect } from "react";
import { DashboardHeader } from "../dashboard/_components/dashboard-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SubscriptionStatus } from "@/components/billing/subscription-status";
import { PricingTable } from "@/components/billing/pricing-table";
import { BillingHistory } from "./_components/billing-history";
import { PaymentMethods } from "./_components/payment-methods";
import { getUserSubscription, getSubscriptionPlans } from "@/actions/subscription";
import { Loader2 } from "lucide-react";

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

export default function BillingPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isLoading, setIsLoading] = useState(true);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        
        // Fetch subscription data
        const subscriptionResponse = await getUserSubscription();
        if (subscriptionResponse.success) {
          setSubscription(subscriptionResponse.data);
        }
        
        // Fetch available plans
        const plansResponse = await getSubscriptionPlans();
        if (plansResponse.success) {
          setPlans(plansResponse.data);
        }
      } catch (err) {
        console.error("Error loading billing data:", err);
        setError("Failed to load billing information. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }
    
    loadData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader title="Billing & Subscription" />
      
      <main className="flex-1 p-6 space-y-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Manage Your Subscription</h2>
          <p className="text-muted-foreground">
            View and manage your subscription, payment methods, and billing history.
          </p>
        </div>
        
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : error ? (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center text-destructive">{error}</div>
            </CardContent>
          </Card>
        ) : (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="plans">Plans</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>
            
            <div className="mt-6">
              <TabsContent value="overview" className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <SubscriptionStatus subscription={subscription} />
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
        )}
      </main>
    </div>
  );
} 