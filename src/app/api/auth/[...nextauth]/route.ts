/**
 * Authentication module imports and exports.
 * @module auth
 */

/**
 * Import the auth object which contains authentication methods and middleware
 * from the local authentication configuration.
 */
import { handlers } from '@/auth';
import type { NextRequest } from 'next/server';

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
const handler = async (request: NextRequest) => {
  try {
    if (request.method === 'GET') {
      return await handlers.GET(request);
    }
    if (request.method === 'POST') {
      return await handlers.POST(request);
    }
    return new Response(null, { status: 405 });
  } catch (error) {
    console.error('[AUTH]', error);
    return new Response(
      JSON.stringify({
        error: 'Internal auth error',
        details: process.env.NODE_ENV === 'development' ? error : undefined,
      }),
      { status: 500 },
    );
  }
};

export const GET = handler;
export const POST = handler;
