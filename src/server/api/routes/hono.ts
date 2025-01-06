//api/routes/server/hono
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";

/**
 * Base Hono application instance configured with /api base path
 * @type {Hono}
 */
const app = new Hono().basePath("/api/client");

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
 */
const initializePrometheus = async (): Promise<{
  registry: import("prom-client").Registry;
  httpRequests: import("prom-client").Counter;
  requestDuration: import("prom-client").Histogram;
} | null> => {
  try {
    const prom = await import("prom-client");
    const registry = new prom.Registry();

    const httpRequests = new prom.Counter({
      name: "http_requests_total",
      help: "Total number of HTTP requests",
      labelNames: ["method", "path", "status"],
      registers: [registry],
    });

    const requestDuration = new prom.Histogram({
      name: "http_request_duration_seconds",
      help: "Duration of HTTP requests in seconds",
      labelNames: ["method", "path", "status"],
      registers: [registry],
    });

    return { registry, httpRequests, requestDuration };
  } catch (error) {
    console.error(
      `Failed to initialize Prometheus: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
    return null; // Return null instead of throwing, to prevent crashes
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
 * Endpoints:
 * - GET /health - Health check endpoint with message query parameter
 * - GET /metrics - Prometheus metrics endpoint
 */
export const hono_api = app
  .get(
    "/health",
    zValidator(
      "query",
      z.object({
        message: z.string(),
      })
    ),
    (c) => {
      const message = c.req.query("message") || "OK!";
      return c.json({ message }, 200); // Ensure explicit status code
    }
  )
  .get("/metrics", async (c) => {
    try {
      const metrics = await metricsInstance;
      if (!metrics) {
        console.error("Metrics not initialized");
        return c.json(
          { error: "Metrics not initialized" },
          500 // Explicit error status
        );
      }

      const metricsData = await metrics.registry.metrics();

      return c.newResponse(metricsData, {
        status: 200, // Explicit success status
        headers: {
          "Content-Type": metrics.registry.contentType,
          "Cache-Control": "no-store, must-revalidate",
        },
      });
    } catch (error) {
      console.error("Error generating metrics:", error);
      return c.json(
        {
          error: `Error generating metrics: ${
            error instanceof Error ? error.message : "Unknown error"
          }`,
        },
        500 // Explicit error status
      );
    }
  });
