/**
 * Main dashboard page for authenticated users
 * Displays overview statistics and recent activity
 */
import { Suspense } from "react";
import { DashboardHeader } from "./_components/dashboard-header";
import { DashboardContent } from "./_components/dashboard-content";
import { Skeleton } from "@/components/ui/skeleton";

// Note: Metadata must be exported from a Server Component
// This is a client component, so we need to add metadata in the layout file instead

export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader title="Vibe Dashboard" />
      <main className="flex-1 p-6 space-y-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Your Vibe Overview</h2>
          <p className="text-muted-foreground">
            Welcome to your Vibe Coding dashboard. Here&apos;s an overview of your coding journey and projects.
          </p>
        </div>
        
        <Suspense fallback={<DashboardSkeleton />}>
          <DashboardContent />
        </Suspense>
      </main>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="space-y-8">
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
  );
} 