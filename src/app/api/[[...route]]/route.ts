import { honoRouter } from '@/server/api/root';
import { handle } from 'hono/vercel';

export const dynamic = 'force-dynamic';

const handler = handle(honoRouter);

export { handler as GET, handler as POST, handler as PUT, handler as DELETE, handler as PATCH };
