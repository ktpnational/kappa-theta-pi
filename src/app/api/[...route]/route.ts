import { honoRouter } from '@/server';
import { handle } from 'hono/vercel';

export const dynamic = 'force-dynamic';

const handler = handle(honoRouter);

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const DELETE = handler;
export const PATCH = handler;
