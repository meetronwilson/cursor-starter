/**
 * Call-to-action section component for the marketing homepage
 * Displays a prominent section encouraging users to sign up
 */
"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { FadeIn } from "@/components/utilities/animations/fade-in";

export function CTA() {
  return (
    <div className="py-24 sm:py-32">
      <Container>
        <div className="relative isolate overflow-hidden bg-primary/10 px-6 py-24 text-center shadow-sm sm:rounded-3xl sm:px-16">
          <FadeIn>
            <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to find your coding vibe?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
              Join thousands of developers already using Vibe Coding to build faster, 
              think more creatively, and enjoy the development process like never before.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button asChild size="lg">
                <Link href="/sign-up">
                  Start your vibe journey
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact">Learn more</Link>
              </Button>
            </div>
          </FadeIn>
          
          {/* Background decorative elements */}
          <svg
            viewBox="0 0 1024 1024"
            className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
            aria-hidden="true"
          >
            <circle
              cx={512}
              cy={512}
              r={512}
              fill="url(#gradient)"
              fillOpacity="0.15"
            />
            <defs>
              <radialGradient id="gradient">
                <stop stopColor="var(--primary)" />
                <stop offset={1} stopColor="var(--primary)" />
              </radialGradient>
            </defs>
          </svg>
          <div
            className="absolute -top-24 right-0 -z-10 transform-gpu blur-3xl"
            aria-hidden="true"
          >
            <div
              className="aspect-[1404/767] w-[87.75rem] bg-gradient-to-r from-primary/30 to-primary/10 opacity-30"
              style={{
                clipPath:
                  'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)',
              }}
            />
          </div>
        </div>
      </Container>
    </div>
  );
} 