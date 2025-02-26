/**
 * Sign-up page using Clerk authentication
 */
import { SignUp } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up | Next.js Starter Template",
  description: "Create a new account",
};

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Sign Up</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Create a new account to get started
          </p>
        </div>
        <SignUp appearance={{ elements: { rootBox: "mx-auto w-full" } }} />
      </div>
    </div>
  );
} 