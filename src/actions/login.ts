'use server';

import bcrypt from 'bcryptjs';
import type * as z from 'zod';

import { getTwoFactorConfirmationByUserId, getTwoFactorTokenByEmail, getUserByEmail } from '@/data';
import {
  db,
  generateTwoFactorToken,
  generateVerificationToken,
  sendTwoFactorTokenEmail,
  sendVerificationEmail,
} from '@/lib';
import { signIn } from '@/lib/auth-client';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { LoginSchema } from '@/schemas';

export const login = async (values: z.infer<typeof LoginSchema>, callbackUrl?: string | null) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }

  const { email, password, code } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: 'Email does not exist!' };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(existingUser.email);

    await sendVerificationEmail(verificationToken.email, verificationToken.token);

    return { success: 'Confirmation email Sent!' };
  }

  const passwordMatch = await bcrypt.compare(password, existingUser.password);

  if (!passwordMatch) {
    return { error: 'Invalid Credentials!' };
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);

      if (
        !twoFactorToken ||
        twoFactorToken.token !== code ||
        new Date(twoFactorToken.expires) < new Date()
      ) {
        return { error: 'Invalid or expired code!' };
      }

      await db.twoFactorToken.delete({ where: { id: twoFactorToken.id } });

      const existingConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);

      if (existingConfirmation) {
        await db.twoFactorConfirmation.delete({
          where: { id: existingConfirmation.id },
        });
      }

      await db.twoFactorConfirmation.create({
        data: { userId: existingUser.id },
      });
    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email);
      await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token);

      return { twoFactor: true };
    }
  }

  try {
    signIn.email({
      email,
      password,
      callbackURL: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });

    return { success: 'Login Success!' };
  } catch (error: any) {
    // Catch and handle errors without assuming a specific `AuthError` type
    if (error?.message === 'CredentialsSignin') {
      return { error: 'Invalid credentials!' };
    }

    return { error: 'Something went wrong!' };
  }
};
