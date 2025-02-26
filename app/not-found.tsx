/**
 * 404 Not Found page
 */
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <Container>
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
        <div className="rounded-full bg-muted p-4 mb-6">
          <FileQuestion className="h-10 w-10 text-muted-foreground" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-2">404</h1>
        <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
        <p className="text-muted-foreground mb-6 max-w-md">
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild>
            <Link href="/">
              Return to home
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/dashboard">
              Go to dashboard
            </Link>
          </Button>
        </div>
      </div>
    </Container>
  );
} 