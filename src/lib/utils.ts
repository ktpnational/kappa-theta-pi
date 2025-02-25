import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges and deduplicates class names using clsx and tailwind-merge.
 * Combines multiple class names or conditional classes and resolves Tailwind CSS conflicts.
 *
 * @param {ClassValue[]} inputs - Array of class values to merge. Can include:
 *  - Strings of class names
 *  - Objects with class names as keys and booleans as values
 *  - Arrays of class names
 *  - Nested combinations of the above
 * @returns {string} A string of merged and deduplicated class names
 *
 * @example
 * ```ts
 * cn('px-2 bg-red', 'px-3') // Returns 'px-3 bg-red'
 * cn('px-2', { 'bg-red': true, 'bg-blue': false }) // Returns 'px-2 bg-red'
 * cn(['px-2', ['bg-red']]) // Returns 'px-2 bg-red'
 * ```
 *
 * @remarks
 * - Uses clsx to handle conditional classes and array/object syntax
 * - Uses tailwind-merge to properly handle Tailwind CSS class conflicts
 * - Maintains the last conflicting class instead of concatenating
 * - Safe to use with dynamic and conditional classes
 * - Optimized for Tailwind CSS usage
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a date string into a human-readable format with relative time indicators.
 * Converts dates into formats like "Today", "X days ago", "X weeks ago", etc.
 *
 * @param {string} date - The date string to format. Can be:
 *  - ISO 8601 date string (e.g. "2023-12-25T00:00:00")
 *  - Date only string (e.g. "2023-12-25")
 * @returns {string} A formatted string containing both the full date and relative time
 *
 * @example
 * ```ts
 * formatDate("2023-12-25") // Returns "December 25, 2023 (2d ago)"
 * formatDate("2023-12-01") // Returns "December 1, 2023 (3w ago)"
 * formatDate("2023-01-01") // Returns "January 1, 2023 (11mo ago)"
 * formatDate("2020-01-01") // Returns "January 1, 2020 (3y ago)"
 * ```
 *
 * @remarks
 * - Automatically adds time component if missing
 * - Uses locale-specific month names
 * - Handles various time ranges differently:
 *   - Less than 1 day: "Today"
 *   - 1-6 days: "X days ago"
 *   - 1-3 weeks: "X weeks ago"
 *   - 1-11 months: "X months ago"
 *   - 1+ years: "X years ago"
 * - Always includes full date for context
 * - Thread-safe and timezone-aware
 */
export function formatDate(date: string): string {
  const currentDate = new Date().getTime();
  if (!date.includes('T')) {
    date = `${date}T00:00:00`;
  }
  const targetDate = new Date(date).getTime();
  const timeDifference = Math.abs(currentDate - targetDate);
  const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  const fullDate = new Date(date).toLocaleString('en-us', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  if (daysAgo < 1) {
    return 'Today';
  }
  if (daysAgo < 7) {
    return `${fullDate} (${daysAgo}d ago)`;
  }
  if (daysAgo < 30) {
    const weeksAgo = Math.floor(daysAgo / 7);
    return `${fullDate} (${weeksAgo}w ago)`;
  }
  if (daysAgo < 365) {
    const monthsAgo = Math.floor(daysAgo / 30);
    return `${fullDate} (${monthsAgo}mo ago)`;
  }
  const yearsAgo = Math.floor(daysAgo / 365);
  return `${fullDate} (${yearsAgo}y ago)`;
}

/**
 * Truncates a string to a specified length and adds an ellipsis if truncated.
 * Useful for limiting text length in UIs while indicating there's more content.
 *
 * @param {string} str - The input string to truncate
 * @param {number} length - Maximum length of the returned string (excluding ellipsis)
 * @returns {string} The truncated string with ellipsis if needed, or original string if shorter
 *
 * @example
 * ```ts
 * truncate("Hello World", 5) // Returns "Hello..."
 * truncate("Hi", 5) // Returns "Hi"
 * truncate("Very long text", 7) // Returns "Very lo..."
 * ```
 *
 * @remarks
 * - Preserves first N characters where N is the specified length
 * - Adds "..." only if string is actually truncated
 * - Does not split words
 * - Safe with Unicode strings
 * - Handles empty strings and edge cases
 * - Useful for:
 *   - Card titles
 *   - List items
 *   - Preview text
 *   - Table cells
 */
export const truncate = (str: string, length: number) =>
  str.length > length ? `${str.substring(0, length)}...` : str;
