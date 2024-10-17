import { encrypt } from '@/lib/jwt';
import { db } from '@/lib/prisma';
import { authUser } from '@/lib/schema';
import { Elysia, InternalServerError } from 'elysia';
import { cookies } from 'next/headers';

export const authRoute = new Elysia({ prefix: '/auth' })
  .post(
    '/register',
    async (ctx) => {
      // Check if user already exists
      const userExist = await db.user.findFirst({
        where: { username: ctx.body.username.trim() },
      });
      if (userExist) throw new InternalServerError('User already exists');
      const user = await db.user.create({
        data: {
          username: ctx.body.username.trim(),
          password: ctx.body.password.trim(),
        },
      });

      // Set authentication cookie
      cookies().set({
        name: process.env.AUTH_COOKIE,
        value: (await encrypt(user))!,
        path: '/',
        httpOnly: true,
        maxAge: process.env.SEVEN_DAYS,
      });

      return 'success';
    },
    { body: authUser },
  )
  .post(
    '/login',
    async (ctx) => {
      const user = await db.user.findFirst({
        where: {
          username: ctx.body.username.trim(),
          password: ctx.body.password.trim(),
        },
      });

      if (!user) throw new InternalServerError('User not found');
      cookies().set({
        name: process.env.AUTH_COOKIE,
        value: (await encrypt(user))!,
        path: '/',
        httpOnly: true,
        maxAge: process.env.SEVEN_DAYS,
      });
      return 'success';
    },
    { body: authUser },
  )
  .get('/logout', (_ctx) => {
    return !!cookies().delete(process.env.AUTH_COOKIE);
  });
