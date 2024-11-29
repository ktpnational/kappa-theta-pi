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
 * @remarks
 * This middleware adds Server-Timing headers to responses with detailed performance metrics.
 * It's enabled only in production and configured to allow cross-origin timing access from
 * the main application domain.
 *
 * @example
 * ```ts
 * // Response headers will include timing info like:
 * // Server-Timing: total;desc="Total API Response Time";dur=123.45
 * ```
 */
const timingMiddleware = timing({
  total: true,
  enabled: process.env.NODE_ENV === 'production',
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
 * @remarks
 * This factory function sets up a Hono application with a comprehensive set of middleware:
 * - Context storage for request-scoped data
 * - Response timing metrics
 * - Request logging
 * - Request body size limits
 * - CORS configuration
 * - Response caching
 * - Security headers
 * - Standardized error handling and response formatting
 *
 * @template E - Environment type extending Hono's base Env
 * @param {HonoOptions<E>} [options={}] - Configuration options for the Hono instance
 * @returns {Hono<E>} Configured Hono instance with all middleware applied
 *
 * @example
 * ```ts
 * // Create a basic Hono app
 * const app = createHono();
 *
 * // Create with custom environment
 * interface MyEnv extends Env {
 *   Variables: {
 *     foo: string;
 *   };
 * }
 * const app = createHono<MyEnv>();
 * ```
 *
 * @throws {Error} If middleware initialization fails
 */
export const createHono = <E extends Env>(options: HonoOptions<E> = {}) => {
  const app = new Hono<E>(options);

  return app
    .use('*', contextStorage())
    .use('*', timingMiddleware)
    .use('*', logger())
    .use(
      '*',
      bodyLimit({
        maxSize: 1024 * 1024 * 2, // 2MB limit
      }),
    )
    .use(
      '*',
      cors({
        origin: process.env.NODE_ENV === 'production' ? ['https://www.kappathetapi.org'] : ['*'],
        allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowHeaders: ['Content-Type', 'Authorization'],
        maxAge: 86400,
      }),
    )
    .use(
      '*',
      cache({
        cacheName: 'kappa-theta-pi-cache',
        cacheControl: 'max-age=60',
      }),
    )
    .use(
      '*',
      secureHeaders({
        strictTransportSecurity: 'max-age=63072000; includeSubDomains; preload',
        xFrameOptions: 'DENY',
        xXssProtection: '1',
        contentSecurityPolicy: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'"],
        },
      }),
    )
    .use('*', async (c, next) => {
      try {
        await next();

        // Safely parse response body
        const parseResponseBody = (body: any) => {
          try {
            return typeof body === 'string' ? JSON.parse(body) : body;
          } catch {
            return body;
          }
        };

        const responseData = c.res.body ? parseResponseBody(c.res.body) : {};

        const status =
          responseData && typeof responseData === 'object' && 'status' in responseData
            ? responseData.status
            : c.res.status || 200;

        const response = {
          success: status >= 200 && status < 300,
          status,
          data: responseData.data || responseData,
          error: responseData.error || null,
        };

        return new Response(JSON.stringify(response), {
          status,
          headers: new Headers({
            'Content-Type': 'application/json',
            ...Object.fromEntries(c.res.headers.entries()),
          }),
        });
      } catch (error) {
        console.error('Request error:', error);

        const status = error instanceof Error ? 500 : 400;
        const errorResponse = {
          success: false,
          status,
          data: null,
          error: {
            message: error instanceof Error ? error.message : 'Unknown error occurred',
            code: error instanceof Error ? error.name : 'UNKNOWN_ERROR',
          },
        };

        return new Response(JSON.stringify(errorResponse), {
          status,
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }
    });
};

/**
 * Retrieves the global Hono context for the current request.
 *
 * @remarks
 * This utility function provides safe access to the request-scoped Hono context.
 * It wraps the getContext call in a try-catch to handle cases where it's called
 * outside of a request context.
 *
 * The context contains request-specific data and utilities that can be used
 * throughout the request lifecycle.
 *
 * @template E - Environment type extending Hono's base Env
 * @returns {ReturnType<typeof getContext<E>> | null} The current request's Hono context or null if called outside request scope
 *
 * @example
 * ```ts
 * // Inside a request handler
 * const context = getGlobalHonoContext();
 * if (context) {
 *   const { req, res } = context;
 *   // Access request/response objects
 * }
 * ```
 *
 * @throws {never} Catches and handles all errors internally
 */
export const getGlobalHonoContext = <E extends Env>() => {
  try {
    return getContext<E>();
  } catch {
    console.warn('No active Hono context found');
    return null;
  }
};
