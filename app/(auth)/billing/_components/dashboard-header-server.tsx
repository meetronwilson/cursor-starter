/**
 * Server-compatible version of the dashboard header
 */
import { DashboardHeaderClient } from "./dashboard-header-client";

interface DashboardHeaderProps {
  title: string;
}

export function DashboardHeader({ title }: DashboardHeaderProps) {
  return <DashboardHeaderClient title={title} />;
} 