/**
 * Payment methods component for displaying and managing payment methods
 */
"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, PlusCircle, Trash2 } from "lucide-react";

// Mock data for payment methods
const mockPaymentMethods = [
  {
    id: "pm_1",
    type: "card",
    brand: "visa",
    last4: "4242",
    expMonth: 12,
    expYear: 2024,
    isDefault: true,
  },
];

export function PaymentMethods() {
  const [paymentMethods, setPaymentMethods] = useState(mockPaymentMethods);
  const [isAddingNew, setIsAddingNew] = useState(false);

  // Format card expiration date
  const formatExpiry = (month: number, year: number) => {
    return `${month.toString().padStart(2, "0")}/${year.toString().slice(-2)}`;
  };

  // Get card brand icon (simplified version)
  const getCardIcon = (brand: string) => {
    // In a real app, you would use different icons based on the brand
    // For now, we'll just use the same icon for all brands
    console.log(`Rendering icon for ${brand} card`);
    return <CreditCard className="h-4 w-4" />;
  };

  // Handle adding a new payment method
  const handleAddPaymentMethod = () => {
    // In a real application, this would open a Stripe Elements form
    // or redirect to Stripe Checkout/Customer Portal
    setIsAddingNew(true);
    
    // For demo purposes, we'll just simulate adding a new card
    setTimeout(() => {
      const newMethod = {
        id: `pm_${Math.random().toString(36).substring(2, 9)}`,
        type: "card",
        brand: "mastercard",
        last4: "5555",
        expMonth: 3,
        expYear: 2025,
        isDefault: false,
      };
      
      setPaymentMethods([...paymentMethods, newMethod]);
      setIsAddingNew(false);
    }, 1000);
  };

  // Handle removing a payment method
  const handleRemovePaymentMethod = (id: string) => {
    setPaymentMethods(paymentMethods.filter((method) => method.id !== id));
  };

  // Handle setting a payment method as default
  const handleSetDefault = (id: string) => {
    setPaymentMethods(
      paymentMethods.map((method) => ({
        ...method,
        isDefault: method.id === id,
      }))
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Methods</CardTitle>
        <CardDescription>Manage your payment methods for billing.</CardDescription>
      </CardHeader>
      <CardContent>
        {paymentMethods.length > 0 ? (
          <div className="space-y-4">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="flex items-center gap-4">
                  {getCardIcon(method.brand)}
                  <div>
                    <p className="font-medium capitalize">
                      {method.brand} •••• {method.last4}
                      {method.isDefault && (
                        <span className="ml-2 text-xs text-muted-foreground">Default</span>
                      )}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Expires {formatExpiry(method.expMonth, method.expYear)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {!method.isDefault && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleSetDefault(method.id)}
                    >
                      Set Default
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-destructive"
                    onClick={() => handleRemovePaymentMethod(method.id)}
                    disabled={method.isDefault}
                  >
                    <span className="sr-only">Remove</span>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-6 text-center text-muted-foreground">
            No payment methods available.
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button
          variant="outline"
          className="w-full"
          onClick={handleAddPaymentMethod}
          disabled={isAddingNew}
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          {isAddingNew ? "Adding..." : "Add Payment Method"}
        </Button>
      </CardFooter>
    </Card>
  );
} 