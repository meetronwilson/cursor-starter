import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Next.js Starter Template
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  A modern starter template with Next.js, Tailwind CSS, Shadcn UI, and more.
                </p>
              </div>
              <div className="space-x-4">
                <Link
                  href="/dashboard"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                  Dashboard
                </Link>
                <Link
                  href="https://github.com/yourusername/next-starter-template"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                  GitHub
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                    Features
                  </h2>
                  <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                    Everything you need to build modern web applications.
                  </p>
                </div>
              </div>
              <div className="grid gap-6 lg:col-span-2 lg:grid-cols-2">
                <div className="flex flex-col space-y-2">
                  <h3 className="text-xl font-bold">Next.js App Router</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Built with the latest Next.js features including App Router and Server Components.
                  </p>
                </div>
                <div className="flex flex-col space-y-2">
                  <h3 className="text-xl font-bold">Tailwind CSS</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Utility-first CSS framework for rapid UI development.
                  </p>
                </div>
                <div className="flex flex-col space-y-2">
                  <h3 className="text-xl font-bold">Shadcn UI</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Beautiful, accessible components built with Radix UI and Tailwind CSS.
                  </p>
                </div>
                <div className="flex flex-col space-y-2">
                  <h3 className="text-xl font-bold">TypeScript</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Type-safe JavaScript for better developer experience.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full py-6 border-t">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:gap-6">
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} Next.js Starter Template. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
