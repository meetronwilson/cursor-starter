/**
 * Layout for authenticated routes with dashboard structure
 * Overrides root layout to remove marketing navigation
 */
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { ToastProvider } from "@/components/providers/toast-provider";

import { DashboardSidebar } from "./dashboard/_components/dashboard-sidebar";
import "../globals.css";

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
    <>
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
    </>
  );
} 