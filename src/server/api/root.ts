import { api } from '@/server/api/routes';
import { createElysia } from './elysias';

/**
 * Creates and compiles the application router with the specified prefix and API routes.
 *
 * @constant
 * @type {ReturnType<typeof createElysia>}
 */
export const appRouter = createElysia({ prefix: '/api/elysia' }).use(api).compile();

/**
 * Type definition for the application router.
 *
 * @typedef {typeof appRouter} AppRouter
 */
export type AppRouter = typeof appRouter;
