/**
 * Hero section component for the marketing homepage
 * Features a headline, description, and call-to-action buttons
 */
"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { FadeIn } from "@/components/utilities/animations/fade-in";
import { SlideIn } from "@/components/utilities/animations/slide-in";

export function Hero() {
  return (
    <div className="relative overflow-hidden bg-background py-20 md:py-32">
      <Container className="relative">
        <div className="mx-auto max-w-4xl text-center">
          <FadeIn>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              <span className="block text-primary">Modern SaaS Platform</span>
              <span className="block">Built for the Future</span>
            </h1>
          </FadeIn>

          <SlideIn direction="up" delay={0.2}>
            <p className="mt-6 text-lg text-muted-foreground md:text-xl">
              A powerful, flexible, and user-friendly platform designed to help your business grow.
              Get started in minutes and transform the way you work.
            </p>
          </SlideIn>

          <SlideIn direction="up" delay={0.4}>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" className="rounded-full px-8">
                <Link href="/sign-up">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-8">
                <Link href="/pricing">View Pricing</Link>
              </Button>
            </div>
          </SlideIn>
        </div>
      </Container>

      {/* Background decoration */}
      <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
    </div>
  );
} 