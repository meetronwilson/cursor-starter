# Next.js Starter Template Implementation Plan

This implementation plan creates a clean, modern starter template with the following tech stack:
- **Frontend**: Next.js, Tailwind CSS, Shadcn UI, Framer Motion
- **Backend**: Postgres, Supabase, Drizzle ORM, Server Actions
- **Auth**: Clerk
- **Payments**: Stripe
- **Deployment**: Vercel

## Project Setup and Configuration
- [ ] Step 1: Initialize Next.js project with TypeScript
  - **Task**: Create a new Next.js project with TypeScript and set up the initial configuration.
  - **Files**:
    - `package.json`: Create with initial dependencies
    - `tsconfig.json`: Configure TypeScript
    - `.gitignore`: Set up Git ignore rules
    - `README.md`: Create project documentation
  - **User Instructions**: 
    - Run `npx create-next-app@latest --typescript` to initialize the project
    - Choose "Yes" for App Router, ESLint, Tailwind CSS, and "src/" directory

- [ ] Step 2: Install and configure essential dependencies
  - **Task**: Add core dependencies including Tailwind CSS, Shadcn UI, Framer Motion, and other utilities.
  - **Files**:
    - `package.json`: Update with additional dependencies
    - `tailwind.config.js`: Configure Tailwind CSS
    - `postcss.config.js`: Set up PostCSS
    - `tsconfig.json`: Update TypeScript configuration for path aliases
  - **Step Dependencies**: Step 1
  - **User Instructions**:
    - Run `npm install` after files are created

- [ ] Step 3: Set up project structure and environment variables
  - **Task**: Create the project folder structure and set up environment configuration.
  - **Files**:
    - `src/app/layout.tsx`: Create root layout
    - `src/app/page.tsx`: Create home page
    - `src/lib/utils.ts`: Create utility functions
    - `.env.example`: Create example environment variables
    - `.env.local`: Local environment variables (user will create)
  - **Step Dependencies**: Step 2
  - **User Instructions**:
    - Copy `.env.example` to `.env.local` and fill in your values

- [ ] Step 4: Configure Shadcn UI
  - **Task**: Set up Shadcn UI library and install essential components.
  - **Files**:
    - `components.json`: Shadcn UI configuration
    - `src/lib/utils.ts`: Update with Shadcn utilities
    - `src/components/ui/button.tsx`: Button component
    - `src/components/ui/card.tsx`: Card component
    - `src/components/ui/dialog.tsx`: Dialog component
    - `src/components/ui/dropdown-menu.tsx`: Dropdown menu component
    - `src/components/ui/form.tsx`: Form component
    - `src/components/ui/input.tsx`: Input component
  - **Step Dependencies**: Step 3
  - **User Instructions**:
    - Run `npx shadcn-ui@latest init` to set up Shadcn UI
    - Run `npx shadcn-ui@latest add [component-name]` for each component

## Supabase and Database Setup
- [ ] Step 5: Set up Supabase project and client
  - **Task**: Create a Supabase project and set up the client for Next.js.
  - **Files**:
    - `src/lib/supabase/client.ts`: Client-side Supabase client
    - `src/lib/supabase/server.ts`: Server-side Supabase client
    - `src/lib/supabase/middleware.ts`: Supabase middleware utilities
  - **Step Dependencies**: Step 4
  - **User Instructions**:
    - Create a Supabase project at https://supabase.com
    - Copy your project URL and anon key to `.env.local`

- [ ] Step 6: Configure Drizzle ORM
  - **Task**: Set up Drizzle ORM for database schema management and queries.
  - **Files**:
    - `src/db/index.ts`: Drizzle database client setup
    - `drizzle.config.ts`: Drizzle configuration
    - `src/db/schema/index.ts`: Schema exports file
  - **Step Dependencies**: Step 5
  - **User Instructions**:
    - Configure Drizzle to connect to your Supabase PostgreSQL database

- [ ] Step 7: Create initial database schemas
  - **Task**: Create basic database schemas to establish the structure.
  - **Files**:
    - `src/db/schema/users.ts`: User schema (synchronized with Clerk)
    - `src/db/schema/products.ts`: Product schema
    - `src/db/schema/subscriptions.ts`: Subscription schema
  - **Step Dependencies**: Step 6

- [ ] Step 8: Generate and apply database migrations
  - **Task**: Create and run initial database migrations using Drizzle.
  - **Files**:
    - `src/db/migrations/`: Migration files directory
    - `package.json`: Add migration commands
  - **Step Dependencies**: Step 7
  - **User Instructions**:
    - Run `npx drizzle-kit generate:pg` to generate migrations
    - Run `npx drizzle-kit push:pg` to apply migrations to your database

## Authentication with Clerk
- [ ] Step 9: Set up Clerk authentication
  - **Task**: Integrate Clerk for authentication and user management.
  - **Files**:
    - `src/app/layout.tsx`: Update with Clerk provider
    - `src/lib/auth.ts`: Authentication utilities
    - `middleware.ts`: Clerk middleware for protected routes
  - **Step Dependencies**: Step 8
  - **User Instructions**:
    - Create a Clerk account at https://clerk.dev
    - Set up a new application in Clerk dashboard
    - Add Clerk API keys to `.env.local`

- [ ] Step 10: Create sign-in and sign-up pages
  - **Task**: Implement Clerk authentication UI components and flows.
  - **Files**:
    - `src/app/sign-in/[[...sign-in]]/page.tsx`: Sign-in page
    - `src/app/sign-up/[[...sign-up]]/page.tsx`: Sign-up page
    - `src/components/auth/auth-button.tsx`: Auth button component
    - `src/components/auth/user-button.tsx`: User profile button
  - **Step Dependencies**: Step 9

- [ ] Step 11: Configure Clerk webhooks
  - **Task**: Set up Clerk webhooks to synchronize user data with Supabase.
  - **Files**:
    - `src/app/api/webhooks/clerk/route.ts`: Clerk webhook handler
    - `src/lib/clerk-webhook.ts`: Webhook processing utilities
  - **Step Dependencies**: Step 10
  - **User Instructions**:
    - Set up a webhook endpoint in your Clerk dashboard
    - Configure the webhook to point to your `/api/webhooks/clerk` endpoint
    - Add the webhook secret to `.env.local`

- [ ] Step 12: Implement route protection and authorization
  - **Task**: Create utility functions for route protection and role-based access.
  - **Files**:
    - `src/middleware.ts`: Update for custom route protection
    - `src/lib/auth.ts`: Add authorization utilities
    - `src/components/auth/protected.tsx`: Protected content wrapper
  - **Step Dependencies**: Step 11

## Server Actions and API Routes
- [ ] Step 13: Set up basic server actions framework
  - **Task**: Create the structure for server actions with validation.
  - **Files**:
    - `src/actions/index.ts`: Server actions exports
    - `src/lib/validation.ts`: Zod validation utilities
    - `src/actions/types.ts`: Type definitions for actions
  - **Step Dependencies**: Step 12

- [ ] Step 14: Implement user profile server actions
  - **Task**: Create server actions for user profile management.
  - **Files**:
    - `src/actions/user.ts`: User profile actions
    - `src/lib/validation/user.ts`: User validation schemas
  - **Step Dependencies**: Step 13

- [ ] Step 15: Create API route utilities
  - **Task**: Set up utility functions for API routes and error handling.
  - **Files**:
    - `src/lib/api.ts`: API utilities
    - `src/lib/error.ts`: Error handling utilities
    - `src/app/api/health/route.ts`: Health check API route
  - **Step Dependencies**: Step 14

## Stripe Integration
- [ ] Step 16: Set up Stripe integration
  - **Task**: Configure Stripe for payment processing and subscriptions.
  - **Files**:
    - `src/lib/stripe.ts`: Stripe client and utilities
    - `src/app/api/webhooks/stripe/route.ts`: Stripe webhook handler
  - **Step Dependencies**: Step 15
  - **User Instructions**:
    - Create a Stripe account at https://stripe.com
    - Add Stripe API keys to `.env.local`
    - Set up a webhook endpoint in your Stripe dashboard

- [ ] Step 17: Create subscription components
  - **Task**: Implement UI components for subscription management.
  - **Files**:
    - `src/components/billing/pricing-table.tsx`: Pricing table component
    - `src/components/billing/checkout-button.tsx`: Checkout button
    - `src/components/billing/subscription-status.tsx`: Subscription status component
  - **Step Dependencies**: Step 16

- [ ] Step 18: Implement checkout and billing portal
  - **Task**: Create API routes and actions for Stripe checkout and customer portal.
  - **Files**:
    - `src/app/api/create-checkout-session/route.ts`: Checkout session API route
    - `src/app/api/create-portal-link/route.ts`: Customer portal API route
    - `src/actions/subscription.ts`: Subscription-related actions
  - **Step Dependencies**: Step 17

## UI Components and Layout
- [ ] Step 19: Set up theme provider with dark mode
  - **Task**: Implement theming with dark mode support using Tailwind and next-themes.
  - **Files**:
    - `src/components/providers/theme-provider.tsx`: Theme provider
    - `src/components/ui/theme-toggle.tsx`: Theme toggle component
    - `src/app/layout.tsx`: Update with theme provider
  - **Step Dependencies**: Step 18

- [ ] Step 20: Create layout components
  - **Task**: Build reusable layout components for the application.
  - **Files**:
    - `src/components/layout/navbar.tsx`: Navigation bar
    - `src/components/layout/sidebar.tsx`: Sidebar component
    - `src/components/layout/footer.tsx`: Footer component
    - `src/components/layout/container.tsx`: Container component
  - **Step Dependencies**: Step 19

- [ ] Step 21: Implement animated components with Framer Motion
  - **Task**: Create reusable animated components using Framer Motion.
  - **Files**:
    - `src/components/animations/fade-in.tsx`: Fade-in animation
    - `src/components/animations/slide-in.tsx`: Slide-in animation
    - `src/components/animations/scale.tsx`: Scale animation
    - `src/lib/animations.ts`: Animation utility functions
  - **Step Dependencies**: Step 20

- [ ] Step 22: Create feedback and notification components
  - **Task**: Implement components for user feedback and notifications.
  - **Files**:
    - `src/components/ui/toast.tsx`: Toast component
    - `src/components/providers/toast-provider.tsx`: Toast provider
    - `src/components/ui/alert.tsx`: Alert component
    - `src/hooks/use-toast.ts`: Toast hook
  - **Step Dependencies**: Step 21

## Pages and Features
- [ ] Step 23: Create homepage and landing page
  - **Task**: Build the public-facing landing page and authenticated homepage.
  - **Files**:
    - `src/app/page.tsx`: Landing page
    - `src/app/(dashboard)/dashboard/page.tsx`: Dashboard homepage
    - `src/components/marketing/hero.tsx`: Hero section
    - `src/components/marketing/features.tsx`: Features section
  - **Step Dependencies**: Step 22

- [ ] Step 24: Implement dashboard layout and pages
  - **Task**: Create the dashboard layout and essential pages.
  - **Files**:
    - `src/app/(dashboard)/layout.tsx`: Dashboard layout
    - `src/app/(dashboard)/dashboard/page.tsx`: Main dashboard page
    - `src/app/(dashboard)/settings/page.tsx`: Settings page
    - `src/app/(dashboard)/billing/page.tsx`: Billing page
  - **Step Dependencies**: Step 23

- [ ] Step 25: Set up profile and settings pages
  - **Task**: Create user profile and settings management pages.
  - **Files**:
    - `src/app/(dashboard)/profile/page.tsx`: Profile page
    - `src/components/profile/profile-form.tsx`: Profile edit form
    - `src/components/settings/settings-form.tsx`: Settings form
  - **Step Dependencies**: Step 24

## Error Handling and Testing
- [ ] Step 26: Implement global error handling
  - **Task**: Create error boundary components and error pages.
  - **Files**:
    - `src/app/error.tsx`: Global error component
    - `src/app/not-found.tsx`: 404 page
    - `src/components/error/error-boundary.tsx`: Error boundary component
    - `src/components/error/fallback.tsx`: Fallback UI component
  - **Step Dependencies**: Step 25

- [ ] Step 27: Set up SEO and metadata
  - **Task**: Configure SEO metadata for the application.
  - **Files**:
    - `src/app/layout.tsx`: Update with metadata
    - `src/lib/metadata.ts`: Metadata utilities
  - **Step Dependencies**: Step 26

## Deployment and Optimization
- [ ] Step 28: Configure for Vercel deployment
  - **Task**: Prepare the application for deployment to Vercel.
  - **Files**:
    - `vercel.json`: Vercel configuration (if needed)
    - `.env.production`: Production environment variables template
  - **Step Dependencies**: Step 27
  - **User Instructions**:
    - Create a Vercel account if you don't have one
    - Link your GitHub repository to Vercel
    - Add all required environment variables to your Vercel project

- [ ] Step 29: Set up performance monitoring and analytics
  - **Task**: Add tools for monitoring application performance.
  - **Files**:
    - `src/app/layout.tsx`: Add analytics script
    - `src/lib/analytics.ts`: Analytics utilities
  - **Step Dependencies**: Step 28
  - **User Instructions**:
    - Choose an analytics provider (e.g., Vercel Analytics, Google Analytics)
    - Add the analytics key to your environment variables

- [ ] Step 30: Final optimizations and documentation
  - **Task**: Optimize the application and update documentation.
  - **Files**:
    - `README.md`: Update with detailed documentation
    - `next.config.js`: Add performance optimizations
    - `package.json`: Add scripts for common tasks
  - **Step Dependencies**: Step 29

## Project Completion
Once all steps are complete, you'll have a production-ready starter template with:
- Next.js with App Router
- Tailwind CSS and Shadcn UI for styling
- Supabase and Drizzle ORM for database functionality
- Clerk for authentication and user management
- Stripe for payment processing
- Deployed on Vercel
- Full TypeScript support
- Dark mode and theme customization
- Server Actions for API functionality
- Comprehensive error handling