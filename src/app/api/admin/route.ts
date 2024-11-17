/**
 * Imports required dependencies for role-based authentication and response handling
 */
import { currentRole } from '@/lib/auth';
import { Role } from '@prisma/client';
import { NextResponse } from 'next/server';

/**
 * HTTP GET endpoint handler for admin authorization verification
 * 
 * @async
 * @function GET
 * @description Verifies if the current user has admin role permissions
 * @returns {Promise<NextResponse>} Returns a NextResponse with:
 *    - 200 status code if user has admin role
 *    - 403 status code if user does not have admin role
 * @throws {Error} If there is an error checking the current role
 */
export async function GET() {
  const role = await currentRole();

  if (role === Role.ADMIN) {
    return new NextResponse(null, { status: 200 });
  }
  return new NextResponse(null, { status: 403 });
}
