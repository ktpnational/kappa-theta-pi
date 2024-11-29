import { auth } from '@/auth';
import { db } from '@/lib';
import { rateLimit } from 'elysia-rate-limit';
import { Elysia } from 'elysia';
import { elysiaApi } from '@/server';

// Create context plugin
const createContext = new Elysia()
  .derive(async () => {
    const session = await auth();
    return { db, session };
  })
  .as('plugin');

// Create timing middleware
const timingMiddleware = new Elysia()
.state({ start: 0 })
.onBeforeHandle(({ store }) => (store.start = Date.now()))
.onAfterHandle(({ path, store: { start } }) =>
  console.log(`[Elysia] ${path} took ${Date.now() - start}ms to execute`),
)
.as('plugin');

// Create base app with all middleware and error handling
const app = new Elysia({ prefix: '/api/v1' })
  .use(elysiaApi)
  .use(createContext)
  .use(timingMiddleware)
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
      error: error.message,
      status: set.status,
    };
  })

// Export handlers
export const GET = app.handle;
export const POST = app.handle;
export const PUT = app.handle;
export const DELETE = app.handle;
export const PATCH = app.handle;

// Export type for client usage
export type App = typeof app;
