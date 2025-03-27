import { Elysia } from 'elysia';
import { rateLimit } from 'elysia-rate-limit';
import { dashboardRoute } from './elysia';
import { setup } from '@/lib/csrf';

const app = new Elysia({ prefix: '/api/v1' })
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
