/**
 * A tuple of unique company names, with at least one element guaranteed.
 *
 * This constant contains an array of major technology company names, processed to ensure uniqueness
 * using a Set. The type assertion guarantees that the array will always have at least one element,
 * making it safe to use in contexts where a non-empty array is required.
 *
 * The companies included are major players in various technology sectors:
 * - Search & Advertising: Google
 * - Enterprise Software: Microsoft
 * - E-commerce & Cloud: Amazon
 * - Streaming Media: Netflix, YouTube
 * - Social Media: Instagram
 * - Transportation: Uber
 * - Music Streaming: Spotify
 * - Cloud Storage: Dropbox
 * - Dating: Tinder
 * - Business Communication: Slack, Zoom
 * - E-commerce Platform: Shopify
 *
 * Technical Implementation Details:
 * - Uses Set to deduplicate entries
 * - Converted back to array using Array.from()
 * - Type asserted as [string, ...string[]] to guarantee non-empty array
 * - Exported as a constant to prevent modification
 *
 * @constant
 * @type {[string, ...string[]]} A tuple type that ensures at least one string element
 * @exports companies
 * @example
 * import { companies } from './constants/companies';
 *
 * // Access first company (always exists due to tuple type)
 * const firstCompany = companies[0];
 *
 * // Iterate over companies
 * companies.forEach(company => console.log(company));
 */
export const companies: [string, ...string[]] = Array.from(
  new Set([
    'Google',
    'Microsoft',
    'Amazon',
    'Netflix',
    'YouTube',
    'Instagram',
    'Uber',
    'Spotify',
    'Dropbox',
    'Tinder',
    'Slack',
    'Shopify',
    'Zoom',
  ]),
) as [string, ...string[]];
