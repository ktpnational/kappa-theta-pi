/**
 * Import the main application router instance which contains all API route definitions
 * and their corresponding handlers. This router is typically defined in the root API
 * configuration file.
 */
import { elysiaRouter } from '@/server';
import { Elysia } from 'elysia';
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

const app = new Elysia().use(elysiaRouter).get('/', () => ({ message: 'Hello World' }));

export const GET = app.handle;
export const POST = app.handle;
export const PUT = app.handle;
export const DELETE = app.handle;
export const PATCH = app.handle;

export type App = typeof app;
