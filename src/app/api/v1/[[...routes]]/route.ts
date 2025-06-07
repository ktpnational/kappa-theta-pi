import { Elysia } from "elysia";
import { dashboardRoute } from "./elysia";

const app = new Elysia({ prefix: "/api/v1" })
  .use(dashboardRoute)

  .onError(({ code, error, set }) => {
    console.error(`[Elysia Error] ${code}:`, error);
    set.status = code === "NOT_FOUND" ? 404 : 500;

    return {
      error: (error as Error)?.message ?? "Unknown error",
      status: set.status,
    };
  });

export const GET = app.handle;
export const POST = app.handle;
export const PUT = app.handle;
export const DELETE = app.handle;
export const PATCH = app.handle;

export type App = typeof app;
