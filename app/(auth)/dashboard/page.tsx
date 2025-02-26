/**
 * Main dashboard page for authenticated users
 * Displays overview statistics and recent activity
 */
import { Metadata } from "next";

import { DashboardHeader } from "./_components/dashboard-header";
import { DashboardStats } from "./_components/dashboard-stats";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Overview of your account and activity",
};

export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader title="Dashboard" />
      <main className="flex-1 p-6 space-y-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Overview</h2>
          <p className="text-muted-foreground">
            Welcome to your dashboard. Here's an overview of your account.
          </p>
        </div>
        
        <DashboardStats />
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your recent actions and events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-4 border-b pb-4 last:border-0 last:pb-0">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-xs font-medium">{i}</span>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Activity {i}</p>
                      <p className="text-xs text-muted-foreground">
                        {i === 1 ? "Just now" : i === 2 ? "2 hours ago" : "Yesterday"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks and actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {["Create new conversation", "Invite team member", "Update profile", "View billing"].map((action, i) => (
                  <div key={i} className="rounded-lg border p-3 hover:bg-accent cursor-pointer">
                    <p className="text-sm font-medium">{action}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="md:col-span-2 lg:col-span-1">
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>Your scheduled events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {["Team Meeting", "Product Demo", "Strategy Session"].map((event, i) => (
                  <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{event}</p>
                      <p className="text-xs text-muted-foreground">
                        {i === 0 ? "Tomorrow, 10:00 AM" : i === 1 ? "Friday, 2:00 PM" : "Next Monday, 11:30 AM"}
                      </p>
                    </div>
                    <div className="text-xs font-medium text-primary">
                      {i === 0 ? "In 1 day" : i === 1 ? "In 3 days" : "In 7 days"}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
} 