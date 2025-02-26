/**
 * User validation schemas
 */
import { z } from "zod";

/**
 * Schema for updating a user profile
 */
export const updateProfileSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(50, "First name is too long").optional(),
  lastName: z.string().min(1, "Last name is required").max(50, "Last name is too long").optional(),
  bio: z.string().max(500, "Bio is too long").optional(),
  website: z.string().url("Invalid URL").max(100, "Website URL is too long").optional().nullable(),
});

/**
 * Schema for updating user preferences
 */
export const updatePreferencesSchema = z.object({
  emailNotifications: z.boolean().optional(),
  marketingEmails: z.boolean().optional(),
  theme: z.enum(["light", "dark", "system"]).optional(),
});

/**
 * Schema for user search
 */
export const userSearchSchema = z.object({
  query: z.string().min(1, "Search query is required").max(50, "Search query is too long"),
  page: z.number().int().min(1).optional().default(1),
  limit: z.number().int().min(1).max(100).optional().default(10),
}); 