import authController from '@/server/modules/auth';
import { getURL } from '@/utils';
import arcject from '@/utils/security/arcject';
import { Hono } from 'hono';
import { bodyLimit } from 'hono/body-limit';
import { cache } from 'hono/cache';
import { contextStorage } from 'hono/context-storage';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { secureHeaders } from 'hono/secure-headers';
import { timing } from 'hono/timing';
import type { ContentfulStatusCode } from 'hono/utils/http-status';
import { handle } from 'hono/vercel';

const timingMiddleware = timing({
  total: true,
  enabled: process.env.NODE_ENV === 'production',
  totalDescription: 'Total API Response Time',
  autoEnd: true,
});

const app = new Hono({ strict: true }).basePath('/api');

const api = app
  .use('*', contextStorage())
  .use('*', timingMiddleware)
  .use('*', logger())
  .use(
    '*',
    bodyLimit({
      maxSize: 1024 * 1024 * 2,
      onError: (c) => {
        return c.json({ error: 'Request body too large' }, { status: 413 });
      },
    }),
  )
  .use(
    '*',
    cors({
      origin: getURL(),
      allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowHeaders: ['Content-Type', 'Authorization'],
      maxAge: 86400,
      credentials: true,
    }),
  )
  .use(
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
  .use('/health', async (c) => {
    return c.json({ message: 'ok', status: 200 });
  })
  .use('/arcjet', async (c) => {
    const req = c.req.raw;
    const decision = await arcject.protect(req, { requested: 5 });
    console.log('Arcjet decision', decision);

    if (decision.isDenied()) {
      if (decision.reason.isBot()) {
        return c.json({ error: 'No bots allowed', reason: decision.reason }, { status: 403 });
      } else if (decision.reason.isRateLimit()) {
        return c.json({ error: 'Too many requests', reason: decision.reason }, { status: 429 });
      } else {
        return c.json({ error: 'Forbidden', reason: decision.reason }, { status: 403 });
      }
    }

    // Arcjet Pro plan verifies the authenticity of common bots using IP data.
    // Verification isn't always possible, so we recommend checking the decision separately.
    if (decision.reason.isBot() && decision.reason.isSpoofed()) {
      return c.json({ error: 'Forbidden', reason: decision.reason }, { status: 403 });
    }

    return c.json({ message: 'Hello world' });
  })
  .route('/auth', authController)
  .use('*', async (c, next) => {
    try {
      await next();

      const status = c.res.status ?? 200;
      const responseData = c.res.body ?? null;

      const response = {
        success: status >= 200 && status < 300,
        status,
        data: responseData,
        error: null,
      };

      return c.json(response, status as ContentfulStatusCode);
    } catch (err: unknown) {
      const error = err as Error;
      const status = 500;

      const errorResponse = {
        success: false,
        status,
        data: null,
        error: {
          message: error.message || 'Unknown error occurred',
          code: error.name || 'UNKNOWN_ERROR',
        },
      };

      return c.json(errorResponse, status as ContentfulStatusCode);
    }
  });

const handler = handle(api);

export const dynamic = 'force-dynamic';
export type HonoApp = typeof api;
export { handler as GET, handler as POST, handler as PUT, handler as DELETE, handler as PATCH };
