// @ts-nocheck
// import type { auth } from '@/server';
import privateRoutesMiddleware from '@/server/middleware';
import { Hono } from 'hono';

const privateRoutes = new Hono<{
  Variables: {
    // user: typeof auth.$Infer.Session.user | null;
    // session: typeof auth.$Infer.Session.session | null;
    user: any;
    session: any;
  };
}>()
  // .use(privateRoutesMiddleware)
  .get('/', (c) => {
    // return c.json({ message: 'Private route', user: c.get('user') });
    return c.json({ message: 'Private route', user: 'Authentication commented out' });
  });

export default privateRoutes;
