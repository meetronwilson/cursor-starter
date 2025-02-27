/**
 * Cancel message component for checkout cancellation
 */
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function CancelMessage() {
  return (
    <Alert className="mb-6 border-amber-500 bg-amber-50 dark:bg-amber-950/20">
      <AlertCircle className="h-5 w-5 text-amber-500" />
      <AlertTitle className="text-amber-700 dark:text-amber-300">
        Checkout Canceled
      </AlertTitle>
      <AlertDescription className="text-amber-600 dark:text-amber-400">
        Your checkout process was canceled. If you have any questions or need assistance, please contact our support team.
      </AlertDescription>
    </Alert>
  );
} 