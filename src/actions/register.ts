'use server';

import bcrypt from 'bcrypt';
import type * as z from 'zod';

import { getUserByEmail } from '@/data';
import { db, generateVerificationToken, sendVerificationEmail } from '@/lib';
import { RegisterSchema } from '@/schemas';

/**
 * Server action that handles new user registration with email verification
 *
 * @description
 * This server action processes new user registration requests by:
 * 1. Validating the registration form data
 * 2. Checking for existing users with the same email
 * 3. Securely hashing the password
 * 4. Creating the new user record
 * 5. Generating and sending an email verification token
 *
 * The function implements several security measures:
 * - Input validation using Zod schema
 * - Password hashing with bcrypt
 * - Email verification flow
 * - Duplicate email prevention
 *
 * @param {z.infer<typeof RegisterSchema>} values - Registration form values containing:
 *   - email: User's email address
 *   - name: User's full name
 *   - password: User's chosen password
 *
 * @returns {Promise<{
 *   error?: string;
 *   sucess?: string;
 * }>} Returns an object containing either:
 * - error: Description of what went wrong during registration
 * - sucess: Confirmation message upon successful registration
 *
 * @throws
 * May throw errors from:
 * - Database operations
 * - Password hashing
 * - Email sending
 * - Token generation
 *
 * @example
 * ```typescript
 * // Basic registration
 * const result = await register({
 *   email: "user@example.com",
 *   name: "John Doe",
 *   password: "securePassword123"
 * });
 *
 * // Error handling
 * try {
 *   const result = await register(formValues);
 *   if (result.error) {
 *     // Handle registration error
 *     console.error(result.error);
 *   } else {
 *     // Registration successful
 *     console.log(result.sucess);
 *   }
 * } catch (error) {
 *   // Handle unexpected errors
 *   console.error('Registration failed:', error);
 * }
 * ```
 */
export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }

  const { email, name, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: 'Email already in use!' };
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { sucess: 'Confirmation email sent!' };
};
