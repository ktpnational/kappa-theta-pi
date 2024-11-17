import { register } from '@/lib/metrics';
import { type NextRequest, NextResponse } from 'next/server';

/**
 * Handles HTTP GET requests for metrics endpoint
 * 
 * This function retrieves and returns prometheus-format metrics data. It uses the metrics
 * registry to collect all registered metrics and returns them in the prometheus text format.
 * 
 * @param {NextRequest} _request - The incoming HTTP request object (unused but required by Next.js)
 * 
 * @returns {Promise<NextResponse>} Returns a Promise that resolves to a NextResponse containing:
 *   - On success (200):
 *     - Metrics data in prometheus format
 *     - Content-Type header matching prometheus format
 *     - Cache control headers to prevent caching
 *   - On error (500): 
 *     - Error message
 *     - Plain text content type
 * 
 * @throws {Error} If metrics generation fails, catches and returns 500 response
 * 
 * @example
 * // Example successful response format:
 * // # HELP http_requests_total Total number of HTTP requests
 * // # TYPE http_requests_total counter
 * // http_requests_total{method="get"} 1234
 */
export async function GET(_request: NextRequest) {
  try {
    const metrics = await register.metrics();
    return new NextResponse(metrics, {
      status: 200,
      headers: {
        'Content-Type': register.contentType,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        Pragma: 'no-cache',
        Expires: '0',
      },
    });
  } catch (error) {
    console.error('Error generating metrics:', error);
    return new NextResponse('Error generating metrics', {
      status: 500,
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }
}
