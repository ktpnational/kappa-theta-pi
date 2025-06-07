'use client';

import type { JSX, JSXElementConstructor, ReactNode } from 'react';

type InferProps<T> = T extends JSXElementConstructor<infer P> ? P : never;

type ProviderWithProps<T extends JSXElementConstructor<unknown>> = [
  T,
  Omit<InferProps<T>, 'children'>,
];

type InferProviderArray<T extends ReadonlyArray<JSXElementConstructor<unknown>>> = {
  [K in keyof T]: ProviderWithProps<T[K]>;
};

type ProvidersProps<T extends JSXElementConstructor<unknown>[]> = {
  children: ReactNode;
  providers: InferProviderArray<T>;
};

/**
 * Component that recursively composes provider components
 */
function ProviderStack<T extends JSXElementConstructor<any>[]>({
  providers,
  children,
}: ProvidersProps<T>): JSX.Element {
  return providers.reduceRight(
    (node, [Provider, props]) => <Provider {...props}>{node}</Provider>,
    <>{children}</>,
  );
}

/**
 * Provider wrapper component that composes multiple context providers
 */
export function Providers<T extends JSXElementConstructor<any>[]>({
  children,
  providers,
}: ProvidersProps<T>): JSX.Element {
  return <ProviderStack providers={providers} children={children} />;
}
