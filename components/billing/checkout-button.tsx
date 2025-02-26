/**
 * Checkout button component for initiating the Stripe checkout process
 */
"use client";

import { useState } from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

interface CheckoutButtonProps extends ButtonProps {
  priceId: string;
  text?: string;
  loadingText?: string;
  successUrl?: string;
  cancelUrl?: string;
}

export function CheckoutButton({
  priceId,
  text = "Subscribe",
  loadingText = "Redirecting to checkout...",
  successUrl = `${window.location.origin}/dashboard?checkout=success`,
  cancelUrl = `${window.location.origin}/pricing?checkout=canceled`,
  ...props
}: CheckoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleCheckout = async () => {
    setIsLoading(true);

    try {
      // Create a checkout session
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

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create checkout session");
      }

      // Redirect to Stripe Checkout
      if (data.url) {
        router.push(data.url);
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      setIsLoading(false);
      // You could add toast notification here
    }
  };

  return (
    <Button onClick={handleCheckout} disabled={isLoading} {...props}>
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          {loadingText}
        </>
      ) : (
        text
      )}
    </Button>
  );
} 