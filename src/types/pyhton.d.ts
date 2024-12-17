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

    /**
     * Returns the first element of the array.
     * Similar to Python's list.head().
     */
    head(): T;

    /**
     * Returns the rest of the array after the first element.
     * Similar to Python's list.tail().
     */
    tail(): T[];

    /**
     * Returns true if the array is non-empty.
     * Similar to Python's list.isNonEmpty().
     */
    isNonEmpty(): boolean;
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

    /**
     * Splits the string into a list of substrings.
     * Similar to Python's str.split().
     */
    split<D extends string>(delimiter: D): string[];

    /**
     * Joins a list of strings into a single string.
     * Similar to Python's str.join().
     */
    join<T extends string[]>(this: T): string;

    /**
     * Parses the string as an integer.
     * Similar to Python's int().
     */
    parseInt(): number;
  }

  interface Object {
    /**
     * Merges two objects into a new object.
     * Similar to Python's dict.merge().
     */
    merge<T extends object, U extends object>(this: T, other: U): T & U;

    /**
     * Merges multiple objects into a new object.
     * Similar to Python's dict.mergeAll().
     */
    mergeAll<T extends object[]>(objects: T): T[number];

    /**
     * Omits keys from an object based on their types.
     * Similar to Python's dict.omitByType().
     */
    omitByType<U>(this: object): Omit<this, U>;

    /**
     * Creates a deep partial copy of an object.
     * Similar to Python's dict.deepPartial().
     */
    deepPartial<T extends object>(this: T): Partial<T>;

    /**
     * Creates a deep required copy of an object.
     * Similar to Python's dict.deepRequired().
     */
    deepRequired<T extends object>(this: T): Required<T>;

    /**
     * Creates a deep read-only copy of an object.
     * Similar to Python's dict.deepReadonly().
     */
    deepReadonly<T extends object>(this: T): Readonly<T>;

    /**
     * Creates a deep mutable copy of an object.
     * Similar to Python's dict.deepMutable().
     */
    deepMutable<T extends object>(this: T): Mutable<T>;

    /**
     * Creates a deep non-nullable copy of an object.
     * Similar to Python's dict.deepNonNullable().
     */
    deepNonNullable<T extends object>(this: T): NonNullable<T>;

    /**
     * Returns all paths to the values in the object.
     * Similar to Python's dict.paths().
     */
    paths(): string[];

    /**
     * Returns the value of the object.
     * Similar to Python's dict.valueOf().
     */
    valueOf(): this;
  }

  interface Promise<T> {
    /**
     * Awaits the promise and returns its value.
     * Similar to Python's asyncio.await().
     */
    awaited(): T;
  }

  interface Object {
    /**
     * Checks if two objects are equal.
     * Similar to Python's operator.eq().
     */
    isEqual<U>(other: U): boolean;
  }

  interface ArrayConstructor {
    /**
     * Creates an array of the specified length.
     * Similar to Python's list.ofLength().
     */
    ofLength<N extends number>(length: N): ArrayOfLength<N>;

    /**
     * Creates an array filled with the specified value.
     * Similar to Python's list.fill().
     */
    fill<T, N extends number>(value: T, length: N): Fill<T, N>;
  }

  interface ObjectConstructor {
    /**
     * Requires at least one of the specified keys to be present in the object.
     * Similar to Python's dict.requireAtLeastOne().
     */
    requireAtLeastOne<T extends object, K extends keyof T>(
      obj: T,
      keys: K[],
    ): RequireAtLeastOne<T, K>;

    /**
     * Requires only one of the specified keys to be present in the object.
     * Similar to Python's dict.requireOnlyOne().
     */
    requireOnlyOne<T extends object, K extends keyof T>(obj: T, keys: K[]): RequireOnlyOne<T, K>;

    /**
     * Removes keys from the object.
     * Similar to Python's dict.without().
     */
    without<T extends object, U extends object>(obj: T, exclude: U): Without<T, U>;

    /**
     * Returns the XOR of two objects.
     * Similar to Python's dict.xor().
     */
    xor<T extends object, U extends object>(a: T, b: U): XOR<T, U>;

    /**
     * Deep picks the specified paths from the object.
     * Similar to Python's dict.deepPick().
     */
    deepPick<T extends object, P extends string>(obj: T, paths: P[]): DeepPick<T, P>;

    /**
     * Converts a union type to a tuple.
     * Similar to Python's dict.unionToTuple().
     */
    unionToTuple<T>(union: T): UnionToTuple<T>;
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

Array.prototype.head = function <T>(): T {
  return this[0];
};

Array.prototype.tail = function <T>(): T[] {
  return this.slice(1);
};

Array.prototype.isNonEmpty = function <T>(): boolean {
  return this.length > 0;
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

String.prototype.split = function <D extends string>(delimiter: D): string[] {
  return this.split(delimiter);
};

String.prototype.join = function <T extends string[]>(this: T): string {
  return this.join(this);
};

String.prototype.parseInt = function (): number {
  return Number.parseInt(this.toString(), 10);
};

// Object prototype extensions
Object.prototype.merge = function <T extends object, U extends object>(other: U): T & U {
  return { ...this, ...other };
};

Object.prototype.mergeAll = <T extends object[]>(objects: T): T[number] =>
  objects.reduce((acc, obj) => ({ ...acc, ...obj }), {});

Object.prototype.omitByType = function <U>(this: object): Omit<this, U> {
  return Object.keys(this).reduce(
    (acc, key) => {
      if (typeof this[key] !== 'object' || this[key] === null) {
        acc[key] = this[key];
      }
      return acc;
    },
    {} as Omit<this, U>,
  );
};

Object.prototype.deepPartial = function <T extends object>(this: T): Partial<T> {
  return Object.keys(this).reduce(
    (acc, key) => {
      if (typeof this[key] === 'object' && this[key] !== null) {
        acc[key] = this.deepPartial(this[key]);
      } else {
        acc[key] = this[key];
      }
      return acc;
    },
    {} as Partial<T>,
  );
};

Object.prototype.deepRequired = function <T extends object>(this: T): Required<T> {
  return Object.keys(this).reduce(
    (acc, key) => {
      if (typeof this[key] === 'object' && this[key] !== null) {
        acc[key] = this.deepRequired(this[key]);
      } else {
        acc[key] = this[key];
      }
      return acc;
    },
    {} as Required<T>,
  );
};

Object.prototype.deepReadonly = function <T extends object>(this: T): Readonly<T> {
  return Object.keys(this).reduce(
    (acc, key) => {
      if (typeof this[key] === 'object' && this[key] !== null) {
        acc[key] = this.deepReadonly(this[key]);
      } else {
        acc[key] = this[key];
      }
      return acc;
    },
    {} as Readonly<T>,
  );
};

Object.prototype.deepMutable = function <T extends object>(this: T): Mutable<T> {
  return Object.keys(this).reduce(
    (acc, key) => {
      if (typeof this[key] === 'object' && this[key] !== null) {
        acc[key] = this.deepMutable(this[key]);
      } else {
        acc[key] = this[key];
      }
      return acc;
    },
    {} as Mutable<T>,
  );
};

Object.prototype.deepNonNullable = function <T extends object>(this: T): NonNullable<T> {
  return Object.keys(this).reduce(
    (acc, key) => {
      if (typeof this[key] === 'object' && this[key] !== null) {
        acc[key] = this.deepNonNullable(this[key]);
      } else {
        acc[key] = this[key];
      }
      return acc;
    },
    {} as NonNullable<T>,
  );
};

Object.prototype.paths = function (): string[] {
  return Object.keys(this).reduce((acc, key) => {
    if (typeof this[key] === 'object' && this[key] !== null) {
      acc.push(...this.paths(this[key]));
    } else {
      acc.push(key);
    }
    return acc;
  }, [] as string[]);
};

Object.prototype.valueOf = function (): this {
  return this;
};

// Promise prototype extensions
Promise.prototype.awaited = function <T>(): T {
  return this.then((value) => value as T);
};

// Object constructor extensions
Object.ofLength = <N extends number>(length: N): ArrayOfLength<N> =>
  Array(length).fill(0) as ArrayOfLength<N>;

// Object constructor extensions
Object.requireAtLeastOne = <T extends object, K extends keyof T>(
  obj: T,
  keys: K[],
): RequireAtLeastOne<T, K> =>
  keys.reduce(
    (acc, key) => {
      if (key in obj) {
        acc[key] = obj[key];
      }
      return acc;
    },
    {} as RequireAtLeastOne<T, K>,
  );

Object.requireOnlyOne = <T extends object, K extends keyof T>(
  obj: T,
  keys: K[],
): RequireOnlyOne<T, K> =>
  keys.reduce(
    (acc, key) => {
      if (key in obj) {
        acc[key] = obj[key];
      }
      return acc;
    },
    {} as RequireOnlyOne<T, K>,
  );

Object.without = <T extends object, U extends object>(obj: T, exclude: U): Without<T, U> =>
  Object.keys(exclude).reduce(
    (acc, key) => {
      delete acc[key];
      return acc;
    },
    { ...obj } as Without<T, U>,
  );

Object.xor = <T extends object, U extends object>(a: T, b: U): XOR<T, U> =>
  Object.keys(b).reduce(
    (acc, key) => {
      if (key in a) {
        delete acc[key];
      } else {
        acc[key] = b[key];
      }
      return acc;
    },
    { ...a } as XOR<T, U>,
  );

Object.deepPick = <T extends object, P extends string>(obj: T, paths: P[]): DeepPick<T, P> =>
  paths.reduce(
    (acc, path) => {
      const keys = path.split('.');
      let current = acc;
      for (const key of keys) {
        if (typeof current === 'object' && current !== null) {
          current = current[key];
        } else {
          throw new Error(`Path ${path} is invalid`);
        }
      }
      return { ...acc, [keys[keys.length - 1]]: current };
    },
    {} as DeepPick<T, P>,
  );

Object.unionToTuple = function <T>(union: T): UnionToTuple<T> {
  return Object.keys(union).reduce(
    (acc, key) => {
      if (typeof union[key] === 'object' && union[key] !== null) {
        acc.push(...this.unionToTuple(union[key]));
      } else {
        acc.push(union[key]);
      }
      return acc;
    },
    [] as UnionToTuple<T>,
  );
};
