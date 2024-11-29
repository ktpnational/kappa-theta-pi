import { auth } from '@/auth';
import { typeDefs } from '@/graphql';
import { resolvers } from '@/graphql/resolvers';
import { db } from '@/lib';
import { apollo } from '@elysiajs/apollo';
import { rateLimit } from 'elysia-rate-limit';
/**
 * Core server configuration file for the Elysia backend API.
 * This file handles the setup of contexts, middleware, and server initialization.
 * Only modify this file if you need to:
 * 1. Make changes to request context handling
 * 2. Add/modify middleware or procedure types
 *
 * @fileoverview Main Elysia server configuration and setup
 * @module server/config
 */
import type { ElysiaConfig } from 'elysia';
import Elysia from 'elysia';
/**
 * Creates and configures the request context available throughout the API.
 * The context provides access to core services and state needed during request processing.
 *
 * @remarks
 * The context is created for each incoming request and includes:
 * - Database connection ({@link db})
 * - Authentication session ({@link auth})
 *
 * @see {@link https://elysiajs.com/essential/life-cycle.html#derive|Elysia Lifecycle Documentation}
 *
 * @returns {Elysia} Configured Elysia plugin with context
 */
const createContext = new Elysia()
  .derive(async () => {
    const session = await auth();

    return { db, session };
  })
  .as('plugin');

export type Context = {
  db: typeof db;
  session: Awaited<ReturnType<typeof auth>>;
};

/**
 * Request timing middleware that measures execution duration of each request.
 * Useful for performance monitoring and detecting potential bottlenecks.
 *
 * @remarks
 * - Stores request start time in middleware state
 * - Calculates and logs total execution time after request completion
 * - Helps identify performance issues by simulating production latency
 *
 * @example
 * // Example log output:
 * // [Elysia] /api/users took 127ms to execute
 *
 * @returns {Elysia} Configured timing middleware plugin
 */
const timmingMiddleware = new Elysia()
  .state({ start: 0 })
  .onBeforeHandle(({ store }) => (store.start = Date.now()))
  .onAfterHandle(({ path, store: { start } }) =>
    console.log(`[Elysia] ${path} took ${Date.now() - start}ms to execute`),
  )
  .as('plugin');

// @ts-expect-error
const apolloMiddleware = apollo({
  typeDefs,
  resolvers,
});

/**
 * Creates and configures the main Elysia server instance.
 * Combines all middleware, context providers, and configuration into a complete server.
 *
 * @remarks
 * - Enables ahead-of-time (AOT) compilation for better performance
 * - Incorporates request context provider
 * - Applies timing middleware
 *
 * @param {ElysiaConfig<P, S>} options - Optional Elysia configuration parameters
 * @typeparam P - Path parameter type constraint
 * @typeparam S - Schema boolean flag
 * @returns {Elysia} Fully configured Elysia server instance
 */

const initializeApi = <P extends string, S extends boolean>(
  options?: ElysiaConfig<P, S>
) => {
  const app = new Elysia({
    ...options,
    aot: true,
  });

  return app;
};

export const createElysia = <P extends string, S extends boolean>(options?: ElysiaConfig<P, S>) => {
  const app = initializeApi(options)
  return app
    .use(createContext)
    .use(timmingMiddleware)
    .onError(({ code, error, set }) => {
      console.error(`[Elysia Error] ${code}:`, error);
      set.status = code === 'NOT_FOUND' ? 404 : 500;
      return {
        error: error.message,
        status: set.status,
      };
    })
    .use(
      rateLimit({
        duration: 60000,
      max: 100,
      headers: true,
      scoping: 'scoped',
      countFailedRequest: true,
      // skip: (req) => {
      //   const path = new URL(req.url).pathname;
      //   return (
      //     path.startsWith('/api/metrics') ||
      //     path.startsWith('/api/health') ||
      //     path.startsWith('/api/og')
      //   );
      // },
      errorResponse: new Response(
        JSON.stringify({
          error: 'Too many requests',
          status: 429,
        }),
        { status: 429 },
      ),
    })
  )
// .use(apolloMiddleware);
};
