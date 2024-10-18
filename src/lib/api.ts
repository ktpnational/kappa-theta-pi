import type { App } from '@/app/api/[[...route]]/route';
import { getURL } from '@/utils';
import { edenTreaty } from '@elysiajs/eden';

/**
 * Creates an API client using edenTreaty.
 *
 * This setup allows for type-safe API calls between the client and server,
 * leveraging the App type from the API route definition.
 *
 * The base URL for the API client is determined dynamically:
 * - On the server side, it uses the current window's origin
 * - On the client side, it uses the current window's origin
 * @returns {EdenTreaty<App>} - The API client.
 */
export const api = edenTreaty<App>(
  typeof window === 'undefined' ? getURL() : window.location.origin,
);
