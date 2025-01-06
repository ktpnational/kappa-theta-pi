/**
 * @fileoverview Core Hono configuration and middleware setup for the API server.
 * Exports utilities for creating Hono instances with standardized middleware and context management.
 */

import { type Env, Hono } from 'hono';
import { bodyLimit } from 'hono/body-limit';
import { cache } from 'hono/cache';
import { contextStorage, getContext } from 'hono/context-storage';
import { cors } from 'hono/cors';
import type { HonoOptions } from 'hono/dist/types/hono-base';
import { logger } from 'hono/logger';
import { secureHeaders } from 'hono/secure-headers';
import { timing } from 'hono/timing';

/**
 * Configured timing middleware for measuring API response times.
 * Provides detailed timing metrics and cross-origin timing access.
 *
 * @constant
 * @type {ReturnType<typeof timing>}
 */
const timingMiddleware = timing({
  total: true,
  enabled: true,
  totalDescription: 'Total API Response Time',
  autoEnd: true,
  crossOrigin:
    process.env.NODE_ENV === 'production'
      ? 'https://www.kappathetapi.org'
      : 'http://localhost:3000',
});

/**
 * Creates a new Hono instance with standardized middleware and security configurations.
 *
 * Configured middleware includes:
 * - Context storage for state management
 * - Response timing metrics
 * - Request logging
 * - Request body size limits
 * - CORS policy
 * - Response caching
 * - Security headers
 *
 * @template E - Environment type extending Hono's base Env
 * @param {HonoOptions<E>} options - Configuration options for the Hono instance
 * @returns {Hono<E>} Configured Hono instance with all middleware applied
 *
 * @example
 * ```ts
 * const app = createHono<{
 *   Variables: {
 *     userId: string;
 *   };
 * }>({
 *   strict: true
 * });
 *
 * app.get('/user', (c) => {
 *   const userId = c.get('userId');
 *   return c.json({ id: userId });
 * });
 * ```
 */
export const createHono = <E extends Env>(options: HonoOptions<E>) => {
  return (
    new Hono<E>({
      ...options,
    })
      .use(contextStorage())
      .use(timingMiddleware)
      .use(
        logger((message: string, ...rest: string[]) => {
          console.log(message, ...rest);
        }),
      )
      .use(
        bodyLimit({
          maxSize: 10 * 1024 * 1024,
          onError: (c) => c.json({ error: 'Body size limit exceeded' }, 413),
        }),
      )
      .use(
        cors({
          origin:
            process.env.NODE_ENV === 'production'
              ? 'https://www.kappathetapi.org/'
              : 'http://localhost:3000',
          allowHeaders: ['X-Custom-Header', 'Upgrade-Insecure-Requests'],
          allowMethods: ['POST', 'GET', 'OPTIONS'],
          exposeHeaders: ['Content-Length', 'X-Kuma-Revision'],
          maxAge: 600,
          credentials: true,
        }),
      )
      .use(
        cache({
          cacheName: 'kappa-theta-pi-cache',
          cacheControl: 'max-age=60',
        }),
      )
      // TODO: Add secure headers, research
      .use(
        secureHeaders({
          strictTransportSecurity: 'max-age=63072000; includeSubDomains; preload',
          xFrameOptions: 'DENY',
          xXssProtection: '1',
        }),
      )
      .use('*', async (c, next) => {
        try {
          await next();
          if (!c.res.status) {
            c.status(200);
          }
          return c.res;
        } catch (error) {
          console.error('Request error:', error);
          c.status(500);
          return c.json({
            error: 'Internal Server Error',
            message: error instanceof Error ? error.message : 'Unknown error occurred',
          });
        }
      })
  );
};

/**
 * Retrieves the global Hono context for the current request.
 * Provides access to request-scoped state and variables.
 *
 * @template E - Environment type extending Hono's base Env
 * @returns {ReturnType<typeof getContext<E>>} The current request's Hono context
 *
 * @example
 * ```ts
 * const context = getGlobalHonoContext<{
 *   Variables: {
 *     userId: string;
 *   };
 * }>();
 *
 * const userId = context?.get('userId');
 * ```
 */
export const getGlobalHonoContext = <E extends Env>() => {
  return getContext<E>();
};
