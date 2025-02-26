# Next.js Starter Template

A modern, full-featured starter template for building web applications with Next.js, Tailwind CSS, Shadcn UI, and more.

## Tech Stack

- **Frontend**: Next.js, Tailwind CSS, Shadcn UI, Framer Motion
- **Backend**: Postgres, Supabase, Drizzle ORM, Server Actions
- **Auth**: Clerk
- **Payments**: Stripe
- **Deployment**: Vercel

## Features

- Modern UI with Tailwind CSS and Shadcn UI components
- App Router for improved routing and layouts
- Server Components for improved performance
- Type safety with TypeScript
- Dark mode support
- Authentication with Clerk
- Database with Supabase and Drizzle ORM
- Payment processing with Stripe
- Animations with Framer Motion

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Supabase account (for database)
- A Clerk account (for authentication)
- A Stripe account (for payments)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/next-starter-template.git
cd next-starter-template
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

Then edit `.env.local` to add your API keys and other configuration.

4. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
├── app/                  # Next.js App Router
│   ├── (dashboard)/      # Dashboard routes (protected)
│   ├── (marketing)/      # Marketing routes (public)
│   ├── api/              # API routes
│   ├── globals.css       # Global styles
│   └── layout.tsx        # Root layout
├── components/           # React components
│   ├── ui/               # Shadcn UI components
│   ├── layout/           # Layout components
│   └── providers/        # Context providers
├── lib/                  # Utility functions
├── db/                   # Database schemas and utilities
│   ├── schema/           # Drizzle schemas
│   └── migrations/       # Database migrations
├── actions/              # Server actions
├── public/               # Static assets
└── middleware.ts         # Next.js middleware
```

## Deployment

The easiest way to deploy this template is to use [Vercel](https://vercel.com).

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Next.js](https://nextjs.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Shadcn UI](https://ui.shadcn.com)
- [Supabase](https://supabase.com)
- [Clerk](https://clerk.dev)
- [Stripe](https://stripe.com)
- [Framer Motion](https://www.framer.com/motion)
- [Drizzle ORM](https://orm.drizzle.team)
