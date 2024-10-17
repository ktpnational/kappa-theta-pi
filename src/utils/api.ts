import { Errors } from '@sinclair/typebox/errors';
import type { Static, TSchema } from '@sinclair/typebox/type';
import { Check } from '@sinclair/typebox/value';

/**
 * Parses a value against a TypeBox schema and throws an error if invalid.
 * @param schema The TypeBox schema to validate against.
 * @param value The value to validate.
 * @returns The validated value.
 * @throws Error if the value is invalid according to the schema.
 */
export const parse = <T extends TSchema>(schema: T, value: unknown): Static<T> => {
  const check = Check(schema, value);
  if (!check) throw new Error(Errors(schema, value).First()?.message);
  return value;
};

/**
 * Simplifies the response from Elysia to extract the DATA or throw an error.
 * @param response The response from Elysia.
 * @returns The data from the response.
 * @throws Error if the response is not ok.
 */
export function handleEden<T>(
  response: (
    | {
        data: T;
        error: null;
      }
    | {
        data: null;
        error: EdenFetchError<number, string>;
      }
  ) & {
    status: number;
    response: Record<number, unknown>;
    headers: Record<string, string>;
  },
): T {
  if (response.error) throw response.error;
  return response.data;
}
