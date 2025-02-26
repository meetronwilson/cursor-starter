"use server";

/**
 * Server actions for user management
 */
import { db } from "@/db/db";
import { InsertUser, SelectUser, users } from "@/db/schema";
import { ActionState } from "@/types";
import { eq } from "drizzle-orm";

/**
 * Create a new user
 */
export async function createUserAction(
  user: InsertUser
): Promise<ActionState<SelectUser>> {
  try {
    const [newUser] = await db.insert(users).values(user).returning();
    return {
      isSuccess: true,
      message: "User created successfully",
      data: newUser,
    };
  } catch (error) {
    console.error("Error creating user:", error);
    return { isSuccess: false, message: "Failed to create user" };
  }
}

/**
 * Get a user by Clerk ID
 */
export async function getUserByClerkIdAction(
  clerkId: string
): Promise<ActionState<SelectUser | undefined>> {
  try {
    const user = await db.query.users.findFirst({
      where: eq(users.clerkId, clerkId),
    });
    
    return {
      isSuccess: true,
      message: user ? "User found" : "User not found",
      data: user,
    };
  } catch (error) {
    console.error("Error getting user:", error);
    return { isSuccess: false, message: "Failed to get user" };
  }
}

/**
 * Update a user
 */
export async function updateUserAction(
  id: string,
  data: Partial<InsertUser>
): Promise<ActionState<SelectUser>> {
  try {
    const [updatedUser] = await db
      .update(users)
      .set(data)
      .where(eq(users.id, id))
      .returning();

    return {
      isSuccess: true,
      message: "User updated successfully",
      data: updatedUser,
    };
  } catch (error) {
    console.error("Error updating user:", error);
    return { isSuccess: false, message: "Failed to update user" };
  }
}

/**
 * Delete a user
 */
export async function deleteUserAction(id: string): Promise<ActionState<void>> {
  try {
    await db.delete(users).where(eq(users.id, id));
    return {
      isSuccess: true,
      message: "User deleted successfully",
      data: undefined,
    };
  } catch (error) {
    console.error("Error deleting user:", error);
    return { isSuccess: false, message: "Failed to delete user" };
  }
} 