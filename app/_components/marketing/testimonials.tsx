/**
 * Testimonials section component for the marketing homepage
 * Displays customer testimonials in a grid layout
 */
"use client";

import Image from "next/image";
import { Container } from "@/components/layout/container";
import { FadeIn } from "@/components/utilities/animations/fade-in";
import { SlideIn } from "@/components/utilities/animations/slide-in";

const testimonials = [
  {
    content: "Vibe Coding has completely transformed my development workflow. I'm building applications 3x faster by letting AI handle the implementation details while I focus on the big picture.",
    author: {
      name: "Sarah Johnson",
      role: "Full-Stack Developer",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
    },
  },
  {
    content: "As someone new to programming, Vibe Coding has been a game-changer. I can express my ideas in natural language and watch them transform into working code. It's like having a senior developer by my side.",
    author: {
      name: "Michael Chen",
      role: "Startup Founder",
      image: "https://randomuser.me/api/portraits/men/2.jpg",
    },
  },
  {
    content: "The flow state I achieve with Vibe Coding is incredible. I'm more creative, productive, and actually enjoy the development process now that I'm not fighting with syntax and boilerplate code.",
    author: {
      name: "Emma Rodriguez",
      role: "Frontend Engineer",
      image: "https://randomuser.me/api/portraits/women/3.jpg",
    },
  },
  {
    content: "Our team has adopted Vibe Coding for rapid prototyping, and we're delivering MVPs in days instead of weeks. The ability to iterate quickly with AI assistance has been invaluable for our business.",
    author: {
      name: "David Kim",
      role: "Product Manager",
      image: "https://randomuser.me/api/portraits/men/4.jpg",
    },
  },
  {
    content: "I was skeptical about AI-assisted coding, but Vibe Coding has made me a believer. The quality of the generated code is impressive, and it's helped me learn best practices I wouldn't have discovered otherwise.",
    author: {
      name: "Olivia Martinez",
      role: "Computer Science Student",
      image: "https://randomuser.me/api/portraits/women/5.jpg",
    },
  },
  {
    content: "Vibe Coding has democratized software development. Our non-technical team members can now contribute to our codebase by describing features in plain English, which has accelerated our development cycle.",
    author: {
      name: "James Wilson",
      role: "CTO at TechInnovate",
      image: "https://randomuser.me/api/portraits/men/6.jpg",
    },
  },
];

export function Testimonials() {
  return (
    <div className="py-24 sm:py-32">
      <Container>
        <FadeIn>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">Testimonials</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Developers who found their vibe
            </p>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Hear from developers who have embraced the Vibe Coding paradigm and transformed their development experience.
            </p>
          </div>
        </FadeIn>

        <div className="mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-8 sm:mt-20 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <SlideIn 
              key={index} 
              direction="up" 
              delay={0.1 * index}
              className="relative"
            >
              <div className="flex h-full flex-col justify-between rounded-xl border bg-background p-6 shadow-sm">
                <div>
                  <svg
                    className="h-8 w-8 text-primary/20"
                    fill="currentColor"
                    viewBox="0 0 32 32"
                    aria-hidden="true"
                  >
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                  </svg>
                  <p className="mt-4 text-base leading-7 text-foreground">
                    {testimonial.content}
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-x-4">
                  <Image
                    className="h-10 w-10 rounded-full bg-gray-50"
                    src={testimonial.author.image}
                    alt={testimonial.author.name}
                    width={40}
                    height={40}
                  />
                  <div>
                    <h3 className="text-sm font-semibold leading-6 text-foreground">
                      {testimonial.author.name}
                    </h3>
                    <p className="text-xs leading-5 text-muted-foreground">
                      {testimonial.author.role}
                    </p>
                  </div>
                </div>
              </div>
            </SlideIn>
          ))}
        </div>
      </Container>
    </div>
  );
} 