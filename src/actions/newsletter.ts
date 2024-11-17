'use server';

import { db, resend } from '@/lib';
import {
  type CheckIfSubscribedToNewsletterInput,
  type NewsletterSignUpFormInput,
  checkIfSubscribedToNewsletterSchema,
  newsletterSignUpSchema,
} from '@/schemas';

import { NewsletterWelcomeEmail } from '@/components';

/**
 * Checks if an email address is already subscribed to the newsletter
 *
 * @description
 * This server action verifies if a given email address is already registered
 * in the newsletter subscription database. It performs the following steps:
 * 1. Validates the input email using Zod schema
 * 2. Queries the database for existing subscription
 * 3. Returns boolean indicating subscription status
 *
 * @param {CheckIfSubscribedToNewsletterInput} rawInput - Object containing email to check
 * @returns {Promise<boolean>} Returns true if email is subscribed, false otherwise
 *
 * @throws {Error}
 * Throws an error if:
 * - Database query fails
 * - Unexpected error occurs during validation/checking
 *
 * @example
 * ```typescript
 * // Check if email is subscribed
 * const isSubscribed = await checkIfSubscribedToNewsletter({
 *   email: "user@example.com"
 * });
 *
 * if (isSubscribed) {
 *   console.log("Already subscribed");
 * }
 * ```
 */
export async function checkIfSubscribedToNewsletter(
  rawInput: CheckIfSubscribedToNewsletterInput,
): Promise<boolean> {
  try {
    const validatedInput = checkIfSubscribedToNewsletterSchema.safeParse(rawInput);
    if (!validatedInput.success) return false;

    const subscribed = await db.newsletterSubscriber.findUnique({
      where: {
        email: validatedInput.data.email,
      },
    });
    return subscribed ? true : false;
  } catch (error) {
    console.error(error);
    throw new Error('Error checking if already subscribed to newsletter');
  }
}

/**
 * Handles newsletter subscription process including email validation and welcome email
 *
 * @description
 * This server action manages the complete newsletter subscription flow:
 * 1. Validates the submitted email using Zod schema
 * 2. Checks for existing subscription
 * 3. Creates new subscriber record in database
 * 4. Sends welcome email to new subscriber
 *
 * The function implements multiple validation steps to ensure data integrity:
 * - Input validation through Zod schema
 * - Duplicate subscription check
 * - Database operation verification
 * - Email sending confirmation
 *
 * @param {NewsletterSignUpFormInput} rawInput - Object containing subscription email
 * @returns {Promise<'exists' | 'error' | 'success'>} Returns:
 * - 'exists': Email already subscribed
 * - 'error': Validation failed or operation error
 * - 'success': Successfully subscribed and welcome email sent
 *
 * @throws {Error}
 * Throws an error if:
 * - Database operations fail
 * - Email sending fails
 * - Unexpected errors during process
 *
 * @example
 * ```typescript
 * // Subscribe new email
 * const result = await subscribeToNewsletter({
 *   email: "newuser@example.com"
 * });
 *
 * switch(result) {
 *   case 'success':
 *     console.log("Successfully subscribed");
 *     break;
 *   case 'exists':
 *     console.log("Already subscribed");
 *     break;
 *   case 'error':
 *     console.log("Subscription failed");
 *     break;
 * }
 * ```
 */
export async function subscribeToNewsletter(
  rawInput: NewsletterSignUpFormInput,
): Promise<'exists' | 'error' | 'success'> {
  try {
    const validatedInput = newsletterSignUpSchema.safeParse(rawInput);
    if (!validatedInput.success) return 'error';

    const alreadySubscribed = await checkIfSubscribedToNewsletter({
      email: validatedInput.data.email,
    });
    if (alreadySubscribed) return 'exists';

    const newSubscriber = await db.newsletterSubscriber.create({
      data: { email: validatedInput.data.email },
    });

    const emailSent = await resend.emails.send({
      from: process.env.RESEND_EMAIL_FROM,
      to: validatedInput.data.email,
      subject: 'Welcome to our newsletter!',
      react: NewsletterWelcomeEmail(),
    });

    return newSubscriber && emailSent ? 'success' : 'error';
  } catch (error) {
    console.error(error);
    throw new Error('Error subscribing to the newsletter');
  }
}
