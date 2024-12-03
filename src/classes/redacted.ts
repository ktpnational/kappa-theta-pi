//redacted.ts
export class Redacted<T = string> {
  private constructor(private readonly _value: T) {}

  public static make<T>(value: T, defaultValue?: T): Redacted<T> {
    if (!value) {
      if (defaultValue !== undefined) {
        console.warn(`Value is missing. Using default: ${defaultValue}`);
        return new Redacted(defaultValue);
      }
      throw new Error("Value is required and no default was provided.");
    }
    return new Redacted(value);
  }

  public static value<T>(redacted: Redacted<T>): T {
    return redacted._value;
  }

  toString(): string {
    return `<redacted>`;
  }

  toJSON(): string {
    return `<redacted>`;
  }

  [Symbol.for("nodejs.util.inspect.custom")](): string {
    return `<redacted>`;
  }

  inspect(): string {
    return `<redacted>`;
  }
}
