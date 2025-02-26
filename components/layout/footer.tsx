/**
 * Footer component with links and copyright information
 */
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { ThemeToggle } from "@/components/ui/theme-toggle";

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  return (
    <footer className={`border-t bg-background ${className}`}>
      <Container>
        <div className="flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-lg font-bold">Logo</span>
            </Link>
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              &copy; {new Date().getFullYear()} Your Company. All rights reserved.
            </p>
          </div>
          <div className="flex flex-col items-center gap-4 md:flex-row md:gap-6">
            <nav className="flex gap-4 md:gap-6">
              <Link
                href="/terms"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Terms
              </Link>
              <Link
                href="/privacy"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Privacy
              </Link>
              <Link
                href="/contact"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Contact
              </Link>
            </nav>
            <div className="flex items-center">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
} 