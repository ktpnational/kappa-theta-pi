import { cors } from '@elysiajs/cors';
import { serverTiming } from '@elysiajs/server-timing';
import { Elysia } from 'elysia';
import { rateLimit } from 'elysia-rate-limit';
import { dashboardRoute } from './elysia';

import { randomBytes } from 'node:crypto';
import { getURL } from '@/utils';

const csrfMiddleware = new Elysia()
  .onParse(({ request, response }) => {
    const cookies = request.headers.get('cookie');
    const hasCsrfToken = cookies?.includes('csrfToken=');

    if (!hasCsrfToken) {
      const csrfToken = randomBytes(32).toString('hex');

      const cookieValue = `csrfToken=${csrfToken}; HttpOnly; ${process.env.NODE_ENV === 'production' ? 'Secure; ' : ''}`;

      // TODO: Fix if breaks ;3
      (response as Response).headers.set('Set-Cookie', cookieValue);

      return {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      };
    }

    return {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    };
  })
  .as('plugin');

const app = new Elysia({ prefix: '/api/v1' })
  .use(csrfMiddleware)
  .use(
    serverTiming({
      trace: {
        request: true,
        parse: true,
        transform: true,
        beforeHandle: true,
        handle: true,
        afterHandle: true,
        error: true,
        mapResponse: true,
        total: true,
      },
    }),
  )
  .use(
    cors({
      origin: getURL(),
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      exposeHeaders: ['Content-Type', 'Authorization'],
      maxAge: 86400,
      credentials: true,
    }),
  )
  .use(dashboardRoute)
  .use(
    rateLimit({
      duration: 60000,
      max: 100,
      headers: true,
      scoping: 'scoped',
      countFailedRequest: true,
      errorResponse: new Response(
        JSON.stringify({
          error: 'Too many requests',
          status: 429,
        }),
        { status: 429 },
      ),
    }),
  )
  .onError(({ code, error, set }) => {
    console.error(`[Elysia Error] ${code}:`, error);
    set.status = code === 'NOT_FOUND' ? 404 : 500;
    return {
      error: error,
      status: set.status,
    };
  });

export const GET = app.handle;
export const POST = app.handle;
export const PUT = app.handle;
export const DELETE = app.handle;
export const PATCH = app.handle;

export type App = typeof app;
