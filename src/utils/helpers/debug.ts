/**
 * Parses the code path and returns a formatted string with the location and function name.
 *
 * @param {any} context - The context to include in the formatted string.
 * @param {Function} fnName - The function to include in the formatted string.
 * @returns {string} - The formatted string with the location and function name.
 */
// @ts-ignore
export const parseCodePath = (context: any, fnName: Function): string =>
  `location: ${process.cwd()}${__filename} @${fnName.name}: ${context}`;
