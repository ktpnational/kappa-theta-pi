import { auth } from '@/server';
import { createMiddleware } from 'hono/factory';

const privateRoutesMiddleware = createMiddleware(async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  if (!session) {
    c.status(401);
    return c.json({ message: 'Unauthorized' });
  }

  c.set('user', session.user);
  c.set('session', session.session);
  return next();
});

export default privateRoutesMiddleware;
