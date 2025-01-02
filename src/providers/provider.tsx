"use client";

import { TailwindIndicator } from "@/components";
import type { Session } from "next-auth";
import * as React from "react";
import type { ReactNode } from "react";
import {
  AuthProvider,
  Events,
  GlobalStoreProvider,
  QueryProvider,
  ScrollProvider,
  ThemeProvider,
} from ".";

/**
 * Provider wrapper component that composes multiple context providers
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child elements to be wrapped
 */
const Providers: React.FC<{
  children: ReactNode;
  session: Session | null;
}> = ({ children, session }) => {
  return (
    <ProviderStack
      providers={[
        [AuthProvider, { session }],
        [QueryProvider, {}],
        [ThemeProvider, {}],
        [ScrollProvider, {}],
        [GlobalStoreProvider, {}],
        [Events, {}],
      ]}
    >
      <>
        {children}
        <TailwindIndicator />
      </>
    </ProviderStack>
  );
};

export { Providers };

// Remove or comment out if not using:
// ---------------------------------------------------------
// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// type NoInfer<T> = [T][T extends any ? 0 : 1];
//
// type ContainsChildren = {
//   children?: ReactNode;
// };
// ---------------------------------------------------------

/**
 * Component that recursively composes provider components
 *
 * @param providers - An array of [Provider, props] tuples
 * @param children - Child elements to be wrapped by the providers
 */
function ProviderStack({
  providers,
  children,
}: {
  providers: Array<[React.JSXElementConstructor<any>, Record<string, any>]>;
  children: ReactNode;
}) {
  let node: ReactNode = children || null;

  for (const [Provider, props] of providers) {
    node = <Provider {...props}>{node}</Provider>;
  }

  return <>{node}</>;
}
