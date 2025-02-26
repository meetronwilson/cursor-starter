/**
 * Pricing section component for the marketing homepage
 * Displays pricing plans with features and call-to-action buttons
 */
"use client";

import { Check } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { FadeIn } from "@/components/utilities/animations/fade-in";
import { SlideIn } from "@/components/utilities/animations/slide-in";

const plans = [
  {
    name: "Free",
    description: "Perfect for trying out our platform",
    price: "$0",
    duration: "forever",
    features: [
      "Up to 3 projects",
      "Basic analytics",
      "24-hour support response time",
      "1 team member",
      "1GB storage",
    ],
    cta: "Get Started",
    href: "/sign-up",
    highlighted: false,
  },
  {
    name: "Pro",
    description: "For individuals and small teams",
    price: "$19",
    duration: "per month",
    features: [
      "Unlimited projects",
      "Advanced analytics",
      "4-hour support response time",
      "Up to 10 team members",
      "10GB storage",
      "Custom domains",
      "API access",
    ],
    cta: "Start Free Trial",
    href: "/sign-up?plan=pro",
    highlighted: true,
  },
  {
    name: "Enterprise",
    description: "For organizations with advanced needs",
    price: "$49",
    duration: "per month",
    features: [
      "Everything in Pro",
      "Real-time analytics",
      "1-hour support response time",
      "Unlimited team members",
      "Unlimited storage",
      "Custom integrations",
      "Dedicated account manager",
      "SSO authentication",
    ],
    cta: "Contact Sales",
    href: "/contact",
    highlighted: false,
  },
];

export function Pricing() {
  return (
    <div className="bg-muted/40 py-24 sm:py-32">
      <Container>
        <FadeIn>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">Pricing</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Simple, transparent pricing
            </p>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Choose the plan that works best for you and your team. All plans include a 14-day free trial.
            </p>
          </div>
        </FadeIn>

        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <SlideIn 
              key={plan.name} 
              direction="up" 
              delay={0.1 * index}
              className="relative"
            >
              <div className={`flex h-full flex-col rounded-xl border ${plan.highlighted ? 'border-primary shadow-md' : 'border-border'} bg-background p-8`}>
                <div className="mb-4">
                  <h3 className="text-lg font-semibold">{plan.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
                </div>
                <div className="mb-6">
                  <p className="flex items-baseline">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="ml-1 text-sm text-muted-foreground">/{plan.duration}</span>
                  </p>
                </div>
                <ul className="mb-8 space-y-3 text-sm">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto">
                  <Button 
                    asChild 
                    className="w-full" 
                    variant={plan.highlighted ? "default" : "outline"}
                  >
                    <Link href={plan.href}>{plan.cta}</Link>
                  </Button>
                </div>
              </div>
            </SlideIn>
          ))}
        </div>
      </Container>
    </div>
  );
} 