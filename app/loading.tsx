/**
 * Root loading component for the application
 * Displayed during route transitions at the root level
 */
import { Container } from "@/components/layout/container";
import { LoadingSpinner } from "@/components/utilities/loading-spinner";

export default function Loading() {
  return (
    <Container>
      <div className="flex items-center justify-center min-h-[70vh]">
        <LoadingSpinner size="lg" />
      </div>
    </Container>
  );
} 