import { Hono } from "hono";
import { bodyLimit } from "hono/body-limit";
import { contextStorage } from "hono/context-storage";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { secureHeaders } from "hono/secure-headers";
import { timing } from "hono/timing";
import { handle } from "hono/vercel";
import type { StatusCode } from "hono/utils/http-status";

const timingMiddleware = timing({
  total: true,
  enabled: process.env.NODE_ENV === "production",
  totalDescription: "Total API Response Time",
  autoEnd: true,
});

const app = new Hono({ strict: true }).basePath("/api");

const api = app
  .use("*", contextStorage())
  .use("*", timingMiddleware)
  .use("*", logger())
  .use("*", bodyLimit({ maxSize: 1024 * 1024 * 2 }))
  .use(
    "*",
    cors({
      origin:
        process.env.NODE_ENV === "production"
          ? ["https://www.kappathetapi.org"]
          : ["*"],
      allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowHeaders: ["Content-Type", "Authorization"],
      maxAge: 86400,
      credentials: true,
    }),
  )
  .use(
    "*",
    secureHeaders({
      strictTransportSecurity: "max-age=63072000; includeSubDomains; preload",
      xFrameOptions: "DENY",
      xXssProtection: "1",
      contentSecurityPolicy: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:", "https:"],
        connectSrc: ["'self'", "https:"],
        fontSrc: ["'self'", "data:", "https:"],
        objectSrc: ["'none'"],
        mediaSrc: ["'self'"],
        frameSrc: ["'self'"],
      },
    }),
  )
  .use("/health", async (c) => {
    return c.json({ status: "ok" });
  })
  .use("*", async (c, next) => {
    try {
      await next();

      const status: StatusCode = (c.res.status || 200) as StatusCode;
      const responseData = c.res.body || null;

      const response = {
        success: status >= 200 && status < 300,
        status,
        data: responseData,
        error: null,
      };

      return c.json(response);
    } catch (err: unknown) {
      const error = err as Error;
      const status: StatusCode = 500;

      const errorResponse = {
        success: false,
        status,
        data: null,
        error: {
          message: error.message || "Unknown error occurred",
          code: error.name || "UNKNOWN_ERROR",
        },
      };

      return c.json(errorResponse);
    }
  });

const handler = handle(api);

export const dynamic = "force-dynamic";
export type HonoApp = typeof api;
export {
  handler as GET,
  handler as POST,
  handler as PUT,
  handler as DELETE,
  handler as PATCH,
};
