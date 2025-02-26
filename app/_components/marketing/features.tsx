/**
 * Features section component for the marketing homepage
 * Displays key features of the platform with icons and descriptions
 */
"use client";

import { 
  Zap, 
  Sparkles, 
  Brain, 
  MessageSquare, 
  Code, 
  Workflow 
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { FadeIn } from "@/components/utilities/animations/fade-in";
import { SlideIn } from "@/components/utilities/animations/slide-in";

const features = [
  {
    name: "Natural Language Coding",
    description: "Express your ideas in plain English and watch as they transform into functional code through AI assistance.",
    icon: MessageSquare,
  },
  {
    name: "Flow State Programming",
    description: "Enter a trance-like state of productivity where code flows naturally and bugs fix themselves.",
    icon: Workflow,
  },
  {
    name: "AI-Powered Assistance",
    description: "Let advanced AI models handle the technical implementation while you focus on high-level problem-solving.",
    icon: Brain,
  },
  {
    name: "Rapid Prototyping",
    description: "Build functional prototypes in hours instead of days by leveraging AI to handle boilerplate and repetitive tasks.",
    icon: Zap,
  },
  {
    name: "Creative Problem Solving",
    description: "Focus on the creative aspects of development while AI handles the nitty-gritty implementation details.",
    icon: Sparkles,
  },
  {
    name: "Code Quality Assurance",
    description: "AI ensures your code follows best practices, is well-documented, and free of common bugs and vulnerabilities.",
    icon: Code,
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
              The Vibe Coding Experience
            </p>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Our platform provides all the tools you need to embrace the Vibe Coding paradigm,
              enhancing your productivity and creativity while reducing technical friction.
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