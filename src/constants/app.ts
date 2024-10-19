/**
 * A utility type that makes all properties of an object required, recursively.
 * @template T - The type to make deeply required.
 */
type DeepRequired<T> = T extends object
  ? {
      [K in keyof T]-?: DeepRequired<T[K]>;
    }
  : T;

/**
 * Application constants.
 * @type {
 *  DeepRequired<
 *    Readonly<
 *      {
 *        name: string;
 *        url: string;
 *        email: string;
 *        description: string
 *      }
 *    >
 *  >
 * }
 */
export const app: DeepRequired<
  Readonly<{
    name: string;
    url: string;
    email: string;
    description: string;
  }>
> = {
  name: 'Kappa Theta Pi - National',
  url: 'https://www.kappathetapi.org/',
  email: 'contact@kappathetapi.org',
  description:
    'Kappa Theta Pi (ΚΘΠ, also known as KTP) is a co-ed professional fraternity specializing in the field of information technology. The goals of the fraternity are to create bonds between students of Informatics, computer science, business, design, computer engineering, Information, and any others who are interested in technology, to develop networks through facilitation of professional and social growth, and to expose members to career options in the technology field.',
};
