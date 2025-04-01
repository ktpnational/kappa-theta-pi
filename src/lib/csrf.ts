import { randomBytes } from 'crypto';
import { env } from '@/env';
import { nextCsrf } from 'next-csrf';

const { setup, csrf } = nextCsrf({
  tokenKey: 'x-csrf-token',
  cookieOptions: {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 30,
  },
  secret: env.CSRF_SECRET,
});

const csrfToken = randomBytes(32).toString('hex');

export { setup, csrf, csrfToken };
