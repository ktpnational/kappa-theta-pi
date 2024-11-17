'use server';

import { db } from '@/lib';
import { resend } from '@/lib/resend';
import {
  type CheckIfSubscribedToNewsletterInput,
  type NewsletterSignUpFormInput,
  checkIfSubscribedToNewsletterSchema,
  newsletterSignUpSchema,
} from '@/schemas/newsletter';

import { NewsletterWelcomeEmail } from '@/components/email';

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
