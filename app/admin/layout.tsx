/**
 * Layout for the admin section
 */
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Check if the user is authenticated
  const userId = await getCurrentUser();
  
  if (!userId) {
    redirect("/sign-in");
  }
  
  // In a real application, you would check if the user has admin privileges
  // For now, we'll allow any authenticated user to access the admin section
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container py-4">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
        </div>
      </header>
      
      <main>{children}</main>
    </div>
  );
} 