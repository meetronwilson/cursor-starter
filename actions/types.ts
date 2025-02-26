/**
 * Type definitions for server actions
 */

/**
 * Base response type for all server actions
 */
export type ActionResponse<T = void> = 
  | { success: true; data: T }
  | { success: false; error: string };

/**
 * Type for a server action that requires authentication
 */
export type AuthenticatedAction<I, O> = 
  (data: I) => Promise<ActionResponse<O>>;

/**
 * Type for a server action that doesn't require authentication
 */
export type PublicAction<I, O> = 
  (data: I) => Promise<ActionResponse<O>>;

/**
 * Type for a server action with no input
 */
export type NoInputAction<O> = 
  () => Promise<ActionResponse<O>>; 