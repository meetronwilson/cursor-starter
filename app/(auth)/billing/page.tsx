/**
 * Billing page for managing subscriptions and payment information
 */
import { Suspense } from "react";
import { getUserSubscription, getSubscriptionPlans } from "@/actions/subscription";
import { BillingPageClient } from "./_components/billing-page-client";
import { DashboardHeader } from "./_components/dashboard-header-server";
import { Loader2 } from "lucide-react";
import { SuccessMessage } from "@/app/(auth)/billing/_components/success-message";
import { CancelMessage } from "@/app/(auth)/billing/_components/cancel-message";

// Define types to match the client component
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

interface BillingPageProps {
  searchParams: {
    success?: string;
    canceled?: string;
  };
}

export default async function BillingPage({ searchParams }: BillingPageProps) {
  const showSuccess = searchParams.success === "true";
  const showCanceled = searchParams.canceled === "true";
  
  // Fetch data server-side
  const subscriptionResponse = await getUserSubscription();
  const plansResponse = await getSubscriptionPlans();
  
  // Transform the data to match our expected types
  let subscription: Subscription | null = null;
  if (subscriptionResponse.success && subscriptionResponse.data) {
    const data = subscriptionResponse.data;
    subscription = {
      id: data.id,
      status: data.status,
      productName: data.productName || undefined,
      productId: data.productId || undefined,
      priceId: data.priceId || undefined,
      interval: data.interval || undefined,
      amount: data.amount !== null ? data.amount : undefined,
      currentPeriodEnd: data.currentPeriodEnd || undefined,
      cancelAtPeriodEnd: data.cancelAtPeriodEnd !== null ? data.cancelAtPeriodEnd : undefined
    };
  }
  
  // Transform plans data
  const plans: Plan[] = plansResponse.success 
    ? plansResponse.data.map(plan => ({
        id: plan.id,
        name: plan.name,
        description: plan.description || "",
        price: plan.price,
        features: plan.features,
        priceIds: plan.priceIds,
        popular: plan.popular
      }))
    : [];

  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader title="Billing & Subscription" />
      
      <main className="flex-1 p-6 space-y-8">
        {showSuccess && <SuccessMessage />}
        {showCanceled && <CancelMessage />}
        
        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Manage Your Subscription</h2>
          <p className="text-muted-foreground">
            View and manage your subscription, payment methods, and billing history.
          </p>
        </div>
        
        <Suspense fallback={
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        }>
          <BillingPageClient 
            subscription={subscription} 
            plans={plans} 
          />
        </Suspense>
      </main>
    </div>
  );
} 