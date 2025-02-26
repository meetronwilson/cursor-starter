/**
 * Marketing navbar component with logo, navigation links, and auth buttons
 */
"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SignInButton, SignUpButton, useAuth } from "@clerk/nextjs";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Logo } from "@/app/_components/shared/logo";

// Navigation items for the marketing navbar
const navItems = [
  { label: "Features", href: "/#features" },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "Pricing", href: "/pricing" },
];

export function Navbar() {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  // Handle anchor link clicks
  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    
    // Check if it's a hash link
    if (href.includes('#')) {
      const [path, hash] = href.split('#');
      
      // If we're already on the homepage, just scroll to the element
      if (path === '/' || path === '') {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        // Navigate to the page first, then scroll to the element
        router.push(href);
      }
    } else {
      // Regular navigation for non-hash links
      router.push(href);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <Logo />
            </Link>
            <nav className="hidden md:flex gap-6">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleAnchorClick(e, item.href)}
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2">
              {isSignedIn ? (
                <Link href="/dashboard">
                  <Button size="sm">
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <>
                  <SignInButton mode="modal">
                    <Button variant="ghost" size="sm">
                      Sign in
                    </Button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <Button size="sm">
                      Get Started
                    </Button>
                  </SignUpButton>
                </>
              )}
            </div>
            <ThemeToggle />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col gap-6 pt-6">
                  <nav className="flex flex-col gap-4">
                    {navItems.map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        onClick={(e) => handleAnchorClick(e, item.href)}
                        className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
                      >
                        {item.label}
                      </a>
                    ))}
                  </nav>
                  <div className="flex flex-col gap-2">
                    {isSignedIn ? (
                      <Link href="/dashboard">
                        <Button size="sm" className="w-full justify-start">
                          Dashboard
                        </Button>
                      </Link>
                    ) : (
                      <>
                        <SignInButton mode="modal">
                          <Button variant="ghost" size="sm" className="w-full justify-start">
                            Sign in
                          </Button>
                        </SignInButton>
                        <SignUpButton mode="modal">
                          <Button size="sm" className="w-full justify-start">
                            Get Started
                          </Button>
                        </SignUpButton>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </Container>
    </header>
  );
} 