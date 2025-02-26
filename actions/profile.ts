/**
 * Server actions for profile management
 */
"use server";

import { z } from "zod";
import { db } from "@/db/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getCurrentUser, getCurrentDbUser } from "@/lib/auth";
import { ActionResponse, AuthenticatedAction } from "./types";
import { createValidatedAction } from "@/lib/validation";
import { SelectUser } from "@/db/schema/users-schema";

// Profile update schema
const updateProfileSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(50, "First name is too long"),
  lastName: z.string().min(1, "Last name is required").max(50, "Last name is too long"),
  bio: z.string().max(500, "Bio is too long").optional(),
});

// Profile preferences schema
const updatePreferencesSchema = z.object({
  emailNotifications: z.boolean().optional(),
  marketingEmails: z.boolean().optional(),
  theme: z.enum(["light", "dark", "system"]).optional(),
});

/**
 * Get the current user's profile
 */
export async function getProfile(): Promise<ActionResponse<SelectUser>> {
  try {
    const clerkId = await getCurrentUser();
    
    if (!clerkId) {
      return { success: false, error: "Not authenticated" };
    }
    
    const user = await getCurrentDbUser();
    
    if (!user) {
      return { success: false, error: "User not found" };
    }
    
    return { success: true, data: user };
  } catch (error) {
    console.error("Error getting profile:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to get profile",
    };
  }
}

/**
 * Update the user's profile
 */
export const updateProfile: AuthenticatedAction<z.infer<typeof updateProfileSchema>, SelectUser> = 
  createValidatedAction(updateProfileSchema, async (data) => {
    const user = await getCurrentDbUser();
    
    if (!user) {
      throw new Error("Not authenticated");
    }
    
    // Update the user in the database
    const [updatedUser] = await db
      .update(users)
      .set({
        firstName: data.firstName,
        lastName: data.lastName,
        // Store bio in a real application
        updatedAt: new Date(),
      })
      .where(eq(users.id, user.id))
      .returning();
    
    return updatedUser;
  });

/**
 * Update the user's preferences
 */
export const updatePreferences: AuthenticatedAction<z.infer<typeof updatePreferencesSchema>, { success: boolean }> = 
  createValidatedAction(updatePreferencesSchema, async () => {
    const user = await getCurrentDbUser();
    
    if (!user) {
      throw new Error("Not authenticated");
    }
    
    // In a real application, you would store preferences in a separate table
    // or add a preferences JSON column to the users table
    // For now, we'll just return success
    
    return { success: true };
  }); 