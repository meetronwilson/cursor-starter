/**
 * Custom hook for generating mock dashboard data for visualizations
 * Provides data for charts, tables, and activity feeds
 */
import { useState, useEffect } from "react";

// Types for the dashboard data
export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string;
    borderWidth?: number;
    fill?: boolean;
  }[];
}

export interface TableData {
  id: string;
  name: string;
  email: string;
  status: "active" | "inactive" | "pending";
  role: "admin" | "user" | "guest";
  lastActive: string;
}

export interface ActivityItem {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  action: string;
  target: string;
  timestamp: string;
  type: "message" | "user" | "system" | "payment";
}

interface DashboardData {
  userChartData: ChartData;
  revenueChartData: ChartData;
  conversationChartData: ChartData;
  tableData: TableData[];
  activityFeed: ActivityItem[];
  isLoading: boolean;
}

// Generate random data for charts
const generateRandomData = (count: number, min: number, max: number): number[] => {
  return Array.from({ length: count }, () => 
    Math.floor(Math.random() * (max - min + 1)) + min
  );
};

// Generate dates for the last n days
const generateDateLabels = (days: number): string[] => {
  const dates: string[] = [];
  const today = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    dates.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
  }
  
  return dates;
};

// Generate mock user data
const generateMockUsers = (count: number): TableData[] => {
  const statuses: ("active" | "inactive" | "pending")[] = ["active", "inactive", "pending"];
  const roles: ("admin" | "user" | "guest")[] = ["admin", "user", "guest"];
  
  return Array.from({ length: count }, (_, i) => ({
    id: `user-${i + 1}`,
    name: `Developer ${i + 1}`,
    email: `dev${i + 1}@example.com`,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    role: roles[Math.floor(Math.random() * roles.length)],
    lastActive: new Date(Date.now() - Math.floor(Math.random() * 10 * 24 * 60 * 60 * 1000)).toISOString(),
  }));
};

// Generate mock activity feed
const generateMockActivity = (count: number): ActivityItem[] => {
  const actionTypes = ["generated", "optimized", "refactored", "created", "completed", "started", "improved"];
  const targetTypes = ["code snippet", "function", "component", "project", "API", "feature", "UI element"];
  const activityTypes: ("message" | "user" | "system" | "payment")[] = ["message", "user", "system", "payment"];
  
  return Array.from({ length: count }, (_, i) => {
    const timestamp = new Date(Date.now() - Math.floor(Math.random() * 24 * 60 * 60 * 1000));
    const type = activityTypes[Math.floor(Math.random() * activityTypes.length)];
    
    return {
      id: `activity-${i + 1}`,
      user: {
        name: `Developer ${Math.floor(Math.random() * 10) + 1}`,
        avatar: `/avatars/avatar-${Math.floor(Math.random() * 5) + 1}.png`,
      },
      action: actionTypes[Math.floor(Math.random() * actionTypes.length)],
      target: `${targetTypes[Math.floor(Math.random() * targetTypes.length)]} ${Math.floor(Math.random() * 10) + 1}`,
      timestamp: timestamp.toISOString(),
      type,
    };
  }).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};

export function useDashboardData(): DashboardData {
  const [data, setData] = useState<DashboardData>({
    userChartData: {
      labels: [],
      datasets: [],
    },
    revenueChartData: {
      labels: [],
      datasets: [],
    },
    conversationChartData: {
      labels: [],
      datasets: [],
    },
    tableData: [],
    activityFeed: [],
    isLoading: true,
  });

  useEffect(() => {
    // Simulate API call delay
    const timer = setTimeout(() => {
      const dateLabels = generateDateLabels(7);
      
      setData({
        userChartData: {
          labels: dateLabels,
          datasets: [
            {
              label: 'Code Generated (lines)',
              data: generateRandomData(7, 100, 500),
              backgroundColor: 'rgba(59, 130, 246, 0.2)',
              borderColor: 'rgba(59, 130, 246, 1)',
              borderWidth: 2,
              fill: true,
            },
            {
              label: 'AI Prompts Used',
              data: generateRandomData(7, 10, 50),
              backgroundColor: 'rgba(16, 185, 129, 0.2)',
              borderColor: 'rgba(16, 185, 129, 1)',
              borderWidth: 2,
              fill: true,
            },
          ],
        },
        revenueChartData: {
          labels: dateLabels,
          datasets: [
            {
              label: 'Vibe Score',
              data: generateRandomData(7, 60, 95),
              backgroundColor: 'rgba(139, 92, 246, 0.2)',
              borderColor: 'rgba(139, 92, 246, 1)',
              borderWidth: 2,
              fill: true,
            },
          ],
        },
        conversationChartData: {
          labels: ['UI Components', 'API Endpoints', 'Database Queries', 'Utility Functions'],
          datasets: [
            {
              label: 'Code Types Generated',
              data: generateRandomData(4, 50, 200),
              backgroundColor: [
                'rgba(59, 130, 246, 0.6)',
                'rgba(16, 185, 129, 0.6)',
                'rgba(249, 115, 22, 0.6)',
                'rgba(139, 92, 246, 0.6)',
              ],
              borderWidth: 1,
            },
          ],
        },
        tableData: generateMockUsers(10),
        activityFeed: generateMockActivity(15),
        isLoading: false,
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return data;
} 