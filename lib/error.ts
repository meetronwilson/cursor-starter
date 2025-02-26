/**
 * Error handling utilities
 */

/**
 * Custom error class for API errors
 */
export class ApiError extends Error {
  status: number;
  
  constructor(message: string, status = 400) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

/**
 * Custom error class for authentication errors
 */
export class AuthError extends ApiError {
  constructor(message = 'Unauthorized') {
    super(message, 401);
    this.name = 'AuthError';
  }
}

/**
 * Custom error class for forbidden access errors
 */
export class ForbiddenError extends ApiError {
  constructor(message = 'Forbidden') {
    super(message, 403);
    this.name = 'ForbiddenError';
  }
}

/**
 * Custom error class for not found errors
 */
export class NotFoundError extends ApiError {
  constructor(message = 'Not found') {
    super(message, 404);
    this.name = 'NotFoundError';
  }
}

/**
 * Custom error class for validation errors
 */
export class ValidationError extends ApiError {
  errors?: Record<string, string[]>;
  
  constructor(message = 'Validation failed', errors?: Record<string, string[]>) {
    super(message, 422);
    this.name = 'ValidationError';
    this.errors = errors;
  }
}

/**
 * Safely catch and handle errors
 */
export function catchError<T>(fn: () => Promise<T>): Promise<T> {
  return fn().catch((error) => {
    if (error instanceof ApiError) {
      throw error;
    }
    
    console.error('Unhandled error:', error);
    throw new ApiError(
      error instanceof Error ? error.message : 'An unexpected error occurred',
      500
    );
  });
} 