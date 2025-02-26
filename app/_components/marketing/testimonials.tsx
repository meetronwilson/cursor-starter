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
    content: "This platform has completely transformed how I work. The interface is intuitive and the features are exactly what I needed.",
    author: {
      name: "Emma Wilson",
      role: "Product Manager",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
    },
  },
  {
    content: "I've tried many similar tools, but this one stands out for its performance and reliability. It's become essential to my workflow.",
    author: {
      name: "Alex Chen",
      role: "Software Engineer",
      image: "https://randomuser.me/api/portraits/men/2.jpg",
    },
  },
  {
    content: "The customer support is exceptional. Any time I've had an issue, the team has been quick to respond and incredibly helpful.",
    author: {
      name: "Sarah Johnson",
      role: "Marketing Director",
      image: "https://randomuser.me/api/portraits/women/3.jpg",
    },
  },
  {
    content: "This tool has saved me countless hours of work. The automation features are particularly impressive.",
    author: {
      name: "Michael Brown",
      role: "UX Designer",
      image: "https://randomuser.me/api/portraits/men/4.jpg",
    },
  },
  {
    content: "The recent updates have made an already great product even better. I appreciate how the team continuously improves the platform.",
    author: {
      name: "Jessica Lee",
      role: "Content Strategist",
      image: "https://randomuser.me/api/portraits/women/5.jpg",
    },
  },
  {
    content: "I was skeptical at first, but after using it for a month, I'm completely sold. It's worth every penny.",
    author: {
      name: "David Kim",
      role: "Startup Founder",
      image: "https://randomuser.me/api/portraits/men/6.jpg",
    },
  },
];

export function Testimonials() {
  return (
    <div id="testimonials" className="py-24 sm:py-32">
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