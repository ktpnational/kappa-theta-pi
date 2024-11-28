/**
 * Import the main application router instance which contains all API route definitions
 * and their corresponding handlers. This router is typically defined in the root API
 * configuration file.
 */
import { elysiaRouter } from '@/server';

/**
 * Export the unified handler to handle different HTTP methods:
 * - GET: For retrieving data
 * - POST: For creating new resources
 * - PUT: For updating existing resources
 * - DELETE: For removing resources
 *
 * The same handler is used for all methods since tRPC internally routes
 * requests based on the procedure definitions in the router.
 */

export const GET = elysiaRouter.handle;
export const POST = elysiaRouter.handle;
export const PUT = elysiaRouter.handle;
export const DELETE = elysiaRouter.handle;
export const PATCH = elysiaRouter.handle;
