/**
 * Server actions for user profile management
 */
import { getCurrentUser, getCurrentDbUser } from "@/lib/auth";
import { db } from "@/db";
import { users } from "@/db/schema/users-schema";
import { eq } from "drizzle-orm";
import { createValidatedAction } from "@/lib/validation";
import { updateProfileSchema, updatePreferencesSchema } from "@/lib/validation/user";
import { ActionResponse, AuthenticatedAction } from "./types";
import { SelectUser } from "@/db/schema/users-schema";

/**
 * Get the current user's profile
 */
export const getUserProfile = async (): Promise<ActionResponse<SelectUser | null>> => {
  try {
    const clerkId = await getCurrentUser();
    
    if (!clerkId) {
      return { success: false, error: "Not authenticated" };
    }
    
    const dbUser = await db.query.users.findFirst({
      where: eq(users.clerkId, clerkId),
    });
    
    if (!dbUser) {
      return { success: false, error: "User not found" };
    }
    
    return { success: true, data: dbUser };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to get user profile" 
    };
  }
};

/**
 * Update the current user's profile
 */
export const updateProfile: AuthenticatedAction<typeof updateProfileSchema._type, SelectUser> = 
  createValidatedAction(updateProfileSchema, async (data) => {
    const user = await getCurrentDbUser();
    
    if (!user) {
      throw new Error("Not authenticated");
    }
    
    const updatedUser = await db
      .update(users)
      .set({
        firstName: data.firstName,
        lastName: data.lastName,
        bio: data.bio,
        updatedAt: new Date(),
      })
      .where(eq(users.id, user.id))
      .returning();
    
    return updatedUser[0];
  });

/**
 * Update the current user's theme preference
 * Note: This is a simplified version as the users schema doesn't have a preferences field
 */
export const updateTheme: AuthenticatedAction<{ theme: string }, SelectUser> = 
  createValidatedAction(
    updatePreferencesSchema.pick({ theme: true }), 
    async (data) => {
      // We would use data.theme here if we had a preferences column
      const user = await getCurrentDbUser();
      
      if (!user) {
        throw new Error("Not authenticated");
      }
      
      // In a real application, you would store preferences in a separate table
      // or add a preferences JSON column to the users table
      // For now, we'll just return the user without changes
      console.log(`Theme preference set to: ${data.theme}`);
      
      return user;
    }); 