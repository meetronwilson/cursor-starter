/**
 * Global error component for handling application errors
 */
"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { AlertTriangle } from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  // Log the error to an error reporting service
  useEffect(() => {
    console.error("Application error:", error);
    
    // Here you would typically log to an error reporting service like Sentry
    // Example: captureException(error);
  }, [error]);

  return (
    <Container>
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
        <div className="rounded-full bg-destructive/10 p-4 mb-6">
          <AlertTriangle className="h-10 w-10 text-destructive" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Something went wrong!</h1>
        <p className="text-muted-foreground mb-6 max-w-md">
          We apologize for the inconvenience. An unexpected error has occurred.
        </p>
        {error.digest && (
          <p className="text-sm text-muted-foreground mb-6">
            Error ID: {error.digest}
          </p>
        )}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button onClick={reset}>
            Try again
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">
              Return to home
            </Link>
          </Button>
        </div>
      </div>
    </Container>
  );
} 