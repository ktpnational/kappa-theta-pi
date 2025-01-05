'use server';

import { getUserByEmail } from '@/data';
import { db, generateVerificationToken, hashPassword, sendVerificationEmail } from '@/lib';
import { RegisterSchema } from '@/schemas';
import type * as z from 'zod';

/**
 * Server action that handles new user registration with email verification.
 *
 * @description
 * This server action processes new user registration requests by:
 * 1. Validating the registration form data using Zod schema.
 * 2. Checking for existing users with the same email to prevent duplicates.
 * 3. Securely hashing the password using bcrypt.
 * 4. Creating the new user record in the database.
 * 5. Generating and sending an email verification token.
 *
 * The function implements several security measures:
 * - Input validation using Zod schema.
 * - Password hashing with bcrypt.
 * - Email verification flow to ensure email ownership.
 * - Duplicate email prevention.
 *
 * @param {z.infer<typeof RegisterSchema>} values - Registration form values containing:
 *   - email: User's email address.
 *   - name: User's full name.
 *   - password: User's chosen password.
 *
 * @returns {Promise<{ error?: string; success?: string }>} Returns an object containing either:
 * - `error`: Description of what went wrong during registration.
 * - `success`: Confirmation message upon successful registration.
 *
 * @throws {Error} May throw errors from:
 * - Database operations.
 * - Password hashing.
 * - Email sending.
 * - Token generation.
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
 *     console.log(result.success);
 *   }
 * } catch (error) {
 *   // Handle unexpected errors
 *   console.error('Registration failed:', error);
 * }
 * ```
 */
export const register = async (values: z.infer<typeof RegisterSchema>) => {
  // Validate input fields using Zod schema
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }

  const { email, name, password } = validatedFields.data;

  try {
    // Check if a user with the same email already exists
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return { error: 'Email already in use!' };
    }

    // Hash the password securely
    const hashedPassword = await hashPassword(password);

    // Create the new user in the database
    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // Generate a verification token and send the verification email
    const verificationToken = await generateVerificationToken(email);
    await sendVerificationEmail(verificationToken.email, verificationToken.token);

    return { success: 'Confirmation email sent!' };
  } catch (error) {
    // Safely log the error with proper type checking
    if (error instanceof Error) {
      console.error('Registration error:', error.message);
    } else {
      console.error('Registration error:', String(error));
    }

    // Return a generic error message to the client
    return { error: 'An error occurred during registration. Please try again.' };
  }
};
