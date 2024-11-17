import { z } from 'zod';
import { emailSchema } from './email';

const VALIDATION_RULES = {
  PASSWORD: {
    MIN_LENGTH: 8,
    MAX_LENGTH: 256,
    PATTERN: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
    MESSAGE:
      'Password must contain at least 8 characters, including one uppercase, one lowercase, one number and one special character',
  },
  USER_ID: {
    MIN_LENGTH: 1,
    MAX_LENGTH: 512,
  },
  TOKEN: {
    MIN_LENGTH: 16,
    MAX_LENGTH: 256,
  },
};

export const basePasswordSchema = z
  .string({
    required_error: 'Password is required',
    invalid_type_error: 'Password must be a string',
  })
  .min(VALIDATION_RULES.PASSWORD.MIN_LENGTH, {
    message: `Password must be at least ${VALIDATION_RULES.PASSWORD.MIN_LENGTH} characters long`,
  })
  .max(VALIDATION_RULES.PASSWORD.MAX_LENGTH, {
    message: `Password must be at most ${VALIDATION_RULES.PASSWORD.MAX_LENGTH} characters long`,
  });

export const strongPasswordSchema = basePasswordSchema.regex(VALIDATION_RULES.PASSWORD.PATTERN, {
  message: VALIDATION_RULES.PASSWORD.MESSAGE,
});

export const userIdSchema = z
  .string({
    required_error: 'User Id is required',
    invalid_type_error: 'User Id must be a string',
  })
  .min(VALIDATION_RULES.USER_ID.MIN_LENGTH, {
    message: 'User Id must be at least 1 character long',
  })
  .max(VALIDATION_RULES.USER_ID.MAX_LENGTH, {
    message: 'User Id must be at most 512 characters long',
  });

// Helper function for password confirmation
const withPasswordConfirmation = (schema: z.ZodObject<any>) => {
  return schema.refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });
};

export const signUpWithPasswordSchema = withPasswordConfirmation(
  z.object({
    email: emailSchema,
    password: strongPasswordSchema,
    confirmPassword: z.string(),
  }),
);

export const signInWithEmailSchema = z.object({
  email: emailSchema,
});

export const signInWithPasswordSchema = z.object({
  email: emailSchema,
  password: basePasswordSchema,
});

export const passwordResetSchema = z.object({
  email: emailSchema,
});

export const passwordUpdateSchema = withPasswordConfirmation(
  z.object({
    password: strongPasswordSchema,
    confirmPassword: z.string(),
  }),
);

export const passwordUpdateSchemaExtended = withPasswordConfirmation(
  z.object({
    password: strongPasswordSchema,
    confirmPassword: z.string(),
    resetPasswordToken: z
      .string({
        required_error: 'Reset password token is required',
        invalid_type_error: 'Reset password token must be a string',
      })
      .min(VALIDATION_RULES.TOKEN.MIN_LENGTH)
      .max(VALIDATION_RULES.TOKEN.MAX_LENGTH),
  }),
);

export const linkOAuthAccountSchema = z.object({
  userId: userIdSchema,
});

export type SignUpWithPasswordFormInput = z.infer<typeof signUpWithPasswordSchema>;
export type SignInWithPasswordFormInput = z.infer<typeof signInWithPasswordSchema>;
export type SignInWithEmailFormInput = z.infer<typeof signInWithEmailSchema>;
export type PasswordResetFormInput = z.infer<typeof passwordResetSchema>;
export type PasswordUpdateFormInput = z.infer<typeof passwordUpdateSchema>;
export type PasswordUpdateFormInputExtended = z.infer<typeof passwordUpdateSchemaExtended>;
export type LinkOAuthAccountInput = z.infer<typeof linkOAuthAccountSchema>;
