/**
 * Sign-in button component for Clerk authentication
 */
"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface SignInButtonProps {
  children?: React.ReactNode;
}

export function SignInButton({
  children,
}: SignInButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push("/sign-in");
  };

  return (
    <Button
      variant="default"
      onClick={handleClick}
      className="rounded-full"
      size="sm"
    >
      {children || "Sign In"}
    </Button>
  );
} 