/**
 * Sign-up button component for Clerk authentication
 */
"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface SignUpButtonProps {
  children?: React.ReactNode;
}

export function SignUpButton({
  children,
}: SignUpButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push("/sign-up");
  };

  return (
    <Button
      variant="outline"
      onClick={handleClick}
      className="rounded-full"
      size="sm"
    >
      {children || "Sign Up"}
    </Button>
  );
} 