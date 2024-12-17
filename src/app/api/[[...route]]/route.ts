import { Hono } from 'hono';
import { bodyLimit } from 'hono/body-limit';
import { contextStorage } from 'hono/context-storage';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { secureHeaders } from 'hono/secure-headers';
import { timing } from 'hono/timing';
import type { StatusCode } from 'hono/utils/http-status';
import { handle } from 'hono/vercel';

const timingMiddleware = timing({
  total: true,
  enabled: process.env.NODE_ENV === 'production',
  totalDescription: 'Total API Response Time',
  autoEnd: true,
});

const app = new Hono({ strict: true }).basePath('/api/client');

const api = app
  .use('*', contextStorage())
  .use('*', timingMiddleware)
  .use('*', logger())
  .use('*', bodyLimit({ maxSize: 1024 * 1024 * 2 }))
  .use(
    '*',
    cors({
      origin: process.env.NODE_ENV === 'production' ? ['https://www.kappathetapi.org'] : ['*'],
      allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowHeaders: ['Content-Type', 'Authorization'],
      maxAge: 86400,
      credentials: true,
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
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", 'data:', 'https:'],
        connectSrc: ["'self'", 'https:'],
        fontSrc: ["'self'", 'data:', 'https:'],
        objectSrc: ["'none'"],
        mediaSrc: ["'self'"],
        frameSrc: ["'self'"],
      },
    }),
  )
  .use('*', async (c, next) => {
    try {
      await next();

      const status = (c.res.status || 200) as StatusCode;
      let responseData;

      try {
        responseData = await c.res.json();
      } catch {
        responseData = c.res.body || null;
      }

      const response = {
        success: status >= 200 && status < 300,
        status,
        data: responseData,
        error: null,
      };

      return c.json(response, status);
    } catch (error) {
      const status = ((error as any)?.status || 500) as StatusCode;

      const errorResponse = {
        success: false,
        status,
        data: null,
        error: {
          message: error instanceof Error ? error.message : 'Unknown error occurred',
          code: error instanceof Error ? error.name : 'UNKNOWN_ERROR',
        },
      };

      return c.json(errorResponse, status);
    }
  });

const handler = handle(api);

export const dynamic = 'force-dynamic';
export type HonoApp = typeof api;
export { handler as GET, handler as POST, handler as PUT, handler as DELETE, handler as PATCH };
