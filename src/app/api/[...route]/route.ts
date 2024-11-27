import { honoRouter } from '@/server';
import { handle } from 'hono/vercel';

export const dynamic = 'force-dynamic';
export const GET = handle(honoRouter);
