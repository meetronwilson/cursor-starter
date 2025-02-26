/**
 * Loading component for the billing page
 * Displayed during route transitions within the billing section
 */
import { Skeleton } from "@/components/ui/skeleton";

export default function BillingLoading() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Skeleton for header */}
      <div className="h-16 border-b bg-background px-4 flex items-center">
        <Skeleton className="h-8 w-64" />
        <div className="ml-auto flex items-center gap-4">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </div>
      
      <div className="p-6 space-y-8">
        {/* Skeleton for title */}
        <div className="space-y-2">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-96" />
        </div>
        
        {/* Skeleton for tabs */}
        <div className="grid w-full max-w-md grid-cols-3 mb-6">
          <Skeleton className="h-10 rounded-lg" />
          <Skeleton className="h-10 rounded-lg" />
          <Skeleton className="h-10 rounded-lg" />
        </div>
        
        {/* Skeleton for subscription and payment methods */}
        <div className="grid gap-6 md:grid-cols-2">
          <Skeleton className="h-80 rounded-lg" />
          <Skeleton className="h-80 rounded-lg" />
        </div>
      </div>
    </div>
  );
} 