import { Counter, Histogram, Registry } from 'prom-client';

/**
 * Main Prometheus metrics registry instance.
 * Used to collect and manage all defined metrics.
 */
export const register = new Registry();

/**
 * Counter metric tracking total number of HTTP requests.
 *
 * @type {Counter}
 * @property {string} name - Name of the metric: 'http_requests_total'
 * @property {string} help - Description of what the metric measures
 * @property {string[]} labelNames - Labels for request method, path and status code
 * @property {Registry[]} registers - Array of registry instances this metric belongs to
 *
 * Labels:
 * - method: HTTP method (GET, POST, etc)
 * - path: Request URL path
 * - status: HTTP response status code
 */
export const httpRequestsTotal = new Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'path', 'status'],
  registers: [register],
});

/**
 * Histogram metric tracking HTTP request duration.
 * Measures how long HTTP requests take to process.
 *
 * @type {Histogram}
 * @property {string} name - Name of the metric: 'http_request_duration_seconds'
 * @property {string} help - Description of what the metric measures
 * @property {string[]} labelNames - Labels for request method, path and status code
 * @property {Registry[]} registers - Array of registry instances this metric belongs to
 *
 * Labels:
 * - method: HTTP method (GET, POST, etc)
 * - path: Request URL path
 * - status: HTTP response status code
 *
 * Default buckets are used to track request duration distribution
 */
export const httpRequestDuration = new Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'path', 'status'],
  registers: [register],
});
