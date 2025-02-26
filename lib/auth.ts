/**
 * Authentication utilities for Clerk integration
 */
import { auth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";
import { db } from "@/db/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

/**
 * Get the current user from Clerk
 */
export async function getCurrentUser() {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  return userId;
}

/**
 * Get the current user from the database
 */
export async function getCurrentDbUser() {
  const clerkId = await getCurrentUser();

  if (!clerkId) {
    return null;
  }

  const user = await db.query.users.findFirst({
    where: eq(users.clerkId, clerkId),
  });

  return user;
}

/**
 * Check if the current user has access to a resource
 */
export async function hasAccess(resourceUserId: string) {
  const clerkId = await getCurrentUser();

  if (!clerkId) {
    return false;
  }

  const user = await db.query.users.findFirst({
    where: eq(users.clerkId, clerkId),
  });

  if (!user) {
    return false;
  }

  return user.id === resourceUserId;
}

/**
 * Check if the current user owns a resource
 */
export async function isResourceOwner<T extends { userId: string }>(resource: T) {
  const user = await getCurrentDbUser();

  if (!user) {
    return false;
  }

  return user.id === resource.userId;
}

/**
 * Get the authentication token from the request
 */
export function getAuthToken(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }

  return authHeader.split(" ")[1];
} 