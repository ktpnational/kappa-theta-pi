import { z } from 'zod';

import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';

/**
 * Base Hono application instance configured with /api base path
 * @type {Hono}
 */
const app = new Hono().basePath('/api/client');

/**
 * Initializes and configures Prometheus metrics collectors
 *
 * @async
 * @function initializePrometheus
 * @returns {Promise<{
 *   registry: import('prom-client').Registry,
 *   httpRequests: import('prom-client').Counter,
 *   requestDuration: import('prom-client').Histogram
 * } | null>} Object containing configured Prometheus registry and metrics collectors
 *
 * @property {Registry} registry - Prometheus registry instance for metric collection
 * @property {Counter} httpRequests - Counter for tracking total HTTP requests with labels
 * @property {Histogram} requestDuration - Histogram for measuring request duration
 *
 * @throws {Error} If Prometheus initialization fails
 *
 * @example
 * const metrics = await initializePrometheus();
 * if (metrics) {
 *   const { registry, httpRequests, requestDuration } = metrics;
 *   // Use metrics collectors
 * }
 */
const initializePrometheus = async (): Promise<{
  registry: import('prom-client').Registry;
  httpRequests: import('prom-client').Counter;
  requestDuration: import('prom-client').Histogram;
} | null> => {
  try {
    const prom = await import('prom-client');
    const registry = new prom.Registry();

    const httpRequests = new prom.Counter({
      name: 'http_requests_total',
      help: 'Total number of HTTP requests',
      labelNames: ['method', 'path', 'status'],
      registers: [registry],
    });

    const requestDuration = new prom.Histogram({
      name: 'http_request_duration_seconds',
      help: 'Duration of HTTP requests in seconds',
      labelNames: ['method', 'path', 'status'],
      registers: [registry],
    });

    return { registry, httpRequests, requestDuration };
  } catch (error) {
    throw new Error(
      `Failed to initialize Prometheus: ${error instanceof Error ? error.message : 'Unknown error'}`,
    );
  }
};

/**
 * Singleton instance of Prometheus metrics
 * @type {Promise<ReturnType<typeof initializePrometheus>>}
 */
const metricsInstance = initializePrometheus();

/**
 * Hono API router with configured endpoints for health checks and metrics
 *
 * @type {Hono}
 * @exports hono_api
 *
 * Endpoints:
 * - GET /health - Health check endpoint with message query parameter
 * - GET /metrics - Prometheus metrics endpoint
 *
 * @example
 * // Health check with message
 * GET /api/health?message=test
 *
 * // Fetch metrics
 * GET /api/metrics
 */
export const hono_api = app
  .get(
    '/health',
    zValidator(
      'query',
      z.object({
        message: z.string(),
      }),
    ),
    (c) => {
      return c.json(
        {
          message: 'OK!',
        },
        200,
      );
    },
  )
  .get('/metrics', async (c) => {
    try {
      const metrics = await metricsInstance;
      if (!metrics) {
        throw new Error('Metrics not initialized');
      }

      const metricsData = await metrics.registry.metrics();

      return c.newResponse(metricsData, {
        status: 200,
        headers: {
          'Content-Type': metrics.registry.contentType,
          'Cache-Control': 'no-store, must-revalidate',
        },
      });
    } catch (error) {
      console.error('Error generating metrics:', error);
      return c.newResponse(
        `Error generating metrics: ${c.error instanceof Error ? c.error.message : 'Unknown error'}`,
        {
          status: 500,
          headers: {
            'Content-Type': 'text/plain',
          },
        },
      );
    }
  });
