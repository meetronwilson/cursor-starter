/**
 * Validation utilities using Zod
 */
import { z } from "zod";

/**
 * Parse and validate data using a Zod schema
 */
export async function validate<T>(schema: z.Schema<T>, data: unknown) {
  try {
    const validData = await schema.parseAsync(data);
    return { success: true, data: validData } as const;
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.errors.map((e) => `${e.path}: ${e.message}`).join(", "),
      } as const;
    }
    return { success: false, error: "Validation failed" } as const;
  }
}

/**
 * Create a validated action that uses Zod for input validation
 */
export function createValidatedAction<I, O>(schema: z.Schema<I>, handler: (data: I) => Promise<O>) {
  return async (data: unknown) => {
    const validation = await validate(schema, data);
    
    if (!validation.success) {
      return validation;
    }
    
    try {
      const result = await handler(validation.data);
      return { success: true, data: result } as const;
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "An unknown error occurred",
      } as const;
    }
  };
} 