/**
 * Extends global interfaces to add Python-like functionality
 */
declare global {
  interface Number {
    /**
     * Returns true if the number is within the given range [start, end).
     * Similar to Python's `in range()`.
     */
    inRange(start: number, end?: number, step?: number): boolean;

    /**
     * Rounds the number to a specified number of decimal places.
     * Similar to Python's round().
     */
    round(decimals?: number): number;
  }

  interface Array<T> {
    /**
     * Returns the most common element in the array.
     * Similar to Python's statistics.mode().
     */
    mode(): T | undefined;

    /**
     * Returns a new array with elements rotated by n positions.
     * Similar to Python's collections.deque.rotate().
     */
    rotate(n: number): T[];

    /**
     * Returns the product of all numbers in the array.
     * Similar to math.prod() in Python.
     */
    prod(): number;

    /**
     * Returns all possible permutations of the array.
     * Similar to Python's itertools.permutations().
     */
    permutations(length?: number): T[][];
  }

  interface String {
    /**
     * Centers the string in a field of given width.
     * Similar to Python's str.center().
     */
    center(width: number, fillChar?: string): string;

    /**
     * Returns true if the string is a valid identifier.
     * Similar to Python's str.isidentifier().
     */
    isIdentifier(): boolean;

    /**
     * Partitions the string at the first occurrence of the separator.
     * Similar to Python's str.partition().
     */
    partition(separator: string): [string, string, string];
  }
}

// Number prototype extensions
Number.prototype.inRange = function (start: number, end?: number, step = 1): boolean {
  if (end === undefined) {
    end = start;
    start = 0;
  }
  const value = Number(this);
  return value >= start && value < end && (value - start) % step === 0;
};

Number.prototype.round = function (decimals = 0): number {
  const factor = Math.pow(10, decimals);
  return Math.round(Number(this) * factor) / factor;
};

// Array prototype extensions
Array.prototype.mode = function <T>(): T | undefined {
  if (this.length === 0) return undefined;

  const counts = new Map<T, number>();
  let maxCount = 0;
  let maxElement: T | undefined;

  for (const item of this) {
    const count = (counts.get(item) || 0) + 1;
    counts.set(item, count);
    if (count > maxCount) {
      maxCount = count;
      maxElement = item;
    }
  }

  return maxElement;
};

Array.prototype.rotate = function <T>(n: number): T[] {
  const len = this.length;
  if (len === 0) return [];

  n = ((n % len) + len) % len; // Normalize rotation amount
  return [...this.slice(len - n), ...this.slice(0, len - n)];
};

Array.prototype.prod = function (): number {
  return this.reduce((acc, val) => acc * (typeof val === 'number' ? val : 0), 1);
};

Array.prototype.permutations = function <T>(length?: number): T[][] {
  const arr = [...this];
  length = length || arr.length;

  if (length > arr.length) return [];
  if (length === 1) return arr.map((value) => [value]);

  const result: T[][] = [];

  for (let i = 0; i < arr.length; i++) {
    const current = arr[i];
    const remaining = [...arr.slice(0, i), ...arr.slice(i + 1)];
    const remainingPerms = remaining.permutations(length - 1);

    for (const perm of remainingPerms) {
      result.push([current, ...perm]);
    }
  }

  return result;
};

// String prototype extensions
String.prototype.center = function (width: number, fillChar = ' '): string {
  if (width <= this.length) return this.toString();

  const leftPad = Math.floor((width - this.length) / 2);
  const rightPad = width - this.length - leftPad;

  return fillChar.repeat(leftPad) + this + fillChar.repeat(rightPad);
};

String.prototype.isIdentifier = function (): boolean {
  return /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(this);
};

String.prototype.partition = function (separator: string): [string, string, string] {
  const index = this.indexOf(separator);

  if (index === -1) {
    return [this.toString(), '', ''];
  }

  return [this.slice(0, index), separator, this.slice(index + separator.length)];
};
