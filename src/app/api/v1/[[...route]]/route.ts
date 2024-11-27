/**
 * Import the main application router instance which contains all API route definitions
 * and their corresponding handlers. This router is typically defined in the root API
 * configuration file.
 */
import { elysiaRouter } from '@/server';

/**
 * Create a unified request handler from the application router that processes
 * incoming HTTP requests and executes the appropriate route handler based on
 * the request path and method.
 *
 * This handler implements the tRPC protocol for typesafe API communication between
 * the client and server.
 */
const handler = elysiaRouter.handle;

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
export { handler as GET, handler as POST, handler as PUT, handler as DELETE };
