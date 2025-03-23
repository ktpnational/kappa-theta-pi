import { nextCsrf } from 'next-csrf';


export const { csrfMiddleware, csrfToken } = nextCsrf({
  cookie: {
    name: 'XSRF-TOKEN',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 30,
  },
});
