/**
 * Extends global interfaces to add Python-like functionality.
 * This module adds Python-inspired methods and properties to JavaScript's built-in objects.
 */
declare global {
  interface Number {
    /**
     * Returns true if the number is within the given range [start, end).
     * Similar to Python's `in range()` function.
     *
     * @param start - The start of the range (inclusive)
     * @param end - The end of the range (exclusive). If omitted, start becomes 0 and this becomes the end
     * @param step - The step size between numbers in the range
     * @returns True if the number is within the range, false otherwise
     *
     * @example
     * ```ts
     * (5).inRange(10) // true - checks if 5 is in [0,10)
     * (5).inRange(1,10) // true - checks if 5 is in [1,10)
     * (6).inRange(1,10,2) // false - 6 is not reachable with step size 2
     * ```
     */
    inRange(start: number, end?: number, step?: number): boolean;

    /**
     * Rounds the number to a specified number of decimal places.
     * Similar to Python's round() function.
     *
     * @param decimals - Number of decimal places to round to (default: 0)
     * @returns The rounded number
     *
     * @example
     * ```ts
     * (3.14159).round() // 3
     * (3.14159).round(2) // 3.14
     * ```
     */
    round(decimals?: number): number;
  }

  interface Array<T> {
    /**
     * Returns the most common element in the array.
     * Similar to Python's statistics.mode() function.
     *
     * @returns The most frequent element, or undefined if array is empty
     *
     * @example
     * ```ts
     * [1,2,2,3].mode() // 2
     * [].mode() // undefined
     * ```
     */
    mode(): T | undefined;

    /**
     * Returns a new array with elements rotated by n positions.
     * Similar to Python's collections.deque.rotate() method.
     *
     * @param n - Number of positions to rotate (positive = right, negative = left)
     * @returns New array with rotated elements
     *
     * @example
     * ```ts
     * [1,2,3].rotate(1) // [3,1,2]
     * [1,2,3].rotate(-1) // [2,3,1]
     * ```
     */
    rotate(n: number): T[];

    /**
     * Returns the product of all numbers in the array.
     * Similar to math.prod() in Python.
     * Non-number elements are treated as 0.
     *
     * @returns Product of all numbers
     *
     * @example
     * ```ts
     * [1,2,3].prod() // 6
     * [2,"a",3].prod() // 0
     * ```
     */
    prod(): number;

    /**
     * Returns all possible permutations of the array.
     * Similar to Python's itertools.permutations() function.
     *
     * @param length - Length of each permutation (default: array length)
     * @returns Array of all possible permutations
     *
     * @example
     * ```ts
     * [1,2].permutations() // [[1,2], [2,1]]
     * [1,2,3].permutations(2) // [[1,2], [1,3], [2,1], [2,3], [3,1], [3,2]]
     * ```
     */
    permutations(length?: number): T[][];

    /**
     * Returns the first element of the array.
     * Similar to Python's list indexing with [0].
     *
     * @returns First element
     *
     * @example
     * ```ts
     * [1,2,3].head() // 1
     * ```
     */
    head(): T;

    /**
     * Returns the rest of the array after the first element.
     * Similar to Python's list slicing with [1:].
     *
     * @returns Array without first element
     *
     * @example
     * ```ts
     * [1,2,3].tail() // [2,3]
     * ```
     */
    tail(): T[];

    /**
     * Returns true if the array is non-empty.
     * Utility method to check for empty arrays.
     *
     * @returns True if array has elements, false otherwise
     *
     * @example
     * ```ts
     * [1,2,3].isNonEmpty() // true
     * [].isNonEmpty() // false
     * ```
     */
    isNonEmpty(): boolean;

    /**
     * Zips the array with another iterable.
     * Similar to Python's zip() function.
     *
     * @param other - Iterable to zip with
     * @returns Zipped result
     */
    zip<U extends Iterable<Array<any>>>(other: U): Zip<T, U>;
  }

  interface String {
    /**
     * Centers the string in a field of given width.
     * Similar to Python's str.center() method.
     *
     * @param width - Total width of resulting string
     * @param fillChar - Character to pad with (default: space)
     * @returns Centered string
     *
     * @example
     * ```ts
     * "hello".center(9) // "  hello  "
     * "hi".center(5, "*") // "*hi**"
     * ```
     */
    center(width: number, fillChar?: string): string;

    /**
     * Returns true if the string is a valid JavaScript identifier.
     * Similar to Python's str.isidentifier() method.
     *
     * @returns True if string is valid identifier
     *
     * @example
     * ```ts
     * "validName".isIdentifier() // true
     * "123invalid".isIdentifier() // false
     * ```
     */
    isIdentifier(): boolean;

    /**
     * Partitions the string at the first occurrence of the separator.
     * Similar to Python's str.partition() method.
     *
     * @param separator - String to split on
     * @returns Tuple of [before, separator, after]
     *
     * @example
     * ```ts
     * "a,b,c".partition(",") // ["a", ",", "b,c"]
     * "abc".partition(",") // ["abc", "", ""]
     * ```
     */
    partition(separator: string): [string, string, string];

    /**
     * Splits the string into a list of substrings.
     * Similar to Python's str.split() method.
     *
     * @param delimiter - String to split on
     * @returns Array of substrings
     *
     * @example
     * ```ts
     * "a,b,c".split(",") // ["a", "b", "c"]
     * ```
     */
    split<D extends string>(delimiter: D): string[];

    /**
     * Joins a list of strings into a single string.
     * Similar to Python's str.join() method.
     *
     * @returns Joined string
     *
     * @example
     * ```ts
     * ["a","b","c"].join() // "abc"
     * ```
     */
    join<T extends string[]>(this: T): string;

    /**
     * Parses the string as an integer.
     * Similar to Python's int() function.
     *
     * @returns Parsed integer
     *
     * @example
     * ```ts
     * "123".parseInt() // 123
     * ```
     */
    parseInt(): number;
  }

  interface Object {
    /**
     * Merges two objects into a new object.
     * Similar to Python's dict.update() method.
     *
     * @param other - Object to merge with
     * @returns Merged object
     *
     * @example
     * ```ts
     * {a:1}.merge({b:2}) // {a:1, b:2}
     * ```
     */
    merge<T extends object, U extends object>(this: T, other: U): T & U;

    /**
     * Merges multiple objects into a new object.
     * Similar to Python's dict.update() with multiple arguments.
     *
     * @param objects - Array of objects to merge
     * @returns Merged object
     */
    mergeAll<T extends object[]>(objects: T): T[number];

    /**
     * Omits keys from an object based on their types.
     * Utility method for type-based filtering.
     *
     * @returns Object without specified types
     */
    omitByType<U>(this: object): Omit<this, U>;

    /**
     * Creates a deep partial copy of an object.
     * Makes all properties optional recursively.
     *
     * @returns Deep partial object
     */
    deepPartial<T extends object>(this: T): Partial<T>;

    /**
     * Creates a deep required copy of an object.
     * Makes all properties required recursively.
     *
     * @returns Deep required object
     */
    deepRequired<T extends object>(this: T): Required<T>;

    /**
     * Creates a deep read-only copy of an object.
     * Makes all properties readonly recursively.
     *
     * @returns Deep readonly object
     */
    deepReadonly<T extends object>(this: T): Readonly<T>;

    /**
     * Creates a deep mutable copy of an object.
     * Makes all properties mutable recursively.
     *
     * @returns Deep mutable object
     */
    deepMutable<T extends object>(this: T): Mutable<T>;

    /**
     * Creates a deep non-nullable copy of an object.
     * Removes null and undefined recursively.
     *
     * @returns Deep non-nullable object
     */
    deepNonNullable<T extends object>(this: T): NonNullable<T>;

    /**
     * Returns all paths to the values in the object.
     * Gets array of dot-notation paths.
     *
     * @returns Array of path strings
     */
    paths(): string[];

    /**
     * Returns the value of the object.
     * Similar to Python's object.__str__().
     *
     * @returns Object value
     */
    valueOf(): this;

    /**
     * Zips the object with another iterable.
     * Similar to Python's zip() function.
     *
     * @param other - Iterable to zip with
     * @returns Zipped result
     */
    zip<U extends Iterable<Object<string, unknown>>>(other: U): Zip<T, U>;
  }

  interface Promise<T> {
    /**
     * Awaits the promise and returns its value.
     * Similar to Python's asyncio.await().
     *
     * @returns Resolved value
     */
    awaited(): T;
  }

  interface Object {
    /**
     * Checks if two objects are equal.
     * Similar to Python's operator.eq().
     *
     * @param other - Object to compare with
     * @returns True if equal
     */
    isEqual<U>(other: U): boolean;
  }

  interface ArrayConstructor {
    /**
     * Creates an array of the specified length.
     * Similar to Python's [None] * n.
     *
     * @param length - Length of array
     * @returns Array of specified length
     */
    ofLength<N extends number>(length: N): ArrayOfLength<N>;

    /**
     * Creates an array filled with the specified value.
     * Similar to Python's [value] * n.
     *
     * @param value - Value to fill array with
     * @param length - Length of array
     * @returns Filled array
     */
    fill<T, N extends number>(value: T, length: N): Fill<T, N>;
  }

  interface ObjectConstructor {
    /**
     * Requires at least one of the specified keys to be present.
     * Type utility for partial required properties.
     *
     * @param obj - Source object
     * @param keys - Required keys
     * @returns Object with at least one key
     */
    requireAtLeastOne<T extends object, K extends keyof T>(
      obj: T,
      keys: K[],
    ): RequireAtLeastOne<T, K>;

    /**
     * Requires only one of the specified keys to be present.
     * Type utility for mutually exclusive properties.
     *
     * @param obj - Source object
     * @param keys - Exclusive keys
     * @returns Object with exactly one key
     */
    requireOnlyOne<T extends object, K extends keyof T>(obj: T, keys: K[]): RequireOnlyOne<T, K>;

    /**
     * Removes keys from the object.
     * Similar to Python's dict comprehension filtering.
     *
     * @param obj - Source object
     * @param exclude - Keys to exclude
     * @returns Filtered object
     */
    without<T extends object, U extends object>(obj: T, exclude: U): Without<T, U>;

    /**
     * Returns the XOR of two objects.
     * Gets properties present in one object but not both.
     *
     * @param a - First object
     * @param b - Second object
     * @returns XOR result
     */
    xor<T extends object, U extends object>(a: T, b: U): XOR<T, U>;

    /**
     * Deep picks the specified paths from the object.
     * Gets nested properties by dot notation paths.
     *
     * @param obj - Source object
     * @param paths - Dot notation paths
     * @returns Object with picked paths
     */
    deepPick<T extends object, P extends string>(obj: T, paths: P[]): DeepPick<T, P>;

    /**
     * Converts a union type to a tuple.
     * Type utility for union to array conversion.
     *
     * @param union - Union type
     * @returns Tuple type
     */
    unionToTuple<T>(union: T): UnionToTuple<T>;
  }

  interface Set<T> {
    /**
     * Iterator implementation.
     * Required for for...of loops.
     */
    [Symbol.iterator](): IterableIterator<T>;

    /**
     * Returns intersection of two sets.
     * Similar to Python's set intersection.
     *
     * @param other - Set to intersect with
     * @returns Intersection set
     */
    intersection(other: Set<T>): Set<T>;

    /**
     * Returns union of two sets.
     * Similar to Python's set union.
     *
     * @param other - Set to union with
     * @returns Union set
     */
    union(other: Set<T>): Set<T>;

    /**
     * Returns difference of two sets.
     * Similar to Python's set difference.
     *
     * @param other - Set to subtract
     * @returns Difference set
     */
    difference(other: Set<T>): Set<T>;

    /**
     * Returns symmetric difference of two sets.
     * Similar to Python's set symmetric_difference.
     *
     * @param other - Set to compare
     * @returns Symmetric difference
     */
    symmetricDifference(other: Set<T>): Set<T>;

    /**
     * Zips the set with another iterable.
     * Similar to Python's zip() function.
     *
     * @param other - Iterable to zip with
     * @returns Zipped result
     */
    zip<U extends Iterable<Set<any>>>(other: U): Zip<T, U>;
  }

  interface Iterable<T> {
    /**
     * Zips the iterable with another iterable.
     * Similar to Python's zip() function.
     *
     * @param other - Iterable to zip with
     * @returns Zipped result
     */
    zip<U extends Iterable<any>>(other: U): Zip<T, U>;

    /**
     * Iterator implementation.
     * Required for for...of loops.
     */
    [Symbol.iterator](): IterableIterator<T>;
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
  const factor = 10 ** decimals;
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

Promise.prototype.awaited = function <T>(): T {
  return this.then((value) => value as T);
};

Object.prototype.ofLength = <N extends number>(length: N): ArrayOfLength<N> =>
  Array(length).fill(0) as ArrayOfLength<N>;

Object.prototype.requireAtLeastOne = <T extends object, K extends keyof T>(
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

Object.prototype.requireOnlyOne = <T extends object, K extends keyof T>(
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

Object.prototype.without = <T extends object, U extends object>(
  obj: T,
  exclude: U,
): Without<T, U> =>
  Object.keys(exclude).reduce(
    (acc, key) => {
      delete acc[key];
      return acc;
    },
    { ...obj } as Without<T, U>,
  );

Object.prototype.xor = <T extends object, U extends object>(a: T, b: U): XOR<T, U> =>
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

Object.prototype.deepPick = <T extends object, P extends string>(
  obj: T,
  paths: P[],
): DeepPick<T, P> =>
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

Object.prototype.unionToTuple = function <T>(union: T): UnionToTuple<T> {
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

Set.prototype.intersection = function <T>(other: Set<T>): Set<T> {
  const result = new Set<T>();
  for (const item of other) {
    if (this.has(item)) result.add(item);
  }
  return result;
};

Set.prototype.union = function <T>(other: Set<T>): Set<T> {
  const result = new Set<T>(this);
  for (const item of other) {
    result.add(item);
  }
  return result;
};

Set.prototype.difference = function <T>(other: Set<T>): PySet<T> {
  const result = new Set<T>();
  for (const item of this) {
    if (!other.has(item)) result.add(item);
  }
  return result;
};

Set.prototype.symmetricDifference = function <T>(other: Set<T>): Set<T> {
  const result = new Set<T>();
  for (const item of this) {
    if (!other.has(item)) result.add(item);
  }
  for (const item of other) {
    if (!this.has(item)) result.add(item);
  }
  return result;
};

Set.prototype[Symbol.iterator] = function <T>(): IterableIterator<T> {
  return Set.prototype[Symbol.iterator].call(this);
};

Set.prototype.zip = function <T, U>(other: U): Zip<T, U> {
  const result = new Set<T>();
  for (const item of this) {
    result.add(item);
  }
  return result;
};
