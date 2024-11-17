import { emailSchema } from '@/schemas/email';
import * as z from 'zod';

export const newsletterSignUpSchema = z.object({
  email: emailSchema,
});

export const checkIfSubscribedToNewsletterSchema = z.object({
  email: emailSchema,
});

export type NewsletterSignUpFormInput = z.infer<typeof newsletterSignUpSchema>;
export type CheckIfSubscribedToNewsletterInput = z.infer<
  typeof checkIfSubscribedToNewsletterSchema
>;
