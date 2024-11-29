import { NextResponse } from 'next/server';

/**
 * Handles HTTP GET requests by returning a simple "OK" response.
 *
 * @async
 * @function GET
 * @returns {Promise<NextResponse>} A Promise that resolves to a NextResponse object
 *                                 containing a plain text "OK!" message
 *
 * @description
 * This endpoint handler function:
 * - Returns a basic "OK!" text response
 * - Sets HTTP status code to 200 (Success)
 * - Sets Content-Type header to text/plain
 * - Is compatible with Next.js API routes
 *
 * @example
 * // Example usage in Next.js API route:
 * // GET /api/endpoint
 * // Response: OK!
 *
 * @throws {Error} May throw if NextResponse creation fails
 */
export async function GET() {
  return new NextResponse('OK!', {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
