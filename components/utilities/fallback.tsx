/**
 * Fallback UI component for error boundaries
 */
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

interface FallbackProps {
  error: Error | null;
  reset: () => void;
}

export function Fallback({ error, reset }: FallbackProps) {
  return (
    <Card className="mx-auto my-8 max-w-md">
      <CardHeader className="space-y-1 flex flex-col items-center">
        <div className="rounded-full bg-destructive/10 p-3 mb-2">
          <AlertTriangle className="h-6 w-6 text-destructive" />
        </div>
        <CardTitle className="text-center">Something went wrong</CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <p className="text-sm text-muted-foreground mb-4">
          An error occurred in this component. We&apos;ve been notified and will fix the issue as soon as possible.
        </p>
        {error && process.env.NODE_ENV === "development" && (
          <div className="mt-4 rounded-md bg-muted p-4 overflow-auto text-left">
            <p className="text-xs font-mono text-muted-foreground break-words">
              {error.message}
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={reset} className="w-full">
          Try again
        </Button>
      </CardFooter>
    </Card>
  );
} 