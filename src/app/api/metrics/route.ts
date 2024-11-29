'use server';

import { type NextRequest, NextResponse } from 'next/server';

/**
 * Initializes Prometheus metrics collection with custom metrics
 *
 * @description
 * This function sets up Prometheus monitoring by:
 * 1. Creating a new Prometheus registry
 * 2. Defining key metrics:
 *    - HTTP request counter
 *    - Request duration histogram
 *
 * The metrics capture:
 * - Total number of HTTP requests with method, path, and status labels
 * - Request duration distributions for performance monitoring
 *
 * @returns {Promise<{
 *   registry: import('prom-client').Registry,
 *   httpRequests: import('prom-client').Counter<string>,
 *   requestDuration: import('prom-client').Histogram<string>
 * } | null>} Returns object containing:
 * - registry: Prometheus metrics registry
 * - httpRequests: Counter for tracking request totals
 * - requestDuration: Histogram for tracking request durations
 * Or null if initialization fails
 *
 * @throws
 * May throw errors from:
 * - Dynamic import of prom-client
 * - Metrics initialization
 */
const initializePrometheus = async () => {
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
    console.error('Failed to initialize Prometheus:', error);
    return null;
  }
};

const metricsInstance = initializePrometheus();

/**
 * GET handler that exposes Prometheus metrics
 *
 * @description
 * This route handler serves Prometheus metrics by:
 * 1. Retrieving the initialized metrics instance
 * 2. Collecting current metrics data
 * 3. Returning formatted metrics in Prometheus exposition format
 *
 * The endpoint implements:
 * - Proper content type headers for Prometheus
 * - Cache control to ensure fresh metrics
 * - Error handling with appropriate status codes
 *
 * @param {NextRequest} _request - Incoming request object (unused)
 *
 * @returns {Promise<NextResponse>} Returns either:
 * - 200 response with current metrics data
 * - 500 response if metrics collection fails
 *
 * @throws
 * May throw errors from:
 * - Metrics initialization check
 * - Metrics collection
 * - Response generation
 *
 * @example
 * ```typescript
 * // Prometheus can scrape metrics from this endpoint
 * GET /api/metrics
 * ```
 */
export async function GET(_request: NextRequest) {
  try {
    const metrics = await metricsInstance;
    if (!metrics) {
      throw new Error('Metrics not initialized');
    }

    const metricsData = await metrics.registry.metrics();

    return new NextResponse(metricsData, {
      status: 200,
      headers: {
        'Content-Type': metrics.registry.contentType,
        'Cache-Control': 'no-store, must-revalidate',
      },
    });
  } catch (error) {
    console.error('Error generating metrics:', error);
    return new NextResponse('Error generating metrics', {
      status: 500,
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }
}
