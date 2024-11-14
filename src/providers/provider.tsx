'use client';

import type { JSXElementConstructor, ReactNode } from 'react';
import {
  AuthProvider,
  Events,
  GlobalStoreProvider,
  ModeToggle,
  QueryProvider,
  SmoothScrollProvider,
  TelemetryInit,
  ThemeProvider,
} from '.';

const Providers: React.FC<
  Readonly<{
    children: React.ReactNode;
  }>
> = ({ children }) => {
  return (
    <>
      <ProviderStack
        providers={[
          [AuthProvider, {}],
          [QueryProvider, {}],
          [ThemeProvider, {}],
          [SmoothScrollProvider, {}],
          [GlobalStoreProvider, {}],
          [Events, {}],
        ]}
      >
        <>
          {children}
          <ModeToggle />
          <TelemetryInit />
        </>
      </ProviderStack>
    </>
  );
};

export { Providers };

type NoInfer<T> = [T][T extends any ? 0 : 1];

type ContainsChildren = {
  children?: React.ReactNode;
};

function ProviderStack<Providers extends [ContainsChildren, ...ContainsChildren[]]>({
  providers,
  children,
}: {
  providers: {
    [k in keyof Providers]: [
      JSXElementConstructor<Providers[k]>,
      Omit<NoInfer<Providers[k]>, 'children'>,
    ];
  };
  children: ReactNode;
}) {
  let node = children;

  for (const [Provider, props] of providers) {
    node = <Provider {...props}>{node}</Provider>;
  }

  return node;
}
