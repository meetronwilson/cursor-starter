/**
 * Middleware for Clerk authentication
 */
import { authMiddleware } from "@clerk/nextjs";

/**
 * Public routes that don't require authentication
 */
const publicRoutes = [
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/webhooks(.*)",
  "/pricing",
  "/about",
  "/contact",
  "/terms",
  "/privacy",
];

export default authMiddleware({
  publicRoutes,
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}; 