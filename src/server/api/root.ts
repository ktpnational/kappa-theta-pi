import { elysia_api } from '@/server/api/routes/elysia';
import { hono_api } from '@/server/api/routes/hono';
import { createElysia, createHono } from '.';

/**
 * Creates and compiles the application router with the specified prefix and API routes.
 * This router serves as the main entry point for all API endpoints in the application.
 *
 * The router is created using the createElysia function and configured with a root prefix ('/').
 * It incorporates all API routes defined in the api module and compiles them into a single router.
 *
 * @constant
 * @type {ReturnType<typeof createElysia>}
 * @property {string} prefix - The base URL prefix for all routes, set to '/' for root path
 * @property {Function} use - Method to incorporate additional route handlers and middleware
 * @property {Function} compile - Method to finalize and compile all routes into executable handlers
 *
 * @example
 * // Basic usage of the router
 * app.use(elysiaRouter)
 *
 * @remarks
 * The empty prefix '/' is used to mount routes at the root path. This means all routes
 * will be accessible directly without an additional prefix. For example, if you have a route
 * '/users', it will be accessible at 'http://your-domain.com/users' rather than
 * 'http://your-domain.com/api/users' or similar.
 */
export const elysiaRouter = createElysia({ prefix: '/api/v1' }).use(elysia_api).compile();
export const honoRouter = createHono({ strict: false }).route('/api/client', hono_api);
/**
 * Type definition for the application router.
 * Represents the complete type structure of the compiled router including all its routes,
 * middleware, and handler functions.
 *
 * This type is useful for:
 * - Type checking when extending the router
 * - Creating type-safe client implementations
 * - Generating API documentation
 *
 * @typedef {typeof elysiaRouter} elysiaRouter
 * @property {Object} routes - Contains all registered route handlers
 * @property {Object} middleware - Contains all registered middleware functions
 */
export type ElysiaRouter = typeof elysiaRouter;
export type HonoRouter = typeof honoRouter;
