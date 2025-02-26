/**
 * Dashboard sidebar component with navigation links and user information
 */
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Settings, 
  CreditCard, 
  Users, 
  MessageSquare,
  Menu
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { UserButton } from "@/components/auth/user-button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    title: "Conversations",
    href: "/dashboard/conversations",
    icon: <MessageSquare className="h-5 w-5" />,
  },
  {
    title: "Users",
    href: "/dashboard/users",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: <Settings className="h-5 w-5" />,
  },
  {
    title: "Billing",
    href: "/billing",
    icon: <CreditCard className="h-5 w-5" />,
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile Navigation */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild className="lg:hidden">
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72 p-0">
          <div className="flex flex-col h-full">
            <div className="px-6 py-4 border-b">
              <Link href="/dashboard" className="flex items-center gap-2 font-bold text-xl">
                NextStarter
              </Link>
            </div>
            <nav className="flex-1 px-3 py-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors mb-1",
                    pathname === item.href
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  )}
                >
                  {item.icon}
                  {item.title}
                </Link>
              ))}
            </nav>
            <div className="border-t px-6 py-4">
              <UserButton />
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex lg:flex-col lg:w-72 lg:border-r lg:h-full">
        <div className="px-6 py-4 border-b">
          <Link href="/dashboard" className="flex items-center gap-2 font-bold text-xl">
            NextStarter
          </Link>
        </div>
        <nav className="flex-1 px-3 py-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors mb-1",
                pathname === item.href
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              )}
            >
              {item.icon}
              {item.title}
            </Link>
          ))}
        </nav>
        <div className="border-t px-6 py-4">
          <UserButton />
        </div>
      </div>
    </>
  );
} 