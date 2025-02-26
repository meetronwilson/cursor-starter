/**
 * Marketing homepage for non-authenticated users
 * Combines all marketing components into a cohesive landing page
 */
import { Metadata } from "next";
import { Hero } from "@/app/_components/marketing/hero";
import { Features } from "@/app/_components/marketing/features";
import { Testimonials } from "@/app/_components/marketing/testimonials";
import { Pricing } from "@/app/_components/marketing/pricing";
import { CTA } from "@/app/_components/marketing/cta";

export const metadata: Metadata = {
  title: "Next.js Starter Template - Modern SaaS Platform",
  description: "A powerful, feature-rich starter template for building modern SaaS applications with Next.js, Tailwind CSS, and more.",
};

export default function MarketingPage() {
  return (
    <main>
      <Hero />
      <Features />
      <Testimonials />
      <Pricing />
      <CTA />
    </main>
  );
} 