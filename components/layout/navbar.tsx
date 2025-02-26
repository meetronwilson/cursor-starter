/**
 * Navbar component for site navigation
 */
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { SignInButton } from "@/components/auth/sign-in-button";
import { SignUpButton } from "@/components/auth/sign-up-button";
import { UserButton } from "@/components/auth/user-button";
import { useAuth } from "@clerk/nextjs";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  title: string;
  href: string;
  isExternal?: boolean;
}

interface NavbarProps {
  items?: NavItem[];
}

export function Navbar({ items = [] }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { isSignedIn } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const defaultItems: NavItem[] = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Features",
      href: "/#features",
    },
    {
      title: "Pricing",
      href: "/pricing",
    },
  ];

  const navItems = items.length ? items : defaultItems;

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold">Logo</span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <div className="hidden md:flex items-center space-x-6">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-foreground/80",
                    pathname === item.href
                      ? "text-foreground"
                      : "text-foreground/60"
                  )}
                  onClick={closeMenu}
                  {...(item.isExternal && {
                    target: "_blank",
                    rel: "noopener noreferrer",
                  })}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </nav>

          {/* Auth and theme buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            {isSignedIn ? (
              <>
                <Button asChild variant="ghost">
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
                <UserButton afterSignOutUrl="/" />
              </>
            ) : (
              <>
                <SignInButton mode="modal">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button size="sm">Sign Up</Button>
                </SignUpButton>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <ThemeToggle />
            <Button
              variant="ghost"
              className="ml-2 px-2"
              aria-label="Toggle Menu"
              onClick={toggleMenu}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </Container>

      {/* Mobile navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm" />
          <div className="fixed inset-x-0 top-16 z-50 mt-px bg-background border-b p-6 shadow-lg">
            <nav className="grid gap-6">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "text-lg font-medium transition-colors hover:text-foreground/80",
                    pathname === item.href
                      ? "text-foreground"
                      : "text-foreground/60"
                  )}
                  onClick={closeMenu}
                  {...(item.isExternal && {
                    target: "_blank",
                    rel: "noopener noreferrer",
                  })}
                >
                  {item.title}
                </Link>
              ))}
              <div className="flex flex-col space-y-3 pt-4 border-t">
                {isSignedIn ? (
                  <>
                    <Button asChild>
                      <Link href="/dashboard" onClick={closeMenu}>
                        Dashboard
                      </Link>
                    </Button>
                    <div className="flex justify-center">
                      <UserButton afterSignOutUrl="/" />
                    </div>
                  </>
                ) : (
                  <>
                    <SignInButton mode="modal">
                      <Button variant="outline" className="w-full">
                        Sign In
                      </Button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                      <Button className="w-full">Sign Up</Button>
                    </SignUpButton>
                  </>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
} 