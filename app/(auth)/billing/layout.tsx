/**
 * Layout for the billing section with metadata
 */
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Billing & Subscription",
  description: "Manage your subscription, payment methods, and billing history",
};

export default function BillingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 