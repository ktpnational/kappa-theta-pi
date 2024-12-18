/**
 * Asserts that the expected and actual values are equal.
 * @param {any} expected - The expected value.
 * @param {any} actual - The actual value.
 */
export const assert = (expected: any, actual: any): void => {
  if (typeof expected !== typeof actual) {
    throw new Error(
      `Type mismatch: Expected type ${typeof expected} but got type ${typeof actual}`,
    );
  }
  if (Array.isArray(expected) && Array.isArray(actual)) {
    if (expected.length !== actual.length) {
      throw new Error(
        `Array length mismatch: Expected length ${expected.length} but got length ${actual.length}`,
      );
    }
    for (let i = 0; i < expected.length; i++) {
      if (expected[i] !== actual[i]) {
        throw new Error(
          `Array element mismatch at index ${i}: Expected ${expected[i]} but got ${actual[i]}`,
        );
      }
    }
  } else if (expected !== actual) {
    throw new Error(`Expected ${expected} but got ${actual}`);
  }
};
