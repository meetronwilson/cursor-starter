/**
 * Pricing page that displays subscription plans and FAQs
 */
import { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";

import { PricingPlans } from "@/app/pricing/_components/pricing-plans";
import { PricingFAQ } from "@/app/pricing/_components/pricing-faq";
import { Container } from "@/components/layout/container";

export const metadata: Metadata = createMetadata({
  title: "Pricing",
  description: "Choose the right plan for your team",
  keywords: ["pricing", "subscription", "plans", "billing"],
});

export default function PricingPage() {
  return (
    <Container>
      <div className="py-12 md:py-16 lg:py-20">
        <div className="mx-auto max-w-3xl text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
            Simple, transparent pricing
          </h1>
          <p className="text-xl text-muted-foreground">
            Choose the plan that&apos;s right for your team. All plans include a 14-day free trial.
          </p>
        </div>
        <PricingPlans />
      </div>
      <PricingFAQ />
    </Container>
  );
} 