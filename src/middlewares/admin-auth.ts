import { auth } from '@/auth';
import { Role } from '@prisma/client';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import SuperJSON from 'superjson';
import { z } from 'zod';

/**
 * Zod schema to validate the session object structure and user role.
 * Ensures the session contains a user object with a valid role enum value.
 */
const sessionSchema = z.object({
  user: z.object({
    role: z.nativeEnum(Role),
  }),
});

/**
 * Duration in milliseconds for how long to cache session data.
 * Default is 24 hours (24 * 60 * 60 * 1000 ms)
 */
const CACHE_DURATION: number = 24 * 60 * 60 * 1000;

/**
 * In-memory cache for storing session data to reduce auth checks.
 * @property {any} data - The cached session data serialized with SuperJSON
 * @property {number} timestamp - Unix timestamp when cache was last updated
 */
let cache: { data: any; timestamp: number } | null = null;

/**
 * Middleware to handle authentication and authorization for admin routes.
 * Implements a multi-layered security approach with caching for performance.
 *
 * @param {NextRequest} request - The incoming Next.js request object
 * @returns {Promise<NextResponse>} The Next.js response with appropriate status and headers
 *
 * @throws {Error} If there are issues accessing auth session or Supabase client
 *
 * @description
 * This middleware performs several critical security checks in sequence:
 * 1. Checks for cached valid session to optimize performance
 * 2. Validates NextAuth session exists and user has admin role
 * 3. Verifies Supabase session and access token are valid
 * 4. Adds secure headers with user role and email
 *
 * The middleware implements caching to reduce load on auth services:
 * - Cached sessions are valid for 24 hours by default
 * - Cache includes full session data serialized with SuperJSON
 * - Cache headers are added to responses for client-side caching
 *
 * Security features:
 * - Role-based access control (RBAC) using NextAuth session
 * - Double validation with Supabase session
 * - Secure headers for downstream middleware/handlers
 * - Error handling with appropriate HTTP status codes
 *
 * @example
 * ```ts
 * // Using in middleware.ts
 * import { adminAuthMiddleware } from './admin-auth'
 *
 * export default function middleware(request: NextRequest) {
 *   // Apply to admin routes
 *   if (request.nextUrl.pathname.startsWith('/admin')) {
 *     return adminAuthMiddleware(request)
 *   }
 * }
 * ```
 *
 * @returns {Promise<NextResponse>} Returns one of:
 * - 200 OK with cached data and cache headers
 * - 200 OK with new session data and auth headers
 * - 401 Unauthorized if no valid Supabase session
 * - 403 Forbidden if user is not an admin
 * - 500 Internal Server Error if middleware fails
 *
 * Response headers may include:
 * - x-user-role: User's role from session
 * - x-user-email: User's email from session
 * - x-cache: Cache status (true/false)
 * - x-cache-duration: Cache duration in ms
 * - x-cache-timestamp: When cache was last updated
 * - Cache-Control: Public cache settings
 *
 * @see {@link https://next-auth.js.org/} for NextAuth documentation
 * @see {@link https://supabase.com/docs/} for Supabase documentation
 */
export async function adminAuthMiddleware(request: NextRequest) {
  try {
    // Check cache first
    if (cache && Date.now() - cache.timestamp < CACHE_DURATION) {
      return NextResponse.json(SuperJSON.parse(cache.data), {
        headers: {
          'x-user-role': cache.data.user.role,
          'x-user-email': cache.data.user.email,
          'x-cache': 'true',
          'x-cache-duration': CACHE_DURATION.toString(),
          'x-cache-timestamp': cache.timestamp.toString(),
          'Content-Type': 'application/json',
          'Cache-Control': `public, max-age=${CACHE_DURATION / 1000}`,
        },
      });
    }

    // Get and validate session
    const session = await auth();
    const parsedSession = sessionSchema.safeParse(session);

    if (!parsedSession.success || !session?.user?.email || session.user.role !== 'ADMIN') {
      return new NextResponse(null, {
        status: 403,
        statusText: 'Forbidden',
      });
    }

    // Validate Supabase session
    const supabase = createMiddlewareClient({
      req: request,
      res: NextResponse.next(),
    });

    const {
      data: { session: supabaseSession },
    } = await supabase.auth.getSession();

    if (!supabaseSession?.access_token) {
      return new NextResponse(null, {
        status: 401,
        statusText: 'Unauthorized',
      });
    }

    // Add auth headers
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-user-role', session.user.role);
    requestHeaders.set('x-user-email', session.user.email);

    // Update cache
    cache = {
      data: SuperJSON.stringify(session),
      timestamp: Date.now(),
    };

    // Return response with auth headers
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (error) {
    console.error('Admin auth middleware error:', error);
    return new NextResponse(null, {
      status: 500,
      statusText: 'Internal Server Error',
    });
  }
}
