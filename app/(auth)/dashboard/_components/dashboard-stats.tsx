/**
 * Dashboard stats component with key metrics and visualizations
 */
"use client";

import { 
  ArrowUpRight, 
  ArrowDownRight, 
  Code, 
  MessageSquare, 
  Sparkles, 
  Brain 
} from "lucide-react";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  trend: {
    value: string;
    isPositive: boolean;
  };
}

const stats: StatCardProps[] = [
  {
    title: "AI-Generated Code",
    value: "12,543",
    description: "Lines of code generated",
    icon: <Code className="h-4 w-4 text-muted-foreground" />,
    trend: {
      value: "+24.5%",
      isPositive: true,
    },
  },
  {
    title: "Natural Language Prompts",
    value: "1,453",
    description: "Prompts used for generation",
    icon: <MessageSquare className="h-4 w-4 text-muted-foreground" />,
    trend: {
      value: "+18.2%",
      isPositive: true,
    },
  },
  {
    title: "Vibe Score",
    value: "87/100",
    description: "Your coding flow rating",
    icon: <Sparkles className="h-4 w-4 text-muted-foreground" />,
    trend: {
      value: "+5.5%",
      isPositive: true,
    },
  },
  {
    title: "AI Suggestions",
    value: "324",
    description: "Accepted AI recommendations",
    icon: <Brain className="h-4 w-4 text-muted-foreground" />,
    trend: {
      value: "+12.3%",
      isPositive: true,
    },
  },
];

export function DashboardStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {stat.title}
            </CardTitle>
            {stat.icon}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              {stat.description}
            </p>
          </CardContent>
          <CardFooter>
            <div className="flex items-center text-sm">
              {stat.trend.isPositive ? (
                <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
              ) : (
                <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
              )}
              <span className={stat.trend.isPositive ? "text-green-500" : "text-red-500"}>
                {stat.trend.value}
              </span>
              <span className="ml-1 text-muted-foreground">from last month</span>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
} 