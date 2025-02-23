import { logger } from "@/utils";

// Fallback success and failure functions in case they are missing
export const success = <T>(value: T) => ({ success: true, value });
export const failure = (error: Error) => ({ success: false, error });

/**
 * Returns the base URL for the app.
 * Falls back to `http://localhost:3000` if `NEXT_PUBLIC_BASE_URL` is not set.
 */
export function getURL(): string {
  return process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
}

/**
 * Parses the function name and context.
 * This avoids using Node.js `path` module to stay compatible with Edge Runtime.
 */
export const parseCodePath = (context: any, fnName: Function): string => {
  return `location: [unknown file] @${fnName.name}: ${context}`;
};

/**
 * A utility to wrap async functions in a try-catch block.
 * Logs errors and returns a standardized response.
 */
export const catchError = async <Args extends any[], ReturnType>(
  asyncFunction: (...args: Args) => Promise<ReturnType>,
  ...args: Args
): Promise<{ success: boolean; value?: ReturnType; error?: Error }> => {
  const log = logger.getSubLogger({ prefix: ["utils", "helpers", "catchError"] });

  try {
    const result = await asyncFunction(...args);
    return success(result);
  } catch (error) {
    log.error("catchError", { error });
    return failure(error as Error);
  }
};
