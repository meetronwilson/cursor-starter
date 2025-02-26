/**
 * Metadata utilities for managing SEO metadata across the application
 */
import { Metadata } from "next";

// Base metadata that will be used across the application
export const baseMetadata: Metadata = {
  title: {
    default: "Next.js Starter Template",
    template: "%s | Next.js Starter Template",
  },
  description: "A modern Next.js starter template with Tailwind CSS, Shadcn UI, and more.",
  keywords: [
    "Next.js",
    "React",
    "Tailwind CSS",
    "Shadcn UI",
    "TypeScript",
    "Starter Template",
    "Supabase",
    "Drizzle ORM",
    "Clerk Auth",
    "Stripe",
  ],
  authors: [
    {
      name: "Your Name",
      url: "https://yourwebsite.com",
    },
  ],
  creator: "Next.js Starter Template",
  publisher: "Next.js Starter Template",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_APP_URL,
    title: "Next.js Starter Template",
    description: "A modern Next.js starter template with Tailwind CSS, Shadcn UI, and more.",
    siteName: "Next.js Starter Template",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_APP_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Next.js Starter Template",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Next.js Starter Template",
    description: "A modern Next.js starter template with Tailwind CSS, Shadcn UI, and more.",
    images: [`${process.env.NEXT_PUBLIC_APP_URL}/og-image.jpg`],
    creator: "@yourusername",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

/**
 * Create metadata for a specific page
 */
export function createMetadata(options: {
  title?: string;
  description?: string;
  keywords?: string[];
} = {}): Metadata {
  const { title, description, keywords = [] } = options;
  const baseKeywords = baseMetadata.keywords || [];
  
  // Create a new metadata object
  const metadata: Metadata = {
    ...baseMetadata,
  };
  
  // Update title if provided
  if (title) {
    metadata.title = title;
    
    if (metadata.openGraph) {
      metadata.openGraph.title = title;
    }
    
    if (metadata.twitter) {
      metadata.twitter.title = title;
    }
  }
  
  // Update description if provided
  if (description) {
    metadata.description = description;
    
    if (metadata.openGraph) {
      metadata.openGraph.description = description;
    }
    
    if (metadata.twitter) {
      metadata.twitter.description = description;
    }
  }
  
  // Update keywords if provided
  if (keywords.length > 0) {
    metadata.keywords = [...baseKeywords, ...keywords];
  }
  
  return metadata;
} 