/**
 * API utilities for handling requests and responses
 */
import { NextRequest, NextResponse } from "next/server";
import { ZodSchema } from "zod";
import { getAuthToken } from "@/lib/auth";

/**
 * API response with data
 */
export type ApiResponse<T = unknown> = {
  success: boolean;
  data?: T;
  error?: string;
  status: number;
};

/**
 * Create a JSON response with the given data and status code
 */
export function jsonResponse<T>(
  data: T,
  status = 200
): NextResponse<ApiResponse<T>> {
  return NextResponse.json(
    {
      success: status >= 200 && status < 300,
      data,
      status,
    },
    { status }
  );
}

/**
 * Create an error response with the given message and status code
 */
export function errorResponse(
  error: string,
  status = 400
): NextResponse<ApiResponse<never>> {
  return NextResponse.json(
    {
      success: false,
      error,
      status,
    },
    { status }
  );
}

/**
 * Validate request data against a Zod schema
 */
export async function validateRequest<T>(
  req: NextRequest,
  schema: ZodSchema<T>
): Promise<{ success: true; data: T } | { success: false; error: string }> {
  try {
    const body = await req.json();
    const result = schema.safeParse(body);

    if (!result.success) {
      return {
        success: false,
        error: result.error.errors.map((e) => `${e.path}: ${e.message}`).join(", "),
      };
    }

    return { success: true, data: result.data };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Invalid request data",
    };
  }
}

/**
 * Authenticate a request using the auth token
 */
export async function authenticateRequest(
  req: NextRequest
): Promise<{ success: true } | { success: false; error: string; status: number }> {
  const token = getAuthToken(req);

  if (!token) {
    return {
      success: false,
      error: "Unauthorized: Missing authentication token",
      status: 401,
    };
  }

  // In a real application, you would validate the token here
  // For now, we'll just return success if a token exists

  return { success: true };
} 