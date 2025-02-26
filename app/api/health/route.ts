/**
 * Health check API route
 * Used to verify that the API is running correctly
 */
import { NextRequest } from "next/server";
import { jsonResponse } from "@/lib/api";

/**
 * GET handler for health check
 */
export async function GET(req: NextRequest) {
  return jsonResponse({
    status: "ok",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    version: process.env.NEXT_PUBLIC_APP_VERSION || "1.0.0",
  });
} 