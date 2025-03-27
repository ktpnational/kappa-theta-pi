// Prettify - Prettifies a type by removing readonly and optional modifiers
type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

// Head - Gets the first element of an array
type Head<T extends Array<any>> = T extends [infer U, ...infer _Rest] ? U : never;

// Tail - Gets the tail of an array
type Tail<T extends any[]> = T extends [infer _U, ...infer Rest] ? Rest : never;

// Merge - Merges two objects, omitting properties from the second object that are also present in the first object
type Merge<T, U> = Prettify<Omit<T, keyof U> & U>;

// MergeAll - Merges an array of objects into a single object
type MergeAll<T> = T extends []
  ? []
  : T extends [infer Head, ...infer Tail]
    ? [Merge<Head, Tail[0]>, ...MergeAll<Tail>]
    : [T];

// NonEmptyArray - Creates a non-empty array
type NonEmptyArray<T> = [T, ...T[]];

// Split - Splits a string into an array of strings
type Split<S extends string, D extends string> = string extends S
  ? string[]
  : S extends ''
    ? []
    : S extends `${infer T}${D}${infer U}`
      ? [T, ...Split<U, D>]
      : [S];

// Join - Joins an array of strings into a single string
type Join<T> = T extends [infer F, ...infer R]
  ? R['length'] extends 0
    ? `${F & string}`
    : `${F & string}${Join<R>}`
  : never;

// ParseInt - Parses a string to a number
type ParseInt<T> = T extends `${infer N extends number}` ? N : never;

// FilterArrayToObject - Filters an array to an object based on a type
type FilterArrayToObject<T, I> = {
  [K in keyof T as T[K] extends I ? K : never]: T[K];
};

// ArrayOfLength - Creates an array of a given length
type ArrayOfLength<Length extends number, T extends unknown[] = []> = T['length'] extends Length
  ? T
  : ArrayOfLength<Length, [...T, T['length']]>;

// Fill - Fills an array to a given length
type Fill<T, Length extends number, Arr extends readonly T[] = []> = Arr['length'] extends Length
  ? Arr
  : Fill<T, Length, [T, ...Arr]>;

// GetIndex - Gets the index of an array
type GetIndex<Arr extends readonly unknown[], Index> = Index extends keyof Arr
  ? Arr[Index]
  : GetIndex<[...Arr, ...Arr], Index>;

// Flatten - Flattens an array of arrays
type Flatten<T> = T extends [infer First extends unknown[], ...infer Rest extends unknown[][]]
  ? [...First, ...Flatten<Rest>]
  : [];

// Zip - Zips two arrays together
type Zip<T extends any[], U extends any[]> = T extends [infer A, ...infer RestT]
  ? U extends [infer B, ...infer RestU]
    ? [[A, B], ...Zip<RestT, RestU>]
    : []
  : [];

// Paths - Gets all paths of an object
type Paths<T extends Record<string, any>> = keyof T extends never
  ? []
  : T extends object
    ? { [K in keyof T]: [K, ...Paths<T[K]>] }[keyof T]
    : [];

// OmitByType - Omits properties from an object based on their type
type OmitByType<T, U> = T extends object
  ? {
      [K in keyof T as T[K] extends U ? never : K]: T[K];
    }
  : never;

// DeepPartial - Makes all properties in an object and its nested objects partial
type DeepPartial<T extends object> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

// DeepRequired - Makes all properties in an object and its nested objects required
type DeepRequired<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired<T[K]> : T[K];
};

// DeepReadonly - Makes all properties in an object and its nested objects readonly
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};

// UnionToIntersection - Converts a union type to an intersection type
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void
  ? I
  : never;

// RemoveIndexSignature - Removes index signatures from a type
type RemoveIndexSignature<T> = {
  [K in keyof T as string extends K ? never : number extends K ? never : K]: T[K];
};

// DeepNonNullable - Makes all properties in an object and its nested objects non-nullable
type DeepNonNullable<T> = {
  [K in keyof T]: T[K] extends object ? DeepNonNullable<T[K]> : NonNullable<T[K]>;
};

// ValueOf - Gets the type of all values in an object
type ValueOf<T> = T[keyof T];

// RequireAtLeastOne - Makes at least one property required
type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
  }[Keys];

// RequireOnlyOne - Makes exactly one property required and the rest optional
type RequireOnlyOne<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Record<Exclude<Keys, K>, never>>;
  }[Keys];

// Awaited - Gets the type inside a Promise
type Awaited<T> = T extends Promise<infer U> ? Awaited<U> : T;

// DeepMutable - Makes all properties in an object and its nested objects mutable
type DeepMutable<T> = {
  -readonly [K in keyof T]: T[K] extends object ? DeepMutable<T[K]> : T[K];
};

// Without - Creates a type without certain properties
type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

// XOR - Creates an exclusive OR type between two types
type XOR<T, U> = T | U extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U;

// DeepPick - Like Pick but works with nested properties using dot notation
type DeepPick<T, Paths extends string> = Prettify<{
  [P in Paths as P extends `${infer Key}.${infer Rest}`
    ? Key
    : P]: P extends `${infer Key}.${infer Rest}`
    ? Key extends keyof T
      ? DeepPick<T[Key], Rest>
      : never
    : P extends keyof T
      ? T[P]
      : never;
}>;

// IsEqual - Checks if two types are exactly equal
type IsEqual<T, U> = (<G>() => G extends T ? 1 : 2) extends <G>() => G extends U ? 1 : 2
  ? true
  : false;

// UnionToTuple - Converts a union type to a tuple type
type UnionToTuple<T> = UnionToIntersection<T extends any ? () => T : never> extends () => infer A
  ? [...UnionToTuple<Exclude<T, A>>, A]
  : [];

// SVGProps - Props for SVG elements
interface SVGProps<T extends SVGElement> extends React.HTMLAttributes<T> {
  size?: import('@/components/icons/types').sizes;
}

type Decrement<N extends number> = [
  -1,
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
][N];

type ExtractNthProperty<T, N extends number> = T extends readonly [infer First, ...infer Rest]
  ? N extends 0
    ? First
    : ExtractNthProperty<Rest, Decrement<N>>
  : never;

type ExtractPropertyByName<T, K extends keyof T> = T[K];

type FirstArgument<T> = T extends (first: infer First, ...args: any[]) => any ? First : never;

type AllArguments<T> = T extends (...args: infer Args) => any ? Args : never;
