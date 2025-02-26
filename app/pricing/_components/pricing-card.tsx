/**
 * Pricing card component for displaying subscription plan details
 */
import { Check } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface PricingFeature {
  text: string;
  included: boolean;
}

export interface PricingTier {
  name: string;
  description: string;
  price: string;
  priceDescription?: string;
  features: PricingFeature[];
  buttonText: string;
  buttonLink: string;
  popular?: boolean;
}

interface PricingCardProps {
  tier: PricingTier;
}

export function PricingCard({ tier }: PricingCardProps) {
  return (
    <Card className={cn(
      "flex flex-col justify-between",
      tier.popular && "border-primary shadow-md"
    )}>
      {tier.popular && (
        <div className="absolute -top-3 left-0 right-0 mx-auto w-fit rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
          Most Popular
        </div>
      )}
      <div>
        <CardHeader>
          <CardTitle className="text-xl">{tier.name}</CardTitle>
          <CardDescription>{tier.description}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div>
            <span className="text-3xl font-bold">{tier.price}</span>
            {tier.priceDescription && (
              <span className="text-sm text-muted-foreground"> {tier.priceDescription}</span>
            )}
          </div>
          <div className="grid gap-2">
            {tier.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                {feature.included ? (
                  <Check className="h-4 w-4 text-primary" />
                ) : (
                  <div className="h-4 w-4" />
                )}
                <span className={cn(
                  "text-sm",
                  !feature.included && "text-muted-foreground line-through"
                )}>
                  {feature.text}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </div>
      <CardFooter>
        <Button
          asChild
          className="w-full"
          variant={tier.popular ? "default" : "outline"}
        >
          <Link href={tier.buttonLink}>
            {tier.buttonText}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
} 