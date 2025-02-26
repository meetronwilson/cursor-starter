/**
 * Common types used throughout the application
 */

/**
 * ActionState type for server actions
 * Used to return a consistent response from server actions
 */
export type ActionState<T> =
  | { isSuccess: true; message: string; data: T }
  | { isSuccess: false; message: string; data?: never }; 