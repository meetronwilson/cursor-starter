/**
 * Dedicated pricing page that provides detailed information about subscription plans
 */
import { Metadata } from "next";
import { PricingHeader } from "./_components/pricing-header";
import { PricingTiers } from "./_components/pricing-tiers";
import { PricingFAQ } from "./_components/pricing-faq";
import { Container } from "@/components/layout/container";
import { CTA } from "@/app/_components/marketing/cta";

export const metadata: Metadata = {
  title: "Pricing - Next.js Starter Template",
  description: "Choose the perfect plan for your needs. Flexible pricing options for individuals, teams, and enterprises.",
};

export default function PricingPage() {
  return (
    <main>
      <Container>
        <PricingHeader />
        <PricingTiers />
        <PricingFAQ />
      </Container>
      <CTA />
    </main>
  );
} 