/**
 * Sidebar component for dashboard navigation
 */
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Settings,
  CreditCard,
  User,
} from "lucide-react";

interface SidebarItem {
  title: string;
  href: string;
  icon: React.ReactNode;
}

interface SidebarProps {
  className?: string;
  items?: SidebarItem[];
}

export function Sidebar({ className, items = [] }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const defaultItems: SidebarItem[] = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      title: "Profile",
      href: "/profile",
      icon: <User className="h-5 w-5" />,
    },
    {
      title: "Billing",
      href: "/billing",
      icon: <CreditCard className="h-5 w-5" />,
    },
    {
      title: "Settings",
      href: "/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ];

  const navItems = items.length ? items : defaultItems;

  return (
    <div
      className={cn(
        "flex flex-col h-screen border-r bg-background transition-all duration-300",
        collapsed ? "w-16" : "w-64",
        className
      )}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b">
        {!collapsed && (
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold">App</span>
          </Link>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto"
          onClick={toggleSidebar}
          aria-label={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {collapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </Button>
      </div>
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-2 px-2">
          {navItems.map((item, index) => (
            <li key={index}>
              <Link
                href={item.href}
                className={cn(
                  "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                  pathname === item.href
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground",
                  collapsed && "justify-center px-0"
                )}
              >
                {item.icon}
                {!collapsed && <span className="ml-3">{item.title}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="border-t p-4">
        {!collapsed && (
          <div className="text-xs text-muted-foreground">
            <p>© 2024 Your Company</p>
          </div>
        )}
      </div>
    </div>
  );
} 