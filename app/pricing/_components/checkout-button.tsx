/**
 * Checkout button component for initiating Stripe checkout
 */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface CheckoutButtonProps {
  priceId: string;
  buttonText: string;
  variant?: "default" | "outline" | "secondary" | "destructive" | "ghost" | "link";
  className?: string;
  disabled?: boolean;
}

export function CheckoutButton({
  priceId,
  buttonText,
  variant = "default",
  className,
  disabled = false,
}: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    try {
      setLoading(true);
      
      // Get the current URL for success and cancel URLs
      const origin = window.location.origin;
      const successUrl = `${origin}/billing?success=true`;
      const cancelUrl = `${origin}/pricing?canceled=true`;
      
      console.log("Creating checkout session with:", {
        priceId,
        successUrl,
        cancelUrl
      });
      
      // Call the API to create a checkout session
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          priceId,
          successUrl,
          cancelUrl,
        }),
      });
      
      const responseData = await response.json();
      
      console.log("Checkout session response:", {
        status: response.status,
        ok: response.ok,
        data: responseData
      });
      
      if (!response.ok) {
        throw new Error(responseData.error || "Failed to create checkout session");
      }
      
      // Redirect to the checkout URL - access the url from the data property
      if (responseData.data && responseData.data.url) {
        console.log("Redirecting to checkout URL:", responseData.data.url);
        window.location.href = responseData.data.url;
      } else {
        console.error("No URL in response data:", responseData);
        throw new Error("No checkout URL returned");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to start checkout process");
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleCheckout}
      variant={variant}
      className={className}
      disabled={disabled || loading}
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing...
        </>
      ) : (
        buttonText
      )}
    </Button>
  );
} 