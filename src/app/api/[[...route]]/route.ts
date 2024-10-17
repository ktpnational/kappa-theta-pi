// import { Elysia } from 'elysia';

// export const dynamic = 'force-dynamic';

// const app = new Elysia({
//   prefix: '/v1/api',
//   aot: false,
// })
//   .use()
//   .use();

export type App = typeof app;

export const GET = app.handle;
export const POST = app.handle;
export const PUT = app.handle;
export const DELETE = app.handle;
export const PATCH = app.handle;
export const HEAD = app.handle;
export const TRACE = app.handle;
export const CONNECT = app.handle;
export const OPTIONS = app.handle;
