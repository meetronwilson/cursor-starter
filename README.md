# CursorStarter: Vibe Coding Template

A modern, full-featured starter template for building web applications with Next.js, Tailwind CSS, Shadcn UI, and more. This template provides a solid foundation for Vibe Coding - a new programming paradigm where you use AI tools to generate code through natural language prompts, focusing on high-level problem-solving rather than manual coding.

<p align="center">
  <img src="public/og-image.png" alt="CursorStarter Template" width="600" />
</p>

## 🚀 Features

- **Modern UI Framework**
  - [Next.js 15](https://nextjs.org/) with App Router
  - [React 19](https://react.dev/) with Server Components
  - [TypeScript](https://www.typescriptlang.org/) for type safety
  - [Tailwind CSS](https://tailwindcss.com/) for styling
  - [Shadcn UI](https://ui.shadcn.com/) for beautiful, accessible components

- **Vibe Coding Support**
  - AI-assisted development workflow
  - Natural language code generation
  - High-level problem-solving focus
  - Streamlined development experience

- **Authentication & Authorization**
  - [Clerk](https://clerk.dev/) for user management
  - Social login providers (Google, GitHub, etc.)
  - Role-based access control
  - Protected routes with middleware

- **Database & ORM**
  - [Supabase](https://supabase.com/) for PostgreSQL database
  - [Drizzle ORM](https://orm.drizzle.team/) for type-safe database queries
  - Database migrations and schema management
  - Connection pooling for production

- **Payment Processing**
  - [Stripe](https://stripe.com/) integration
  - Subscription management
  - Checkout and customer portal
  - Webhook handling

- **Advanced UI Features**
  - Dark mode with [next-themes](https://github.com/pacocoursey/next-themes)
  - Animations with [Framer Motion](https://www.framer.com/motion/)
  - Toast notifications with [Sonner](https://sonner.emilkowal.ski/)
  - Form validation with [React Hook Form](https://react-hook-form.com/) and [Zod](https://zod.dev/)

- **Performance & SEO**
  - Server-side rendering and static generation
  - Optimized images and fonts
  - Metadata API for SEO
  - Loading states and suspense boundaries

- **Developer Experience**
  - Server Actions for API functionality
  - Environment variable management
  - Comprehensive documentation
  - Deployment configuration for Vercel

## 📋 Prerequisites

Before you begin, ensure you have the following:

- [Node.js](https://nodejs.org/) 18.17 or later
- [npm](https://www.npmjs.com/) 9.6.7 or later
- Accounts with the following services:
  - [Supabase](https://supabase.com/) for database
  - [Clerk](https://clerk.dev/) for authentication
  - [Stripe](https://stripe.com/) for payments
  - [Vercel](https://vercel.com/) for deployment (optional)

## 🛠️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/cursor-starter.git
cd cursor-starter
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

```bash
cp .env.example .env.local
```

Then edit `.env.local` to add your API keys and other configuration. See the [Environment Variables](#-environment-variables) section for details.

### 4. Set up the database

Create a Supabase project and get your connection string:

1. Go to [Supabase](https://supabase.com/) and create a new project
2. Navigate to Project Settings > Database > Connection Pooling
3. Copy the connection string and replace `[YOUR-PASSWORD]` with your database password
4. Add the connection string to your `.env.local` file:

```
DATABASE_URL=your-connection-string
```

### 5. Run database migrations

```bash
npm run db:generate  # Generate migration files
npm run db:push      # Apply migrations to your database
```

### 6. Set up authentication

1. Create a [Clerk](https://clerk.dev/) application
2. Add your Clerk API keys to `.env.local`:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-publishable-key
CLERK_SECRET_KEY=your-secret-key
```

### 7. Set up payments

1. Create a [Stripe](https://stripe.com/) account
2. Add your Stripe API keys to `.env.local`:

```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-publishable-key
STRIPE_SECRET_KEY=your-secret-key
```

### 8. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🌐 Environment Variables

The following environment variables are required for the application to function properly:

### App

- `NEXT_PUBLIC_APP_URL`: The URL of your application (e.g., `http://localhost:3000` for development)

### Supabase

- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase service role key
- `DATABASE_URL`: Your PostgreSQL connection string

### Clerk

- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: Your Clerk publishable key
- `CLERK_SECRET_KEY`: Your Clerk secret key
- `CLERK_WEBHOOK_SECRET`: Your Clerk webhook secret (for user synchronization)

### Stripe

- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: Your Stripe publishable key
- `STRIPE_SECRET_KEY`: Your Stripe secret key
- `STRIPE_WEBHOOK_SECRET`: Your Stripe webhook secret (for payment events)

## 📁 Project Structure

```
├── actions/                # Server actions for data mutations
│   ├── db/                 # Database-specific actions
│   └── types.ts            # Type definitions for actions
├── app/                    # Next.js App Router
│   ├── (auth)/             # Authenticated routes
│   │   ├── dashboard/      # Dashboard pages and components
│   │   ├── profile/        # User profile pages and components
│   │   ├── billing/        # Billing pages and components
│   │   └── layout.tsx      # Layout for authenticated routes
│   ├── (marketing)/        # Public marketing routes
│   ├── api/                # API routes
│   │   ├── webhooks/       # Webhook handlers
│   │   └── health/         # Health check endpoint
│   ├── _components/        # Shared components for routes
│   ├── globals.css         # Global styles
│   └── layout.tsx          # Root layout
├── components/             # React components
│   ├── ui/                 # Shadcn UI components
│   ├── layout/             # Layout components
│   ├── auth/               # Authentication components
│   ├── billing/            # Billing components
│   ├── providers/          # Context providers
│   └── utilities/          # Utility components
├── db/                     # Database configuration
│   ├── schema/             # Drizzle schemas
│   ├── migrations/         # Database migrations
│   └── db.ts               # Database client
├── lib/                    # Utility functions
│   ├── hooks/              # Custom React hooks
│   ├── validation/         # Validation schemas
│   ├── auth.ts             # Authentication utilities
│   ├── api.ts              # API utilities
│   ├── stripe.ts           # Stripe utilities
│   └── utils.ts            # General utilities
├── public/                 # Static assets
├── types/                  # TypeScript type definitions
├── middleware.ts           # Next.js middleware
├── next.config.js          # Next.js configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
├── .env.example            # Example environment variables
├── .env.local              # Local environment variables (git-ignored)
└── package.json            # Project dependencies and scripts
```

## 📚 Available Scripts

- `npm run dev`: Start the development server
- `npm run build`: Build the application for production
- `npm run start`: Start the production server
- `npm run lint`: Run ESLint to check for code issues
- `npm run db:generate`: Generate database migration files
- `npm run db:push`: Apply migrations to your database
- `npm run db:studio`: Open Drizzle Studio to manage your database
- `npm run analyze`: Analyze the bundle size (requires `ANALYZE=true`)
- `npm run deploy`: Build and start the application for production
- `npm run vercel-build`: Build the application for Vercel deployment

## 🚢 Deployment

The easiest way to deploy this template is to use [Vercel](https://vercel.com). See the [DEPLOYMENT.md](DEPLOYMENT.md) file for detailed instructions.

## 🔧 Customization

### Styling

This template uses Tailwind CSS for styling. You can customize the theme in `tailwind.config.js`.

### Components

Shadcn UI components can be customized in the `components/ui` directory. See the [Shadcn UI documentation](https://ui.shadcn.com/docs/components) for details.

### Authentication

Clerk authentication can be customized in the Clerk dashboard. See the [Clerk documentation](https://clerk.dev/docs) for details.

### Database

Drizzle ORM schemas can be modified in the `db/schema` directory. After making changes, run `npm run db:generate` and `npm run db:push` to update your database.

## ❓ Troubleshooting

### Common Issues

#### Database Connection Issues

- Ensure your Supabase project is running
- Check that your `DATABASE_URL` is correct in `.env.local`
- Make sure you've enabled connection pooling in Supabase

#### Authentication Issues

- Verify your Clerk API keys in `.env.local`
- Check that your Clerk application is properly configured
- Ensure your webhook endpoints are correctly set up

#### Payment Issues

- Verify your Stripe API keys in `.env.local`
- Check that your Stripe account is properly configured
- Ensure your webhook endpoints are correctly set up

#### Build Errors

- Make sure all required environment variables are set
- Check for TypeScript errors with `npm run lint`
- Ensure all dependencies are installed with `npm install`

### Getting Help

If you encounter issues not covered here, please:

1. Check the [Next.js documentation](https://nextjs.org/docs)
2. Search for similar issues on [GitHub](https://github.com/yourusername/cursor-starter/issues)
3. Create a new issue if your problem persists

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org)
- [React](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Shadcn UI](https://ui.shadcn.com)
- [Supabase](https://supabase.com)
- [Drizzle ORM](https://orm.drizzle.team)
- [Clerk](https://clerk.dev)
- [Stripe](https://stripe.com)
- [Framer Motion](https://www.framer.com/motion)
- [Vercel](https://vercel.com)

## 🤝 Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details.
