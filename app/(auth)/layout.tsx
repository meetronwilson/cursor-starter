/**
 * Layout for authenticated routes with dashboard structure
 * Includes sidebar navigation and header
 */
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";

import { DashboardSidebar } from "./dashboard/_components/dashboard-sidebar";

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
    <div className="h-full">
      <div className="flex h-full">
        <DashboardSidebar />
        <div className="flex-1 h-full overflow-y-auto">
          {/* Header will be added here */}
          <main className="p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
} 