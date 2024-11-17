import { Resend } from 'resend';

/**
 * Instance of Resend email service initialized with API key from environment variables
 */
const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Base domain URL for the application taken from environment variables
 */
const domain = process.env.NEXT_PUBLIC_APP_URL;

/**
 * Sends a password reset email to a specified email address
 *
 * @param email - The recipient's email address
 * @param token - A unique token for password reset verification
 * @returns {Promise<void>} A promise that resolves when the email is sent
 * @throws Will throw an error if email sending fails
 *
 * @example
 * ```ts
 * await sendPasswordResetEmail("user@example.com", "reset-token-123")
 * ```
 */
export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'Reset your password',
    html: `<p>Click <a href="${resetLink}">here</a> to reset password.</p>`,
  });
};

/**
 * Sends an email verification link to a specified email address
 *
 * @param email - The recipient's email address to be verified
 * @param token - A unique token for email verification
 * @returns {Promise<void>} A promise that resolves when the email is sent
 * @throws Will throw an error if email sending fails
 *
 * @example
 * ```ts
 * await sendVerificationEmail("user@example.com", "verify-token-123")
 * ```
 */
export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'Confirm your email',
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`,
  });
};

/**
 * Sends a two-factor authentication code via email
 *
 * @param email - The recipient's email address
 * @param token - The 2FA token/code to be sent
 * @returns {Promise<void>} A promise that resolves when the email is sent
 * @throws Will throw an error if email sending fails
 *
 * @example
 * ```ts
 * await sendTwoFactorTokenEmail("user@example.com", "123456")
 * ```
 */
export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: '2FA Code',
    html: `<p>Your 2FA code: ${token}</p>`,
  });
};
