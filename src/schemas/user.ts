import * as z from 'zod';

import { basePasswordSchema, userIdSchema } from '@/schemas/auth';
import { emailSchema } from '@/schemas/email';

export const userSchema = z.object({
  role: z
    .enum(['USER', 'GUEST', 'COMPANY'], {
      required_error: 'Role is required',
      invalid_type_error: 'Role must be one of the following: user, guest, company',
    })
    .default('USER'),
  email: emailSchema,
  password: basePasswordSchema,
});

export const getUserByEmailSchema = z.object({
  email: emailSchema,
});

export const getUserByIdSchema = z.object({
  id: z.string(),
});

export const getUserByResetPasswordTokenSchema = z.object({
  token: z.string(),
});

export const getUserByEmailVerificationTokenSchema = z.object({
  token: z.string(),
});

export const updateUserSchema = userSchema
  .omit({
    role: true,
  })
  .extend({
    confirmPassword: basePasswordSchema,
  });

export const deleteUserSchema = z.object({
  id: userIdSchema,
});

export const checkIfUserExistsSchema = z.object({
  id: userIdSchema,
});

export type GetUserByEmailInput = z.infer<typeof getUserByEmailSchema>;

export type GetUserByIdInput = z.infer<typeof getUserByIdSchema>;

export type GetUserByResetPasswordTokenInput = z.infer<typeof getUserByResetPasswordTokenSchema>;

export type GetUserByEmailVerificationTokenInput = z.infer<
  typeof getUserByEmailVerificationTokenSchema
>;

export type UpdateUserInput = z.infer<typeof updateUserSchema>;

export type DeleteUserInput = z.infer<typeof deleteUserSchema>;

export type CheckIfUserExistsInput = z.infer<typeof checkIfUserExistsSchema>;
