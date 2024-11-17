/**
 * Authentication module imports and exports.
 * @module auth
 */

/**
 * Import the auth object which contains authentication methods and middleware
 * from the local authentication configuration.
 */
import { auth } from '@/auth';

/**
 * Force dynamic rendering of this route to ensure authentication state is always fresh.
 * This prevents caching of authentication-dependent content.
 * @constant {string} dynamic
 */
export const dynamic = 'force-dynamic';

/**
 * Export the GET and POST request handlers from the auth object.
 * GET handler manages authentication verification and session retrieval.
 * POST handler manages login/signup flows and session creation.
 * @exports {Object} auth handlers
 * @property {Function} GET - Handles authentication verification requests
 * @property {Function} POST - Handles authentication mutation requests
 */
export const { GET, POST } = auth;
