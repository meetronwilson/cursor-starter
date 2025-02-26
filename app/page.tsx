/**
 * Main homepage for non-authenticated users
 * Combines all marketing components into a cohesive landing page
 */
import { Metadata } from "next";
import { Hero } from "@/app/_components/marketing/hero";
import { Features } from "@/app/_components/marketing/features";
import { Testimonials } from "@/app/_components/marketing/testimonials";
import { Pricing } from "@/app/_components/marketing/pricing";
import { CTA } from "@/app/_components/marketing/cta";

export const metadata: Metadata = {
  title: "CursorStarter: Vibe Coding Template",
  description: "A modern Next.js starter template for Vibe Coding with AI-assisted development workflow.",
};

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Testimonials />
      <Pricing />
      <CTA />
    </>
  );
}
