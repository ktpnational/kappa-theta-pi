/**
 * Converts an object to a JSON string with indentation.
 *
 * @param {any} obj - The object to stringify.
 * @returns {string} - The JSON string representation of the object.
 */
export const Stringify = (obj: any): string => {
  return JSON.stringify(obj, null, 2);
};

/**
 * Constructs a URL based on the provided path and environment variables.
 *
 * @param {string} [path=''] - The path to append to the base URL.
 * @returns {string} - The constructed URL.
 */
export const getURL = (path = ''): string => {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL && process.env.NEXT_PUBLIC_SITE_URL.trim() !== ''
      ? process.env.NEXT_PUBLIC_SITE_URL
      : process?.env?.NEXT_PUBLIC_VERCEL_URL && process.env.NEXT_PUBLIC_VERCEL_URL.trim() !== ''
        ? process.env.NEXT_PUBLIC_VERCEL_URL
        : 'http://localhost:3000/';

  url = url.replace(/\/+$/, '');
  url = url.includes('http') ? url : `https://${url}`;
  path = path.replace(/^\/+/, '');

  return path ? `${url}/${path}` : url;
};

/**
 * Scrolls to the center of the specified element.
 *
 * @param {string} href - The selector of the element to scroll to.
 */
export const ScrollIntoCenterView = (href: string) => {
  const element = document.querySelector(href);
  if (element) {
    const elementRect = element.getBoundingClientRect();
    const absoluteElementTop = elementRect.top + window.scrollY;
    const middle =
      absoluteElementTop + Math.floor(elementRect.height / 2) - Math.floor(window.innerHeight / 2);
    window.scrollTo({
      top: middle,
      behavior: 'smooth',
    });
  }
};

/**
 * Converts a string to a URL-friendly slug.
 *
 * @param {string} text - The text to slugify.
 * @returns {string} - The slugified text.
 */
export const Slugify = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
};

/**
 * Creates a debounced function that delays invoking the provided function until after the specified time has elapsed.
 *
 * @param {Function} fn - The function to debounce.
 * @param {number} [time=300] - The number of milliseconds to delay.
 * @returns {Function} - The debounced function.
 */
export const debounce = (fn: Function, time = 300): Function => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn.apply(this, args);
    }, time);
  };
};

/**
 * Capitalizes the first letter of a string.
 *
 * @param {string} text - The text to capitalize.
 * @returns {string} - The capitalized text.
 */
export const Capitalize = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

/**
 * Checks if an object is empty.
 *
 * @param {any} obj - The object to check.
 * @returns {boolean} - True if the object is empty, false otherwise.
 */
export const IsObjectEmpty = (obj: any): boolean => {
  return Object.keys(obj).length === 0;
};

/**
 * Checks if an array is empty.
 *
 * @param {any[]} arr - The array to check.
 * @returns {boolean} - True if the array is empty, false otherwise.
 */
export const IsArrayEmpty = (arr: any[]): boolean => {
  return arr.length === 0;
};

/**
 * Checks if a string is empty.
 *
 * @param {string} str - The string to check.
 * @returns {boolean} - True if the string is empty, false otherwise.
 */
export const IsStringEmpty = (str: string): boolean => {
  return str.trim() === '';
};

/**
 * Checks if a value is a string.
 *
 * @param {any} str - The value to check.
 * @returns {boolean} - True if the value is a string, false otherwise.
 */
export const IsString = (str: any): boolean => {
  return typeof str === 'string';
};

const EMPTY = Symbol('EMPTY') as any;

/**
 * Generates a default cache key based on the provided arguments.
 *
 * @param {...any[]} args - The arguments to generate the cache key from.
 * @returns {string} - The generated cache key.
 */
function defaultCacheKey(...args: any[]): string {
  if (args.length === 0) {
    return EMPTY;
  }

  if (args.length === 1) {
    const arg = args[0];

    if (
      typeof arg === 'string' ||
      typeof arg === 'number' ||
      typeof arg === 'boolean' ||
      typeof arg === 'symbol' ||
      arg === null ||
      arg === undefined
    ) {
      return arg;
    }

    if (Array.isArray(arg)) {
      return arg.map((x) => defaultCacheKey(x)).join(',');
    }

    if (typeof arg === 'object') {
      return JSON.stringify(arg);
    }
  }

  return JSON.stringify(args);
}

/**
 * Memoizes a function, caching its results based on the provided cache key function.
 *
 * @template T
 * @param {T} fn - The function to memoize.
 * @param {(...args: Parameters<T>) => string} [cacheKey=defaultCacheKey] - The function to generate cache keys.
 * @returns {T} - The memoized function.
 */
export function memoize<T extends (...args: any[]) => any>(
  fn: T,
  cacheKey: (...args: Parameters<T>) => string = defaultCacheKey,
): T {
  const cache = new Map<string, ReturnType<T>>();

  return ((...args: Parameters<T>) => {
    const key = cacheKey(...args);

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = fn(...args);
    cache.set(key, result);

    return result;
  }) as T;
}
