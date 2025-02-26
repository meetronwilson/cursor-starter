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
    content: "This platform has completely transformed how our team collaborates. The intuitive interface and powerful features have boosted our productivity by over 40%.",
    author: {
      name: "Sarah Johnson",
      role: "Product Manager at TechCorp",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
    },
  },
  {
    content: "I&apos;ve tried dozens of productivity tools, but this one stands out. The automation features alone have saved me hours each week. Highly recommended!",
    author: {
      name: "Michael Chen",
      role: "Freelance Developer",
      image: "https://randomuser.me/api/portraits/men/2.jpg",
    },
  },
  {
    content: "The analytics dashboard provides insights we never had before. We&apos;ve been able to identify bottlenecks and optimize our workflow significantly.",
    author: {
      name: "Emma Rodriguez",
      role: "Operations Director at GrowthCo",
      image: "https://randomuser.me/api/portraits/women/3.jpg",
    },
  },
  {
    content: "Security was our main concern when choosing a platform. The robust security features and compliance certifications made this an easy choice for our enterprise.",
    author: {
      name: "David Kim",
      role: "CTO at SecureFinance",
      image: "https://randomuser.me/api/portraits/men/4.jpg",
    },
  },
  {
    content: "The customer support team is exceptional. Any time we&apos;ve had questions, they&apos;ve responded quickly and effectively. It&apos;s rare to find this level of service.",
    author: {
      name: "Olivia Martinez",
      role: "Customer Success at RetailPlus",
      image: "https://randomuser.me/api/portraits/women/5.jpg",
    },
  },
  {
    content: "We&apos;ve seen a 30% increase in team engagement since implementing this platform. The collaboration tools are seamless and intuitive.",
    author: {
      name: "James Wilson",
      role: "HR Director at GlobalTeam",
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
              Trusted by thousands of teams worldwide
            </p>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Don&apos;t just take our word for it — hear what our customers have to say about their experience.
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