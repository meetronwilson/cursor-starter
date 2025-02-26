/**
 * Main dashboard page for authenticated users
 * Displays overview statistics and recent activity
 */
"use client";

import { Metadata } from "next";

import { DashboardHeader } from "./_components/dashboard-header";
import { DashboardStats } from "./_components/dashboard-stats";
import { DataChart } from "./_components/data-chart";
import { DataTable } from "./_components/data-table";
import { ActivityFeed } from "./_components/activity-feed";
import { useDashboardData } from "@/lib/hooks/use-dashboard-data";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Overview of your account and activity",
};

export default function DashboardPage() {
  const { 
    userChartData, 
    revenueChartData, 
    conversationChartData, 
    tableData, 
    activityFeed
  } = useDashboardData();

  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader title="Dashboard" />
      <main className="flex-1 p-6 space-y-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Overview</h2>
          <p className="text-muted-foreground">
            Welcome to your dashboard. Here&apos;s an overview of your account.
          </p>
        </div>
        
        <DashboardStats />
        
        <div className="grid gap-6 md:grid-cols-2">
          <DataChart 
            title="User Growth" 
            description="New and active users over time"
            data={userChartData}
            type="line"
          />
          <DataChart 
            title="Revenue" 
            description="Monthly recurring revenue"
            data={revenueChartData}
            type="bar"
          />
        </div>
        
        <div className="grid gap-6 md:grid-cols-3">
          <DataChart 
            title="Conversation Types" 
            description="Distribution by type"
            data={conversationChartData}
            type="pie"
            className="md:col-span-1"
          />
          <ActivityFeed 
            title="Recent Activity" 
            description="Latest actions and events"
            data={activityFeed}
            className="md:col-span-2"
          />
        </div>
        
        <DataTable 
          title="User Management" 
          description="View and manage users"
          data={tableData}
        />
      </main>
    </div>
  );
} 