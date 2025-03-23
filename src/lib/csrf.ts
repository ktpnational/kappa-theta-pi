import { nextCsrf } from 'next-csrf';


export const { setup, csrf } = nextCsrf({
    tokenKey: 'x-csrf-token',
    cookieOptions: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 30,
    },
    secret: process.env.CSRF_SECRET,
});
