import { adminAuthMiddleware } from '@/middleware/index';
import { type NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const middlewareResponse = await adminAuthMiddleware(request);

    // If middleware returns a response, return it (error case)
    if (middlewareResponse.status !== 200) {
      return middlewareResponse;
    }

    // If we get here, user is authenticated as admin
    return NextResponse.json({
      success: true,
      message: 'Admin access granted',
    });
  } catch (error) {
    console.error('Error in admin route:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
