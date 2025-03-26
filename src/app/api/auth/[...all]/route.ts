/**
 * Authentication module imports and exports.
 * @module auth
 */

/**
 * Import the auth object which contains authentication methods and middleware
 * from the local authentication configuration.
 */
import {  } from ''
import { toNextJsHandler } from 'better-auth/next-js';

import type { NextRequest } from 'next/server';

/**
 * Force dynamic rendering of this route to ensure authentication state is always fresh.
 * This prevents caching of authentication-dependent content.
 * @constant {string} dynamic
 */
export const dynamic = 'force-dynamic';

export const { GET, POST } = toNextJsHandler(auth.handler);
