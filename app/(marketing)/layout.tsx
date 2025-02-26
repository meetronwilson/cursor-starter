/**
 * Layout for marketing pages
 * Includes the navbar and footer components
 */
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
} 