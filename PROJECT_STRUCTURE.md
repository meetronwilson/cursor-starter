# Project Structure

This document provides a detailed overview of the project structure for the Next.js Starter Template.

## Directory Structure

```
next-starter-template/
├── actions/                # Server actions for data mutations
│   ├── db/                 # Database-specific actions
│   │   ├── index.ts        # Export all database actions
│   │   └── users-actions.ts # User-related database actions
│   ├── index.ts            # Export all server actions
│   ├── profile.ts          # Profile-related actions
│   ├── subscription.ts     # Subscription-related actions
│   ├── types.ts            # Type definitions for actions
│   └── user.ts             # User-related actions
│
├── app/                    # Next.js App Router
│   ├── (auth)/             # Authenticated routes (route group)
│   │   ├── billing/        # Billing pages
│   │   │   ├── _components/# Billing-specific components
│   │   │   ├── layout.tsx  # Billing layout
│   │   │   ├── loading.tsx # Billing loading state
│   │   │   └── page.tsx    # Billing page
│   │   ├── dashboard/      # Dashboard pages
│   │   │   ├── _components/# Dashboard-specific components
│   │   │   ├── loading.tsx # Dashboard loading state
│   │   │   └── page.tsx    # Dashboard page
│   │   ├── profile/        # Profile pages
│   │   │   ├── _components/# Profile-specific components
│   │   │   ├── loading.tsx # Profile loading state
│   │   │   └── page.tsx    # Profile page
│   │   └── layout.tsx      # Layout for authenticated routes
│   │
│   ├── (marketing)/        # Marketing routes (route group)
│   │   └── page.tsx        # Marketing homepage
│   │
│   ├── _components/        # Shared components for routes
│   │   ├── marketing/      # Marketing-specific components
│   │   │   ├── cta.tsx     # Call-to-action component
│   │   │   ├── features.tsx# Features component
│   │   │   ├── footer.tsx  # Footer component
│   │   │   ├── hero.tsx    # Hero component
│   │   │   ├── navbar.tsx  # Navbar component
│   │   │   ├── pricing.tsx # Pricing component
│   │   │   └── testimonials.tsx # Testimonials component
│   │   └── shared/         # Shared components
│   │       └── logo.tsx    # Logo component
│   │
│   ├── api/                # API routes
│   │   ├── create-checkout-session/
│   │   │   └── route.ts    # Stripe checkout API
│   │   ├── create-portal-link/
│   │   │   └── route.ts    # Stripe portal API
│   │   ├── health/         # Health check endpoint
│   │   │   └── route.ts    # Health check API
│   │   └── webhooks/       # Webhook handlers
│   │       ├── clerk/      # Clerk webhooks
│   │       │   └── route.ts# Clerk webhook handler
│   │       └── stripe/     # Stripe webhooks
│   │           └── route.ts# Stripe webhook handler
│   │
│   ├── error.tsx           # Global error component
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   ├── loading.tsx         # Root loading component
│   ├── not-found.tsx       # 404 page
│   ├── page.tsx            # Root page
│   ├── pricing/            # Pricing page
│   │   ├── _components/    # Pricing-specific components
│   │   └── page.tsx        # Pricing page
│   ├── sign-in/            # Sign-in page
│   │   └── [[...sign-in]]/ # Clerk sign-in
│   │       └── page.tsx    # Sign-in page
│   └── sign-up/            # Sign-up page
│       └── [[...sign-up]]/ # Clerk sign-up
│           └── page.tsx    # Sign-up page
│
├── components/             # React components
│   ├── auth/               # Authentication components
│   │   ├── protected.tsx   # Protected content wrapper
│   │   ├── sign-in-button.tsx # Sign-in button
│   │   ├── sign-up-button.tsx # Sign-up button
│   │   └── user-button.tsx # User profile button
│   │
│   ├── billing/            # Billing components
│   │   ├── checkout-button.tsx # Checkout button
│   │   ├── pricing-table.tsx   # Pricing table
│   │   └── subscription-status.tsx # Subscription status
│   │
│   ├── layout/             # Layout components
│   │   ├── container.tsx   # Container component
│   │   ├── footer.tsx      # Footer component
│   │   ├── navbar.tsx      # Navbar component
│   │   └── sidebar.tsx     # Sidebar component
│   │
│   ├── providers/          # Context providers
│   │   ├── theme-provider.tsx # Theme provider
│   │   └── toast-provider.tsx # Toast provider
│   │
│   ├── ui/                 # Shadcn UI components
│   │   ├── accordion.tsx   # Accordion component
│   │   ├── badge.tsx       # Badge component
│   │   ├── button.tsx      # Button component
│   │   ├── card.tsx        # Card component
│   │   ├── dialog.tsx      # Dialog component
│   │   ├── dropdown-menu.tsx # Dropdown menu component
│   │   ├── form.tsx        # Form component
│   │   ├── input.tsx       # Input component
│   │   ├── sheet.tsx       # Sheet component
│   │   ├── skeleton.tsx    # Skeleton component
│   │   ├── sonner.tsx      # Sonner toast component
│   │   ├── tabs.tsx        # Tabs component
│   │   ├── theme-toggle.tsx # Theme toggle component
│   │   └── toast.tsx       # Toast component
│   │
│   └── utilities/          # Utility components
│       ├── animations/     # Animation components
│       │   ├── fade-in.tsx # Fade-in animation
│       │   ├── scale-in.tsx # Scale-in animation
│       │   └── slide-in.tsx # Slide-in animation
│       ├── error-boundary.tsx # Error boundary component
│       ├── fallback.tsx    # Fallback UI component
│       └── loading-spinner.tsx # Loading spinner component
│
├── db/                     # Database configuration
│   ├── db.ts               # Database client
│   ├── index.ts            # Database exports
│   ├── migrations/         # Database migrations
│   └── schema/             # Drizzle schemas
│       ├── index.ts        # Schema exports
│       ├── products-schema.ts # Products schema
│       ├── subscriptions-schema.ts # Subscriptions schema
│       └── users-schema.ts # Users schema
│
├── lib/                    # Utility functions
│   ├── animations.ts       # Animation utilities
│   ├── api.ts              # API utilities
│   ├── auth.ts             # Authentication utilities
│   ├── db.ts               # Database utilities
│   ├── error.ts            # Error handling utilities
│   ├── hooks/              # Custom React hooks
│   │   ├── use-dashboard-data.ts # Dashboard data hook
│   │   └── use-toast.ts    # Toast hook
│   ├── metadata.ts         # Metadata utilities
│   ├── stripe.ts           # Stripe utilities
│   ├── utils.ts            # General utilities
│   └── validation/         # Validation schemas
│       └── user.ts         # User validation schemas
│
├── public/                 # Static assets
│   ├── favicon.ico         # Favicon
│   ├── og-image.png        # Open Graph image
│   └── robots.txt          # Robots file
│
├── types/                  # TypeScript type definitions
│   └── index.ts            # Type exports
│
├── .env.example            # Example environment variables
├── .env.local              # Local environment variables (git-ignored)
├── .env.production         # Production environment variables template
├── .eslintrc.json          # ESLint configuration
├── .gitignore              # Git ignore rules
├── CONTRIBUTING.md         # Contribution guidelines
├── DEPLOYMENT.md           # Deployment guide
├── drizzle.config.ts       # Drizzle configuration
├── LICENSE                 # MIT License
├── middleware.ts           # Next.js middleware
├── next.config.js          # Next.js configuration
├── package.json            # Project dependencies and scripts
├── postcss.config.js       # PostCSS configuration
├── README.md               # Project documentation
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── vercel.json             # Vercel configuration
```

## Key Files and Their Purposes

### Configuration Files

- **next.config.js**: Next.js configuration, including image domains, webpack settings, and experimental features
- **tailwind.config.js**: Tailwind CSS configuration, including theme customization
- **tsconfig.json**: TypeScript configuration, including path aliases
- **drizzle.config.ts**: Drizzle ORM configuration for database connections
- **vercel.json**: Vercel deployment configuration
- **.env.example**: Example environment variables
- **.env.production**: Production environment variables template

### Core Application Files

- **app/layout.tsx**: Root layout with providers and global components
- **app/page.tsx**: Root page (marketing homepage)
- **middleware.ts**: Next.js middleware for route protection
- **lib/utils.ts**: General utility functions
- **lib/auth.ts**: Authentication utilities
- **lib/db.ts**: Database utilities
- **lib/stripe.ts**: Stripe utilities

### Database Schema Files

- **db/schema/users-schema.ts**: User schema synchronized with Clerk
- **db/schema/products-schema.ts**: Product schema for Stripe products
- **db/schema/subscriptions-schema.ts**: Subscription schema for Stripe subscriptions

### Server Action Files

- **actions/user.ts**: User-related server actions
- **actions/profile.ts**: Profile-related server actions
- **actions/subscription.ts**: Subscription-related server actions

### API Route Files

- **app/api/webhooks/clerk/route.ts**: Clerk webhook handler
- **app/api/webhooks/stripe/route.ts**: Stripe webhook handler
- **app/api/create-checkout-session/route.ts**: Stripe checkout API
- **app/api/create-portal-link/route.ts**: Stripe customer portal API

### Component Files

- **components/ui/**: Shadcn UI components
- **components/layout/**: Layout components
- **components/auth/**: Authentication components
- **components/billing/**: Billing components
- **components/providers/**: Context providers
- **components/utilities/**: Utility components

### Page Files

- **app/(auth)/dashboard/page.tsx**: Dashboard page
- **app/(auth)/profile/page.tsx**: Profile page
- **app/(auth)/billing/page.tsx**: Billing page
- **app/pricing/page.tsx**: Pricing page
- **app/sign-in/[[...sign-in]]/page.tsx**: Sign-in page
- **app/sign-up/[[...sign-up]]/page.tsx**: Sign-up page

## Route Groups

- **(auth)**: Authenticated routes that require a user to be logged in
- **(marketing)**: Public marketing routes that don't require authentication

## Component Organization

- **app/_components/**: Components specific to routes
- **components/**: Shared components used across the application
- **components/ui/**: UI components from Shadcn UI
- **components/layout/**: Layout components
- **components/auth/**: Authentication components
- **components/billing/**: Billing components
- **components/providers/**: Context providers
- **components/utilities/**: Utility components

## Data Flow

1. **User Authentication**: Handled by Clerk
2. **Database Access**: Handled by Drizzle ORM with Supabase
3. **Server Actions**: Used for data mutations
4. **API Routes**: Used for external integrations (Stripe, Clerk)
5. **Client Components**: Used for interactivity
6. **Server Components**: Used for data fetching and rendering 