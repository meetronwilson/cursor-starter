# Next.js Starter Template Implementation Plan

This implementation plan creates a clean, modern starter template with the following tech stack:
- **Frontend**: Next.js, Tailwind CSS, Shadcn UI, Framer Motion
- **Backend**: Postgres, Supabase, Drizzle ORM, Server Actions
- **Auth**: Clerk
- **Payments**: Stripe
- **Deployment**: Vercel

## Project Setup and Configuration
- [x] Step 1: Initialize Next.js project with TypeScript
  - **Task**: Create a new Next.js project with TypeScript and set up the initial configuration.
  - **Files**:
    - `package.json`: Create with initial dependencies
    - `tsconfig.json`: Configure TypeScript
    - `.gitignore`: Set up Git ignore rules
    - `README.md`: Create project documentation
  - **User Instructions**: 
    - Run `npx create-next-app@latest --typescript` to initialize the project
    - Choose "Yes" for App Router, ESLint, Tailwind CSS, and "No" for src/ directory

- [x] Step 2: Install and configure essential dependencies
  - **Task**: Add core dependencies including Tailwind CSS, Shadcn UI, Framer Motion, and other utilities.
  - **Files**:
    - `package.json`: Update with additional dependencies
    - `tailwind.config.js`: Configure Tailwind CSS
    - `postcss.config.js`: Set up PostCSS
    - `tsconfig.json`: Update TypeScript configuration for path aliases
  - **Step Dependencies**: Step 1
  - **User Instructions**:
    - Run `npm install` after files are created

- [x] Step 3: Set up project structure and environment variables
  - **Task**: Create the project folder structure and set up environment configuration.
  - **Files**:
    - `app/layout.tsx`: Create root layout
    - `app/page.tsx`: Create home page
    - `lib/utils.ts`: Create utility functions
    - `.env.example`: Create example environment variables
    - `.env.local`: Local environment variables (user will create)
  - **Step Dependencies**: Step 2
  - **User Instructions**:
    - Copy `.env.example` to `.env.local` and fill in your values

- [x] Step 4: Configure Shadcn components
  - **Task**: Set up Shadcn component library and install essential components.
  - **Files**:
    - `components.json`: Shadcn configuration
    - `lib/utils.ts`: Update with Shadcn utilities
    - `components/ui/button.tsx`: Button component
    - `components/ui/card.tsx`: Card component
    - `components/ui/dialog.tsx`: Dialog component
    - `components/ui/dropdown-menu.tsx`: Dropdown menu component
    - `components/ui/form.tsx`: Form component
    - `components/ui/input.tsx`: Input component
  - **Step Dependencies**: Step 3
  - **User Instructions**:
    - Run `npx shadcn@latest init` to set up Shadcn components
    - Run `npx shadcn@latest add [component-name]` for each component

## Database Setup with Drizzle
- [x] Step 5: Set up Supabase Postgres connection for Drizzle
  - **Task**: Create a Supabase project and configure the database connection for Drizzle ORM.
  - **Files**:
    - `lib/db.ts`: Database connection configuration
    - `.env.local`: Add database connection string
  - **Step Dependencies**: Step 4
  - **User Instructions**:
    - Create a Supabase project at https://supabase.com
    - Copy your Postgres connection string to `.env.local`
    - Make sure to enable "Connection Pooling" in Supabase Dashboard for production

- [x] Step 6: Configure Drizzle ORM
  - **Task**: Set up Drizzle ORM for database schema management and queries.
  - **Files**:
    - `db/index.ts`: Drizzle database client setup
    - `drizzle.config.ts`: Drizzle configuration
    - `db/schema/index.ts`: Schema exports file
  - **Step Dependencies**: Step 5
  - **User Instructions**:
    - Configure Drizzle to connect to your Supabase PostgreSQL database

- [x] Step 7: Create initial database schemas
  - **Task**: Create basic database schemas to establish the structure.
  - **Files**:
    - `db/schema/users-schema.ts`: User schema (synchronized with Clerk)
    - `db/schema/products-schema.ts`: Product schema
    - `db/schema/subscriptions-schema.ts`: Subscription schema
  - **Step Dependencies**: Step 6

- [x] Step 8: Generate and apply database migrations
  - **Task**: Create and run initial database migrations using Drizzle.
  - **Files**:
    - `db/migrations/`: Migration files directory
    - `package.json`: Add migration commands
  - **Step Dependencies**: Step 7
  - **User Instructions**:
    - Run `npx drizzle-kit generate:pg` to generate migrations
    - Run `npx drizzle-kit push:pg` to apply migrations to your database

## Authentication with Clerk
- [x] Step 9: Set up Clerk authentication
  - **Task**: Integrate Clerk for authentication and user management.
  - **Files**:
    - `app/layout.tsx`: Update with Clerk provider
    - `lib/auth.ts`: Authentication utilities
    - `middleware.ts`: Clerk middleware for protected routes
  - **Step Dependencies**: Step 8
  - **User Instructions**:
    - Create a Clerk account at https://clerk.dev
    - Set up a new application in Clerk dashboard
    - Add Clerk API keys to `.env.local`

- [x] Step 10: Create sign-in and sign-up pages
  - **Task**: Implement Clerk authentication UI components and flows.
  - **Files**:
    - `app/sign-in/[[...sign-in]]/page.tsx`: Sign-in page
    - `app/sign-up/[[...sign-up]]/page.tsx`: Sign-up page
    - `components/auth/sign-in-button.tsx`: Sign-in button component
    - `components/auth/sign-up-button.tsx`: Sign-up button component
    - `components/auth/user-button.tsx`: User profile button
  - **Step Dependencies**: Step 9

- [x] Step 11: Configure Clerk webhooks
  - **Task**: Set up Clerk webhooks to synchronize user data with Supabase.
  - **Files**:
    - `app/api/webhooks/clerk/route.ts`: Clerk webhook handler
    - `lib/clerk-webhook.ts`: Webhook processing utilities
  - **Step Dependencies**: Step 10
  - **User Instructions**:
    - Set up a webhook endpoint in your Clerk dashboard
    - Configure the webhook to point to your `/api/webhooks/clerk` endpoint
    - Add the webhook secret to `.env.local`

- [x] Step 12: Implement route protection and authorization
  - **Task**: Create utility functions for route protection and role-based access.
  - **Files**:
    - `middleware.ts`: Update for custom route protection
    - `lib/auth.ts`: Add authorization utilities
    - `components/auth/protected.tsx`: Protected content wrapper
  - **Step Dependencies**: Step 11

## Server Actions and API Routes
- [x] Step 13: Set up basic server actions framework
  - **Task**: Create the structure for server actions with validation.
  - **Files**:
    - `actions/index.ts`: Server actions exports
    - `lib/validation.ts`: Zod validation utilities
    - `actions/types.ts`: Type definitions for actions
  - **Step Dependencies**: Step 12

- [x] Step 14: Implement user profile server actions
  - **Task**: Create server actions for user profile management.
  - **Files**:
    - `actions/user.ts`: User profile actions
    - `lib/validation/user.ts`: User validation schemas
  - **Step Dependencies**: Step 13

- [x] Step 15: Create API route utilities
  - **Task**: Set up utility functions for API routes and error handling.
  - **Files**:
    - `lib/api.ts`: API utilities
    - `lib/error.ts`: Error handling utilities
    - `app/api/health/route.ts`: Health check API route
  - **Step Dependencies**: Step 14

## Stripe Integration
- [x] Step 16: Set up Stripe integration
  - **Task**: Configure Stripe for payment processing and subscriptions.
  - **Files**:
    - `lib/stripe.ts`: Stripe client and utilities
    - `app/api/webhooks/stripe/route.ts`: Stripe webhook handler
  - **Step Dependencies**: Step 15
  - **User Instructions**:
    - Create a Stripe account at https://stripe.com
    - Add Stripe API keys to `.env.local`
    - Set up a webhook endpoint in your Stripe dashboard

- [x] Step 17: Create subscription components
  - **Task**: Implement UI components for subscription management.
  - **Files**:
    - `components/billing/pricing-table.tsx`: Pricing table component
    - `components/billing/checkout-button.tsx`: Checkout button
    - `components/billing/subscription-status.tsx`: Subscription status component
  - **Step Dependencies**: Step 16

- [x] Step 18: Implement checkout and billing portal
  - **Task**: Create API routes and actions for Stripe checkout and customer portal.
  - **Files**:
    - `app/api/create-checkout-session/route.ts`: Checkout session API route
    - `app/api/create-portal-link/route.ts`: Customer portal API route
    - `actions/subscription.ts`: Subscription-related actions
  - **Step Dependencies**: Step 17

## UI Components and Layout
- [x] Step 19: Set up theme provider with dark mode
  - **Task**: Implement theming with dark mode support using Tailwind and next-themes.
  - **Files**:
    - `components/ui/theme-toggle.tsx`: Theme toggle component
    - `components/providers/theme-provider.tsx`: Theme provider component
    - `app/layout.tsx`: Root layout with theme provider
  - **Dependencies**: `next-themes`
  - **Step Dependencies**: None

- [x] Step 20: Create layout components
  - **Task**: Build reusable layout components for the application.
  - **Files**:
    - `components/layout/navbar.tsx`: Navigation bar
    - `components/layout/sidebar.tsx`: Sidebar component
    - `components/layout/footer.tsx`: Footer component
    - `components/layout/container.tsx`: Container component
  - **Step Dependencies**: Step 19

- [x] Step 21: Create animated components with Framer Motion
  - **Task**: Implement animation components using Framer Motion.
  - **Files**:
    - `components/utilities/animations/fade-in.tsx`: Fade-in animation
    - `components/utilities/animations/slide-in.tsx`: Slide-in animation
    - `components/utilities/animations/scale-in.tsx`: Scale-in animation
  - **Dependencies**: `framer-motion`
  - **Step Dependencies**: None

- [x] Step 22: Implement feedback and notification components
  - **Task**: Create components for user feedback and notifications.
  - **Files**:
    - `components/providers/toast-provider.tsx`: Toast provider
    - `lib/hooks/use-toast.ts`: Toast hook
  - **Dependencies**: `sonner`
  - **Step Dependencies**: None

- [x] Step 23: Create marketing homepage for non-authenticated users
  - **Task**: Build a marketing homepage with key sections.
  - **Files**:
    - `app/page.tsx` : Marketing homepage
    - `app/_components/marketing/hero.tsx`: Hero section
    - `app/_components/marketing/features.tsx`: Features section
    - `app/_components/marketing/testimonials.tsx`: Testimonials section
    - `app/_components/marketing/pricing.tsx`: Pricing section
    - `app/_components/marketing/cta.tsx`: Call-to-action section
  - **Step Dependencies**: Steps 19, 20, 21, 22

## Marketing Pages
- [x] Step 24: Create pricing page
  - **Task**: Implement a pricing page showcasing subscription tiers.
  - **Files**:
    - `app/pricing/page.tsx`: Pricing page
    - `app/pricing/_components/pricing-card.tsx`: Pricing card component
    - `app/pricing/_components/pricing-plans.tsx`: Pricing plans component
    - `app/pricing/_components/pricing-faq.tsx`: Pricing FAQ component
  - **Step Dependencies**: Step 23

- [x] Step 25: Implement marketing layouts and shared components
  - **Task**: Create layouts and components for marketing pages.
  - **Files**:
    - `app/layout.tsx`: Updated root layout with marketing components
    - `app/_components/marketing/navbar.tsx`: Marketing navbar component
    - `app/_components/marketing/footer.tsx`: Marketing footer component
    - `app/_components/shared/logo.tsx`: Logo component
  - **Step Dependencies**: Step 24

## Dashboard and Authenticated Routes
- [x] Step 26: Create dashboard layout and main page
  - **Task**: Implement the main dashboard layout and landing page.
  - **Files**:
    - `app/(auth)/layout.tsx`: Dashboard layout
    - `app/(auth)/dashboard/page.tsx`: Dashboard homepage
    - `app/(auth)/dashboard/_components/dashboard-header.tsx`: Dashboard header
    - `app/(auth)/dashboard/_components/dashboard-sidebar.tsx`: Dashboard sidebar
    - `app/(auth)/dashboard/_components/dashboard-stats.tsx`: Stats component
  - **Step Dependencies**: Step 25

- [x] Step 27: Create mock data visualizations for dashboard
  - **Task**: Implement sample data visualizations for the dashboard.
  - **Files**:
    - `app/(auth)/dashboard/_components/data-chart.tsx`: Data chart component
    - `app/(auth)/dashboard/_components/data-table.tsx`: Data table component
    - `app/(auth)/dashboard/_components/activity-feed.tsx`: Activity feed component
    - `lib/hooks/use-dashboard-data.ts`: Hook for mock dashboard data
  - **Step Dependencies**: Step 26

- [x] Step 28: Implement user profile page with Clerk integration
  - **Task**: Create a profile page that uses Clerk data and profile management.
  - **Files**:
    - `app/(auth)/profile/page.tsx`: User profile page
    - `app/(auth)/profile/_components/profile-form.tsx`: Profile form component
    - `app/(auth)/profile/_components/account-settings.tsx`: Account settings component
    - `app/(auth)/profile/_components/profile-header.tsx`: Profile header component
    - `actions/profile.ts`: Profile-related server actions
  - **Step Dependencies**: Step 27

- [x] Step 29: Create billing section with Stripe data
  - **Task**: Implement a billing page that displays subscription information and payment history.
  - **Files**:
    - `app/(auth)/billing/page.tsx`: Billing page
    - `app/(auth)/billing/_components/billing-history.tsx`: Billing history component
    - `app/(auth)/billing/_components/payment-methods.tsx`: Payment methods component
    - `app/(auth)/billing/layout.tsx`: Billing layout
  - **Step Dependencies**: Step 28

## Error Handling and Finalization
- [x] Step 30: Implement global error handling
  - **Task**: Create error boundary components and error pages.
  - **Files**:
    - `app/error.tsx`: Global error component
    - `app/not-found.tsx`: 404 page
    - `components/utilities/error-boundary.tsx`: Error boundary component
    - `components/utilities/fallback.tsx`: Fallback UI component
  - **Step Dependencies**: Step 29

- [x] Step 31: Set up SEO and metadata
  - **Task**: Configure SEO metadata for the application.
  - **Files**:
    - `app/layout.tsx`: Update with metadata
    - `lib/metadata.ts`: Metadata utilities
  - **Step Dependencies**: Step 30

- [x] Step 32: Add loading states and Suspense boundaries
  - **Task**: Implement loading states for a better user experience.
  - **Files**:
    - `app/loading.tsx`: Root loading component
    - `app/(auth)/dashboard/loading.tsx`: Dashboard loading component
    - `components/ui/skeleton.tsx`: Skeleton component
    - `components/utilities/loading-spinner.tsx`: Loading spinner component
  - **Step Dependencies**: Step 31

## Deployment and Optimization
- [ ] Step 33: Configure for Vercel deployment
  - **Task**: Prepare the application for deployment to Vercel.
  - **Files**:
    - `vercel.json`: Vercel configuration (if needed)
    - `.env.production`: Production environment variables template
  - **Step Dependencies**: Step 32
  - **User Instructions**:
    - Create a Vercel account if you don't have one
    - Link your GitHub repository to Vercel
    - Add all required environment variables to your Vercel project

- [ ] Step 34: Set up performance monitoring and analytics
  - **Task**: Add tools for monitoring application performance.
  - **Files**:
    - `app/layout.tsx`: Add analytics script
    - `lib/analytics.ts`: Analytics utilities
  - **Step Dependencies**: Step 33
  - **User Instructions**:
    - Choose an analytics provider (e.g., Vercel Analytics)
    - Add the analytics key to your environment variables

- [ ] Step 35: Final optimizations and documentation
  - **Task**: Optimize the application and update documentation.
  - **Files**:
    - `README.md`: Update with detailed documentation
    - `next.config.js`: Add performance optimizations
    - `package.json`: Add scripts for common tasks
  - **Step Dependencies**: Step 34

## Project Completion
Once all steps are complete, you'll have a production-ready starter template with:
- Next.js with App Router (without src/ directory)
- Marketing website with homepage and pricing page
- Authentication with Clerk (sign-in, sign-up)
- Dashboard for authenticated users with mock data
- User profile page with Clerk integration
- Billing section with Stripe subscription data
- Tailwind CSS and Shadcn UI for styling
- Supabase and Drizzle ORM for database functionality
- Server Actions for API functionality
- Framer Motion animations
- Dark mode and theme customization
- Comprehensive error handling
- Vercel deployment configuration