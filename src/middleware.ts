import { adminAuthMiddleware } from '@/middlewares/index';
import { type CookieOptions, createServerClient } from '@supabase/ssr';
import { type NextRequest, NextResponse } from 'next/server';

/**
 * Middleware function to handle authentication and session management for incoming requests.
 * This middleware integrates Supabase authentication with Next.js middleware capabilities.
 *
 * @param {NextRequest} request - The incoming Next.js request object containing headers, cookies and other request data
 * @returns {Promise<NextResponse>} A promise that resolves to the modified Next.js response object
 *
 * @remarks
 * - Creates a new response object with preserved request headers
 * - Checks if request is for public asset using isPublicAsset()
 * - Initializes Supabase client with cookie handling
 * - Manages authentication state via getUser()
 * - Handles cookie operations (get/set/remove) for session management
 *
 * @example
 * ```ts
 * // Automatically applied to matching routes via Next.js middleware
 * const response = await middleware(request);
 * ```
 */
export async function middleware(request: NextRequest): Promise<NextResponse> {
  if (request.nextUrl.pathname.startsWith('/api/admin')) {
    return adminAuthMiddleware(request);
  }

  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  if (isPublicAsset(request)) {
    return response;
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value: '',
            ...options,
          });
        },
      },
    },
  );

  await supabase.auth.getUser();

  return response;
}

/**
 * Determines if the incoming request is for a public asset that should bypass authentication.
 * Public assets include static files, images, favicons, and other publicly accessible resources.
 *
 * @param {NextRequest} request - The incoming Next.js request object to check
 * @returns {boolean} True if the request is for a public asset, false otherwise
 *
 * @remarks
 * - Checks request path against predefined list of public asset paths
 * - Uses startsWith() to match path prefixes
 * - Includes common static assets like favicons, images, PWA assets
 * - Includes common web standard files like robots.txt and sitemap.xml
 *
 * @example
 * ```ts
 * if (isPublicAsset(request)) {
 *   // Allow access without authentication
 *   return response;
 * }
 * ```
 */
function isPublicAsset(request: NextRequest): boolean {
  const publicAssetPaths: string[] = [
    '/assets/',
    '/pwa/',
    '/images/',
    '/favicon.ico',
    '/favicon-16x16.png',
    '/favicon-32x32.png',
    '/apple-touch-icon.png',
    '/android-chrome-192x192.png',
    '/android-chrome-512x512.png',
    '/robots.txt',
    '/sitemap.xml',
    '/manifest.webmanifest',
    '/sw.js',
  ];

  return publicAssetPaths.some((path) => request.nextUrl.pathname.startsWith(path));
}

/**
 * Configuration object that defines which routes the middleware should be applied to.
 * Uses Next.js middleware matcher patterns to include/exclude specific paths.
 *
 * @type {Object}
 * @property {string[]} matcher - Array of path patterns to match against incoming requests
 *
 * @remarks
 * - Matches all paths by default
 * - Excludes Next.js internal paths (_next/static, _next/image)
 * - Excludes favicon.ico requests
 * - Pattern can be modified to include additional paths
 * - Uses negative lookahead (?!) in regex for exclusions
 *
 * @example
 * ```ts
 * // In middleware.ts
 * export const config = {
 *   matcher: ['/((?!_next/static|_next/image|favicon.ico).*)']
 * };
 * ```
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
    '/api/admin/:path*',
  ],
  runtime: 'nodejs',
};
