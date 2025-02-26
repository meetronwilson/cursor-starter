/**
 * Activity feed component for displaying recent user activities
 * Shows a chronological list of actions with user information
 */
"use client";

import { useState } from "react";
import { MessageSquare, User, AlertCircle, CreditCard } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ActivityItem } from "@/lib/hooks/use-dashboard-data";

interface ActivityFeedProps {
  title: string;
  description?: string;
  data: ActivityItem[];
  className?: string;
  limit?: number;
}

export function ActivityFeed({ 
  title, 
  description, 
  data, 
  className,
  limit = 5
}: ActivityFeedProps) {
  const [showAll, setShowAll] = useState(false);
  const displayData = showAll ? data : data.slice(0, limit);

  // Format date relative to now
  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) {
      return "just now";
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
    } else {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} ${days === 1 ? "day" : "days"} ago`;
    }
  };

  // Get icon based on activity type
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "message":
        return <MessageSquare className="h-5 w-5 text-blue-500" />;
      case "user":
        return <User className="h-5 w-5 text-green-500" />;
      case "system":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case "payment":
        return <CreditCard className="h-5 w-5 text-purple-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {displayData.length > 0 ? (
            displayData.map((item) => (
              <div key={item.id} className="flex items-start gap-4 border-b pb-4 last:border-0 last:pb-0">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted">
                  {getActivityIcon(item.type)}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{item.user.name}</p>
                    <span className="text-xs text-muted-foreground">
                      {formatRelativeTime(item.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium">{item.action}</span> {item.target}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-muted-foreground">No recent activity.</div>
          )}
        </div>
        
        {data.length > limit && (
          <Button
            variant="ghost"
            size="sm"
            className="mt-4 w-full"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "Show Less" : `Show All (${data.length})`}
          </Button>
        )}
      </CardContent>
    </Card>
  );
} 