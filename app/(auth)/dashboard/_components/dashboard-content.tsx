/**
 * Dashboard content component that loads and displays dashboard data
 */
"use client";

import { DashboardStats } from "./dashboard-stats";
import { DataChart } from "./data-chart";
import { DataTable } from "./data-table";
import { ActivityFeed } from "./activity-feed";
import { useDashboardData } from "@/lib/hooks/use-dashboard-data";

export function DashboardContent() {
  const { 
    userChartData, 
    revenueChartData, 
    conversationChartData, 
    tableData, 
    activityFeed,
    isLoading
  } = useDashboardData();

  if (isLoading) {
    return <div>Loading data...</div>;
  }

  return (
    <div className="space-y-8">
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
    </div>
  );
} 