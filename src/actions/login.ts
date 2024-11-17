'use server';

import bcrypt from 'bcrypt';
import { AuthError } from 'next-auth';
import type * as z from 'zod';

import { signIn } from '@/auth';
import { getTwoFactorConfirmationByUserId, getTwoFactorTokenByEmail, getUserByEmail } from '@/data';
import {
  db,
  generateTwoFactorToken,
  generateVerificationToken,
  sendTwoFactorTokenEmail,
  sendVerificationEmail,
} from '@/lib';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { LoginSchema } from '@/schemas';

/**
 * Server action that handles user authentication with support for email verification and 2FA
 *
 * @description
 * This server action processes login attempts by validating credentials and handling various
 * authentication scenarios including:
 * - Email verification
 * - Two-factor authentication (2FA)
 * - Password validation
 * - Session creation
 *
 * @param {z.infer<typeof LoginSchema>} values - Login form values containing:
 *   - email: User's email address
 *   - password: User's password
 *   - code: Optional 2FA verification code
 * @param {string | null} [callbackUrl] - Optional URL to redirect to after successful login
 *
 * @returns {Promise<{
 *   error?: string;
 *   success?: string;
 *   twoFactor?: boolean;
 * }>} Returns an object containing either:
 * - error: Description of what went wrong
 * - success: Success message
 * - twoFactor: Flag indicating 2FA is required
 *
 * @throws {AuthError} May throw authentication errors during the sign-in process
 *
 * @example
 * ```typescript
 * // Basic login
 * const result = await login({ email: "user@example.com", password: "password123" });
 *
 * // Login with 2FA code
 * const result = await login({
 *   email: "user@example.com",
 *   password: "password123",
 *   code: "123456"
 * });
 *
 * // Login with custom callback URL
 * const result = await login(
 *   { email: "user@example.com", password: "password123" },
 *   "/dashboard"
 * );
 * ```
 *
 * @remarks
 * The function follows this process:
 * 1. Validates input fields using Zod schema
 * 2. Checks if user exists and has verified email
 * 3. Verifies password
 * 4. Handles 2FA if enabled:
 *    - Validates 2FA code if provided
 *    - Generates and sends new 2FA token if needed
 * 5. Creates session and redirects on success
 *
 * If email is not verified:
 * - Generates new verification token
 * - Sends verification email
 * - Returns success message
 *
 * If 2FA is enabled:
 * - Without code: Generates and sends 2FA token
 * - With code: Validates token and creates confirmation
 *
 * Error cases include:
 * - Invalid fields
 * - Non-existent email
 * - Unverified email
 * - Invalid password
 * - Invalid/expired 2FA code
 * - Authentication errors
 */
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

      if (!twoFactorToken) {
        return { error: 'Invalid code!' };
      }

      if (twoFactorToken.token !== code) {
        return { error: 'Invalid code!' };
      }

      const hasExpired = new Date(twoFactorToken.expires) < new Date();

      if (hasExpired) {
        return { error: 'Code expired!' };
      }

      await db.twoFactorToken.delete({
        where: { id: twoFactorToken.id },
      });

      const existingConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);

      if (existingConfirmation) {
        await db.twoFactorConfirmation.delete({
          where: { id: existingConfirmation.id },
        });
      }

      await db.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id,
        },
      });
    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email);
      await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token);

      return { twoFactor: true };
    }
  }

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });

    return { success: 'Login Sucess!' };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid credentials!' };
        default:
          return { error: 'Something went wrong!' };
      }
    }

    throw error;
  }
};
