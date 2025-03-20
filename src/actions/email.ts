'use server';

import crypto from 'crypto';
import { getUserByEmail } from '@/data';
import { env } from '@/env';
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

/**
 * Renders the email verification template with provided email and token
 *
 * @param {string} email - User's email address to verify
 * @param {string} token - Verification token to include in email
 * @returns {Promise<React.JSX.Element>} Rendered React email template
 * @throws Will throw if template import or rendering fails
 * @private
 */
const renderEmailVerificationTemplate = async (email: string, token: string) => {
  const { EmailVerificationEmail } = await import('@/components/email/email-verification-email');
  return EmailVerificationEmail({
    email,
    emailVerificationToken: token,
  });
};

/**
 * Renders the new enquiry notification email template
 *
 * @param {string} name - Name of person submitting enquiry
 * @param {string} email - Email address of enquirer
 * @param {string} message - Content of the enquiry message
 * @returns {Promise<React.JSX.Element>} Rendered React email template
 * @throws Will throw if template import or rendering fails
 * @private
 */
const renderNewEnquiryTemplate = async (name: string, email: string, message: string) => {
  const { NewEnquiryEmail } = await import('@/components');
  return NewEnquiryEmail({
    name,
    email,
    message,
  });
};

/**
 * Resends the email verification link to a user
 *
 * @description
 * This server action handles resending verification emails by:
 * 1. Validating the input email
 * 2. Checking if user exists
 * 3. Generating new verification token
 * 4. Updating user record with new token
 * 5. Sending verification email
 *
 * Security measures:
 * - Server-side only execution
 * - Input validation
 * - Cryptographically secure token generation
 * - User existence verification
 *
 * @param {EmailVerificationFormInput} rawInput - Form input containing email
 *
 * @returns {Promise<'invalid-input' | 'not-found' | 'error' | 'success'>} Status indicating:
 * - 'invalid-input': Input validation failed
 * - 'not-found': User email not found
 * - 'error': Operation failed
 * - 'success': Email sent successfully
 *
 * @throws {Error} If unexpected error occurs during process
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

    if (!userUpdated) return 'error';

    const emailTemplate = await renderEmailVerificationTemplate(
      validatedInput.data.email,
      emailVerificationToken,
    );

    const emailSent = await resend.emails.send({
      from: env.NEXT_PUBLIC_RESEND_EMAIL_FROM,
      to: [validatedInput.data.email],
      subject: 'Verify your email address',
      react: emailTemplate,
    });

    return emailSent ? 'success' : 'error';
  } catch (error) {
    console.error(error);
    throw new Error('Error resending email verification link');
  }
}

/**
 * Checks if a user's email has been verified
 *
 * @description
 * Verifies email verification status by:
 * 1. Validating input email
 * 2. Retrieving user record
 * 3. Checking emailVerified timestamp
 *
 * @param {CheckIfEmailVerifiedInput} rawInput - Input containing email to check
 *
 * @returns {Promise<boolean>} True if email is verified, false otherwise
 *
 * @throws {Error} If verification check fails unexpectedly
 */
export async function checkIfEmailVerified(rawInput: CheckIfEmailVerifiedInput): Promise<boolean> {
  try {
    const validatedInput = checkIfEmailVerifiedSchema.safeParse(rawInput);
    if (!validatedInput.success) return false;

    const user = await getUserByEmail(validatedInput.data.email);
    return user?.emailVerified instanceof Date;
  } catch (error) {
    console.error(error);
    throw new Error('Error checking if email verified');
  }
}

/**
 * Marks a user's email as verified using verification token
 *
 * @description
 * This server action completes email verification by:
 * 1. Validating the verification token
 * 2. Updating user record with verification timestamp
 * 3. Clearing the used verification token
 *
 * Security measures:
 * - Server-side only execution
 * - Token validation
 * - One-time use tokens
 *
 * @param {MarkEmailAsVerifiedInput} rawInput - Input containing verification token
 *
 * @returns {Promise<'invalid-input' | 'error' | 'success'>} Status indicating:
 * - 'invalid-input': Token validation failed
 * - 'error': Operation failed
 * - 'success': Email marked as verified
 *
 * @throws {Error} If verification process fails unexpectedly
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
 * Processes and sends contact form submissions
 *
 * @description
 * This server action handles contact form submissions by:
 * 1. Validating form input data
 * 2. Rendering notification email template
 * 3. Sending notification to configured recipient
 *
 * Security measures:
 * - Server-side only execution
 * - Input validation
 * - Configured sender/recipient addresses
 *
 * @param {ContactFormInput} rawInput - Form data containing:
 * - name: Sender's name
 * - email: Sender's email
 * - message: Enquiry content
 *
 * @returns {Promise<'error' | 'success'>} Status indicating:
 * - 'error': Submission failed
 * - 'success': Notification sent successfully
 *
 * @throws {Error} If submission process fails unexpectedly
 */
export async function submitContactForm(rawInput: ContactFormInput): Promise<'error' | 'success'> {
  try {
    const validatedInput = contactFormSchema.safeParse(rawInput);
    if (!validatedInput.success) return 'error';

    const emailTemplate = await renderNewEnquiryTemplate(
      validatedInput.data.name,
      validatedInput.data.email,
      validatedInput.data.message,
    );

    const emailSent = await resend.emails.send({
      from: env.NEXT_PUBLIC_RESEND_EMAIL_FROM,
      to: env.NEXT_PUBLIC_RESEND_EMAIL_TO,
      subject: 'Exciting news! New enquiry awaits',
      react: emailTemplate,
    });

    return emailSent ? 'success' : 'error';
  } catch (error) {
    console.error(error);
    throw new Error('Error submitting contact form');
  }
}
