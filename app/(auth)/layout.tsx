/**
 * Layout for authenticated routes with dashboard structure
 * Overrides root layout to remove marketing navigation
 */
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ToastProvider } from "@/components/providers/toast-provider";

import { DashboardSidebar } from "./dashboard/_components/dashboard-sidebar";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = createMetadata({
  title: "Dashboard",
  description: "Manage your account and view your dashboard",
  keywords: ["dashboard", "account", "profile", "settings"],
});

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();
  
  if (!userId) {
    redirect("/");
  }

  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background font-sans antialiased`}
        >
          <ThemeProvider>
            <div className="flex min-h-screen flex-col">
              <div className="flex h-full flex-1">
                <DashboardSidebar />
                <div className="flex-1 h-full overflow-y-auto">
                  <main className="p-6">
                    {children}
                  </main>
                </div>
              </div>
              <ToastProvider />
            </div>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
} 