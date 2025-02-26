/**
 * User button component for Clerk authentication
 */
"use client";

import { UserButton as ClerkUserButton } from "@clerk/nextjs";
import { SignInButton } from "./sign-in-button";
import { SignUpButton } from "./sign-up-button";
import { useAuth } from "@clerk/nextjs";

export function UserButton() {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return (
      <ClerkUserButton
        afterSignOutUrl="/"
        appearance={{
          elements: {
            userButtonAvatarBox: "h-8 w-8",
          },
        }}
      />
    );
  }

  return (
    <div className="flex items-center gap-2">
      <SignInButton />
      <SignUpButton />
    </div>
  );
} 