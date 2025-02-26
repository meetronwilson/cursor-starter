/**
 * Features section component for the marketing homepage
 * Displays key features of the platform with icons and descriptions
 */
"use client";

import { 
  Zap, 
  Shield, 
  BarChart, 
  Users, 
  Clock, 
  Globe 
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { FadeIn } from "@/components/utilities/animations/fade-in";
import { SlideIn } from "@/components/utilities/animations/slide-in";

const features = [
  {
    name: "Lightning Fast",
    description: "Optimized for speed and performance, ensuring your workflow is never interrupted.",
    icon: Zap,
  },
  {
    name: "Secure by Design",
    description: "Enterprise-grade security with end-to-end encryption and regular security audits.",
    icon: Shield,
  },
  {
    name: "Advanced Analytics",
    description: "Gain insights with comprehensive analytics and customizable dashboards.",
    icon: BarChart,
  },
  {
    name: "Team Collaboration",
    description: "Seamless collaboration tools to keep your team connected and productive.",
    icon: Users,
  },
  {
    name: "Time-Saving Automation",
    description: "Automate repetitive tasks and focus on what matters most to your business.",
    icon: Clock,
  },
  {
    name: "Global Accessibility",
    description: "Access your workspace from anywhere in the world, on any device.",
    icon: Globe,
  },
];

export function Features() {
  return (
    <div className="bg-muted/40 py-24 sm:py-32">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <FadeIn>
            <h2 className="text-base font-semibold leading-7 text-primary">Features</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Everything you need to succeed
            </p>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Our platform provides all the tools you need to streamline your workflow,
              enhance productivity, and scale your business.
            </p>
          </FadeIn>
        </div>

        <div className="mx-auto mt-16 max-w-5xl sm:mt-20">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <SlideIn 
                key={feature.name} 
                direction="up" 
                delay={0.1 * index}
                className="relative"
              >
                <div className="rounded-xl border bg-background p-6 shadow-sm">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <feature.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{feature.name}</h3>
                  <p className="mt-2 text-muted-foreground">{feature.description}</p>
                </div>
              </SlideIn>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
} 