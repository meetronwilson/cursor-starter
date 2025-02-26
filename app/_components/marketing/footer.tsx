/**
 * Marketing footer component with links and copyright information
 */
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Logo } from "@/app/_components/shared/logo";
import { ThemeToggle } from "@/components/ui/theme-toggle";

// Footer links grouped by category
const footerLinks = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/#features" },
      { label: "Pricing", href: "/pricing" },
      { label: "Integrations", href: "/integrations" },
      { label: "Changelog", href: "/changelog" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "/docs" },
      { label: "Tutorials", href: "/tutorials" },
      { label: "Blog", href: "/blog" },
      { label: "Support", href: "/support" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
      { label: "Partners", href: "/partners" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Security", href: "/security" },
      { label: "Cookies", href: "/cookies" },
    ],
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <Container>
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
            <div className="col-span-2 lg:col-span-1">
              <Link href="/" className="inline-block">
                <Logo />
              </Link>
              <p className="mt-4 text-sm text-muted-foreground">
                A modern Next.js starter template with all the tools you need to build amazing web applications.
              </p>
              <div className="mt-4">
                <ThemeToggle />
              </div>
            </div>
            {footerLinks.map((group) => (
              <div key={group.title} className="flex flex-col gap-3">
                <h3 className="text-sm font-medium">{group.title}</h3>
                <ul className="flex flex-col gap-2">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-8 border-t border-border pt-8 md:flex md:items-center md:justify-between">
            <div className="flex space-x-6 md:order-2">
              <Link
                href="https://twitter.com"
                className="text-muted-foreground hover:text-foreground"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="sr-only">Twitter</span>
                <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.533-.018a8.25 8.25 0 0 0 5.382 1.568c1.482.023 2.96.554 4.286 1.64a.75.75 0 0 1 .934.124 12.004 12.004 0 0 1 3.13 3.13.75.75 0 0 1 .124.934c-1.086 1.325-1.626 2.807-1.649 4.285a.75.75 0 0 1-.534.534c-1.482.023-2.96.554-4.286 1.64a.75.75 0 0 1-.934.124c-2.573-.574-5.2-1.98-7.115-4.4a12.134 12.134 0 0 1-1.84-2.52c-.192-.426.005-.89.427-1.088.619A19.426 19.426 0 0 0 1.937 4.84c-.02.422.428.89 1.088.62 1.088A19.428 19.428 0 0 0 4.93 6.954c1.564.826 3.2.962 4.84.396 4.84-.564 1.564-1.92 3.2-3.36 4.84-4.84a.75.75 0 0 1 .6-.18c.42.18.84.54.96.96.12Z" />
                </svg>
              </Link>
              <Link
                href="https://github.com"
                className="text-muted-foreground hover:text-foreground"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="sr-only">GitHub</span>
                <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 1.75C5.664 1.75 2.75 4.664 2.75 9c0 4.336 2.914 7.25 7.25 7.25 4.336 0 7.25-2.914 7.25-7.25 0-4.336-2.914-7.25-7.25-7.25ZM10 15A5 5 0 1 0 10 5a5 5 0 0 0 0 10Zm6.5-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" clipRule="evenodd" />
                </svg>
              </Link>
              <Link
                href="https://linkedin.com"
                className="text-muted-foreground hover:text-foreground"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="sr-only">LinkedIn</span>
                <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.869 5.878H2.252v11.252h3.617V5.878zm-1.81-5.753a2.111 2.111 0 0 0 0 4.22c1.166 0 2.11-.944 2.11-2.11s-.944-2.11-2.11-2.11zm15.753 8.73c0-3.107-2.376-4.046-4.433-4.046-1.65 0-2.815.568-3.48 1.775v-1.527H8.283v11.252h3.617v-6.612c0-1.52.288-2.993 2.164-2.993 1.85 0 1.87 1.73 1.87 3.092v6.513h3.617v-7.453z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
            <p className="mt-8 text-sm text-muted-foreground md:mt-0 md:order-1">
              &copy; {currentYear} NextStarter. All rights reserved.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
} 