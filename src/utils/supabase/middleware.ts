import { type CookieOptions, createServerClient } from '@supabase/ssr';
import { type NextRequest, NextResponse } from 'next/server';

/**
 * Updates the user session by handling Supabase authentication cookies and retrieving the current user.
 * 
 * @description This middleware function manages the authentication state by:
 * 1. Creating a new NextResponse instance to handle the request
 * 2. Initializing a Supabase client with cookie handling capabilities
 * 3. Managing cookie operations (get, set, remove) for session persistence
 * 4. Retrieving the current authenticated user
 * 
 * @param {NextRequest} request - The incoming Next.js request object containing headers and cookies
 * 
 * @returns {Promise<{
 *   res: NextResponse - The modified Next.js response with updated cookies
 *   user: User | null - The current authenticated user or null if not authenticated
 * }>}
 * 
 * @example
 * ```ts
 * // Usage in middleware.ts
 * const { res, user } = await updateSession(request);
 * if (!user) {
 *   // Handle unauthenticated user
 *   return NextResponse.redirect(new URL('/login', request.url));
 * }
 * return res;
 * ```
 * 
 * @throws Will throw an error if NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY env variables are not set
 */
export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
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
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return { res: response, user };
}
