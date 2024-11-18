import { auth } from '@/auth';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function adminAuthMiddleware(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.email || session.user.role !== 'ADMIN') {
      return new NextResponse(null, {
        status: 403,
        statusText: 'Forbidden',
      });
    }

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

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-user-role', session.user.role);
    requestHeaders.set('x-user-email', session.user.email);

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
