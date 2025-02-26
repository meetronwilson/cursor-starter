/**
 * Dashboard layout component with metadata
 */
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Overview of your account and activity",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 