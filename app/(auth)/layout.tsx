/**
 * Layout for authenticated routes with dashboard structure
 * Includes sidebar navigation and header
 */
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";

import { DashboardSidebar } from "./dashboard/_components/dashboard-sidebar";

export const metadata: Metadata = {
  title: {
    default: "Dashboard | Next.js Starter Template",
    template: "%s | Next.js Starter Template",
  },
  description: "Manage your account and view your dashboard",
};

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