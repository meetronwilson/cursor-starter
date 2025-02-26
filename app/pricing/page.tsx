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
  description: "Choose the right Vibe Coding plan for your development needs",
  keywords: ["pricing", "subscription", "plans", "billing", "vibe coding"],
});

export default function PricingPage() {
  return (
    <Container>
      <div className="py-12 md:py-16 lg:py-20">
        <div className="mx-auto max-w-3xl text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
            Find Your Vibe Coding Plan
          </h1>
          <p className="text-xl text-muted-foreground">
            Choose the plan that matches your development style. All plans include AI-assisted coding features and a 14-day free trial.
          </p>
        </div>
        <PricingPlans />
      </div>
      <PricingFAQ />
    </Container>
  );
} 