/**
 * Success message component for checkout completion
 */
import { CheckCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function SuccessMessage() {
  return (
    <Alert className="my-4 border-green-500 bg-green-50 dark:bg-green-950/20">
      <CheckCircle className="h-5 w-5 text-green-500" />
      <AlertTitle className="text-green-700 dark:text-green-300">
        Subscription Successful!
      </AlertTitle>
      <AlertDescription className="text-green-600 dark:text-green-400 mt-2">
        <p>Thank you for subscribing! Your subscription has been activated.</p>
        <div className="mt-4">
          <Button asChild variant="outline" size="sm">
            <Link href="/billing">
              View Subscription Details
            </Link>
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  );
} 