/**
 * Pricing page that displays subscription plans and FAQs
 */
import type { Metadata } from "next";

import { PricingPlans } from "./_components/pricing-plans";
import { PricingFAQ } from "./_components/pricing-faq";
import { Container } from "@/components/layout/container";

export const metadata: Metadata = {
  title: "Pricing | Slack Clone",
  description: "Choose the right plan for your team",
};

export default function PricingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
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
        </Container>
        <PricingFAQ />
      </main>
    </div>
  );
} 