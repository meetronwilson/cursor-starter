/**
 * Success message component for subscription activation
 */
import { CheckCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function SuccessMessage() {
  return (
    <Alert className="mb-6 border-green-500 bg-green-50 dark:bg-green-950/20">
      <CheckCircle className="h-5 w-5 text-green-500" />
      <AlertTitle className="text-green-700 dark:text-green-300">
        Subscription Activated
      </AlertTitle>
      <AlertDescription className="text-green-600 dark:text-green-400">
        Your subscription has been successfully activated. You now have access to all the features included in your plan.
      </AlertDescription>
    </Alert>
  );
} 