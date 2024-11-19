/**
 * @file Email client initialization using Resend service
 * @module emailClient
 */

/**
 * Import the Resend email service client class
 * @see {@link https://resend.com/docs/introduction}
 */
import { Resend } from 'resend';

/**
 * Initialized instance of the Resend email client
 * @constant
 * @type {Resend}
 * @description Creates a new instance of the Resend email service client using the API key from environment variables
 * @example
 * // Send an email using the client
 * await resend.emails.send({
 *   from: 'you@example.com',
 *   to: 'someone@example.com',
 *   subject: 'Hello',
 *   html: '<p>Hi there!</p>'
 * });
 * @throws {Error} If NEXT_PUBLIC_RESEND_API_KEY environment variable is not set
 * @see {@link https://resend.com/docs/send-email}
 */
export const resend = new Resend('re_123');
