import { api } from '@/server/api/routes';
import { createElysia } from './elysias';

/**
 * Creates and compiles the application router with the specified prefix and API routes.
 *
 * @constant
 * @type {ReturnType<typeof createElysia>}
 * TODO: check what the  empty prefix does, might jsut be a double forwarded route
 */
export const appRouter = createElysia({ prefix: '/' }).use(api).compile();

/**
 * Type definition for the application router.
 *
 * @typedef {typeof appRouter} AppRouter
 */
export type AppRouter = typeof appRouter;
