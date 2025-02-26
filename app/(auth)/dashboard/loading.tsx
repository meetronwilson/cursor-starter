/**
 * Loading component for the dashboard
 * Displayed during route transitions within the dashboard
 */
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Skeleton for header */}
      <div className="h-16 border-b bg-background px-4 flex items-center">
        <Skeleton className="h-8 w-48" />
        <div className="ml-auto flex items-center gap-4">
          <Skeleton className="h-8 w-64 hidden md:block" />
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </div>
      
      <div className="p-6 space-y-8">
        {/* Skeleton for title */}
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-96" />
        </div>
        
        {/* Skeleton for stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-lg" />
          ))}
        </div>
        
        {/* Skeleton for charts */}
        <div className="grid gap-6 md:grid-cols-2">
          <Skeleton className="h-80 rounded-lg" />
          <Skeleton className="h-80 rounded-lg" />
        </div>
        
        {/* Skeleton for activity feed and chart */}
        <div className="grid gap-6 md:grid-cols-3">
          <Skeleton className="h-80 rounded-lg" />
          <Skeleton className="h-80 rounded-lg md:col-span-2" />
        </div>
        
        {/* Skeleton for table */}
        <div className="space-y-4">
          <Skeleton className="h-10 w-full rounded-lg" />
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-16 w-full rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  );
} 