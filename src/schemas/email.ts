import * as z from 'zod';

const EMAIL_RULES = {
  MIN_LENGTH: 5,
  MAX_LENGTH: 64,
};

const NAME_RULES = {
  MAX_LENGTH: 128,
};

const MESSAGE_RULES = {
  MAX_LENGTH: 10240,
};

export const emailSchema = z
  .string({
    required_error: 'Email is required',
    invalid_type_error: 'Email must be a string',
  })
  .min(EMAIL_RULES.MIN_LENGTH, {
    message: `Email must be at least ${EMAIL_RULES.MIN_LENGTH} characters`,
  })
  .max(EMAIL_RULES.MAX_LENGTH, {
    message: `Email must be at most ${EMAIL_RULES.MAX_LENGTH} characters`,
  })
  .email({
    message: 'Please enter a valid email address',
  });

export const contactFormSchema = z.object({
  email: emailSchema,
  name: z
    .string({
      required_error: 'Name is required',
      invalid_type_error: 'Name must be a string',
    })
    .max(NAME_RULES.MAX_LENGTH, {
      message: `Name must be at most ${NAME_RULES.MAX_LENGTH} characters`,
    }),
  message: z
    .string({
      required_error: 'Message is required',
      invalid_type_error: 'Message must be a string',
    })
    .max(MESSAGE_RULES.MAX_LENGTH, {
      message: `Message must be at most ${MESSAGE_RULES.MAX_LENGTH} characters`,
    }),
});

export const emailVerificationSchema = z.object({
  email: emailSchema,
});

export const markEmailAsVerifiedSchema = z.object({
  token: z.string({
    required_error: 'Verification token is required',
    invalid_type_error: 'Verification token must be a string',
  }),
});

export const checkIfEmailVerifiedSchema = z.object({
  email: emailSchema,
});

export type EmailVerificationFormInput = z.infer<typeof emailVerificationSchema>;
export type MarkEmailAsVerifiedInput = z.infer<typeof markEmailAsVerifiedSchema>;
export type CheckIfEmailVerifiedInput = z.infer<typeof checkIfEmailVerifiedSchema>;
export type ContactFormInput = z.infer<typeof contactFormSchema>;
