import 'server-only';
import { appRouter } from '@/server/api/root';
import { treaty } from '@elysiajs/eden';

export const server_api = treaty(appRouter).api.elysia;
