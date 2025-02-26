/**
 * Loading component for the profile page
 * Displayed during route transitions within the profile section
 */
import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileLoading() {
  return (
    <div className="container max-w-6xl py-8">
      {/* Skeleton for profile header */}
      <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
        <Skeleton className="h-24 w-24 rounded-full" />
        <div className="space-y-2 text-center md:text-left">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
      </div>
      
      {/* Skeleton for tabs */}
      <Skeleton className="h-1 w-full mb-6" />
      <div className="grid w-full max-w-md grid-cols-2 mb-6">
        <Skeleton className="h-10 rounded-lg" />
        <Skeleton className="h-10 rounded-lg" />
      </div>
      
      {/* Skeleton for card content */}
      <div className="space-y-6">
        <Skeleton className="h-[500px] rounded-lg" />
      </div>
    </div>
  );
} 