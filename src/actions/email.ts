'use server';

import crypto from 'crypto';

import { getUserByEmail } from '@/data';
import { db, resend } from '@/lib';
import {
  type CheckIfEmailVerifiedInput,
  type ContactFormInput,
  type EmailVerificationFormInput,
  type MarkEmailAsVerifiedInput,
  checkIfEmailVerifiedSchema,
  contactFormSchema,
  emailVerificationSchema,
  markEmailAsVerifiedSchema,
} from '@/schemas';

import { EmailVerificationEmail } from '@/components';
import { NewEnquiryEmail } from '@/components';

/**
 * Resends an email verification link to a user's email address.
 *
 * @description
 * This server action handles the process of resending email verification links:
 * 1. Validates the input email using zod schema
 * 2. Checks if user exists in database
 * 3. Generates a new verification token
 * 4. Updates user record with new token
 * 5. Sends verification email using Resend
 *
 * @param {EmailVerificationFormInput} rawInput - The raw input containing the email address
 *
 * @returns {Promise<'invalid-input' | 'not-found' | 'error' | 'success'>}
 * - 'invalid-input': Input validation failed
 * - 'not-found': User with provided email doesn't exist
 * - 'error': Error during token update or email sending
 * - 'success': Verification email sent successfully
 *
 * @throws {Error} When an unexpected error occurs during the process
 *
 * @example
 * ```typescript
 * const result = await resendEmailVerificationLink({ email: "user@example.com" });
 * if (result === 'success') {
 *   // Verification email sent successfully
 * }
 * ```
 */
export async function resendEmailVerificationLink(
  rawInput: EmailVerificationFormInput,
): Promise<'invalid-input' | 'not-found' | 'error' | 'success'> {
  try {
    const validatedInput = emailVerificationSchema.safeParse(rawInput);
    if (!validatedInput.success) return 'invalid-input';

    const user = await getUserByEmail(validatedInput.data.email);
    if (!user) return 'not-found';

    const emailVerificationToken = crypto.randomBytes(32).toString('base64url');

    const userUpdated = await db.user.update({
      where: {
        email: validatedInput.data.email,
      },
      data: {
        emailVerificationToken,
      },
    });

    const emailSent = await resend.emails.send({
      from: process.env.RESEND_EMAIL_FROM,
      to: [validatedInput.data.email],
      subject: 'Verify your email address',
      react: EmailVerificationEmail({
        email: validatedInput.data.email,
        emailVerificationToken,
      }),
    });

    return userUpdated && emailSent ? 'success' : 'error';
  } catch (error) {
    console.error(error);
    throw new Error('Error resending email verification link');
  }
}

/**
 * Checks if a user's email address has been verified.
 *
 * @description
 * This server action verifies if a user's email has been confirmed by:
 * 1. Validating the input email
 * 2. Retrieving user record
 * 3. Checking if emailVerified field is a valid Date
 *
 * @param {CheckIfEmailVerifiedInput} rawInput - The raw input containing the email to check
 *
 * @returns {Promise<boolean>}
 * - true: Email is verified
 * - false: Email is not verified or validation failed
 *
 * @throws {Error} When an unexpected error occurs during the verification check
 *
 * @example
 * ```typescript
 * const isVerified = await checkIfEmailVerified({ email: "user@example.com" });
 * if (isVerified) {
 *   // Email is verified
 * }
 * ```
 */
export async function checkIfEmailVerified(rawInput: CheckIfEmailVerifiedInput): Promise<boolean> {
  try {
    const validatedInput = checkIfEmailVerifiedSchema.safeParse(rawInput);
    if (!validatedInput.success) return false;

    const user = await getUserByEmail(validatedInput.data.email);
    return user?.emailVerified instanceof Date ? true : false;
  } catch (error) {
    console.error(error);
    throw new Error('Error checking if email verified');
  }
}

/**
 * Marks a user's email as verified using their verification token.
 *
 * @description
 * This server action completes the email verification process by:
 * 1. Validating the verification token
 * 2. Updating the user record to mark email as verified
 * 3. Clearing the verification token
 *
 * @param {MarkEmailAsVerifiedInput} rawInput - The raw input containing the verification token
 *
 * @returns {Promise<'invalid-input' | 'error' | 'success'>}
 * - 'invalid-input': Token validation failed
 * - 'error': Error updating user record
 * - 'success': Email marked as verified successfully
 *
 * @throws {Error} When an unexpected error occurs during the verification process
 *
 * @example
 * ```typescript
 * const result = await markEmailAsVerified({ token: "verification-token" });
 * if (result === 'success') {
 *   // Email verified successfully
 * }
 * ```
 */
export async function markEmailAsVerified(
  rawInput: MarkEmailAsVerifiedInput,
): Promise<'invalid-input' | 'error' | 'success'> {
  try {
    const validatedInput = markEmailAsVerifiedSchema.safeParse(rawInput);
    if (!validatedInput.success) return 'invalid-input';

    const userUpdated = await db.user.update({
      where: {
        emailVerificationToken: validatedInput.data.token,
      },
      data: {
        emailVerified: new Date(),
        emailVerificationToken: null,
      },
    });

    return userUpdated ? 'success' : 'error';
  } catch (error) {
    console.error(error);
    throw new Error('Error marking email as verified');
  }
}

/**
 * Processes and submits a contact form submission.
 *
 * @description
 * This server action handles contact form submissions by:
 * 1. Validating the form input data
 * 2. Sending a notification email to the configured recipient
 *
 * The email is sent using Resend and includes:
 * - Sender's name
 * - Sender's email address
 * - Message content
 *
 * @param {ContactFormInput} rawInput - The raw form input containing name, email, and message
 *
 * @returns {Promise<'error' | 'success'>}
 * - 'error': Validation failed or email sending failed
 * - 'success': Form processed and notification sent successfully
 *
 * @throws {Error} When an unexpected error occurs during form submission
 *
 * @example
 * ```typescript
 * const result = await submitContactForm({
 *   name: "John Doe",
 *   email: "john@example.com",
 *   message: "Hello, I'm interested in your services"
 * });
 * if (result === 'success') {
 *   // Form submitted successfully
 * }
 * ```
 */
export async function submitContactForm(rawInput: ContactFormInput): Promise<'error' | 'success'> {
  try {
    const validatedInput = contactFormSchema.safeParse(rawInput);
    if (!validatedInput.success) return 'error';

    const emailSent = await resend.emails.send({
      from: process.env.RESEND_EMAIL_FROM,
      to: process.env.RESEND_EMAIL_TO,
      subject: 'Exciting news! New enquiry awaits',
      react: NewEnquiryEmail({
        name: validatedInput.data.name,
        email: validatedInput.data.email,
        message: validatedInput.data.message,
      }),
    });

    return emailSent ? 'success' : 'error';
  } catch (error) {
    console.error(error);
    throw new Error('Error submitting contact form');
  }
}
