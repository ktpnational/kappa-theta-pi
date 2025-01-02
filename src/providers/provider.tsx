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
  ScrollProvider, // Using ScrollProvider for regular scrolling
  ThemeProvider,
} from ".";

/**
 * Provider wrapper component that composes multiple context providers
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child elements to be wrapped by the providers
 * @returns {JSX.Element} Composed provider stack with children
 */
const Providers: React.FC<{
  children: ReactNode;
  session: Session | null;
}> = ({ children, session }) => {
  return (
    <>
      <ProviderStack
        providers={[
          [AuthProvider, { session }],
          [QueryProvider, {}],
          [ThemeProvider, {}],
          [ScrollProvider, {}], // Replaced SmoothScrollProvider with ScrollProvider
          [GlobalStoreProvider, {}],
          [Events, {}],
        ]}
      >
        <>
          {children}
          {/* <ModeToggle /> */}
          <TailwindIndicator />
          {/* <TelemetryInit /> */}
        </>
      </ProviderStack>
    </>
  );
};

export { Providers };

/**
 * Utility type to prevent type inference
 * @template T - The type to prevent inference for
 */
type NoInfer<T> = [T][T extends any ? 0 : 1];

/**
 * Interface for components that can accept children
 * @interface
 */
type ContainsChildren = {
  children?: ReactNode;
};

/**
 * Component that recursively composes provider components
 * @template Providers - Tuple type extending ContainsChildren
 * @param {Object} props - Component props
 * @param {Array} props.providers - Array of provider components and their props
 * @param {ReactNode} props.children - Child elements to be wrapped by the providers
 * @returns {ReactNode} Nested provider structure containing children
 */
function ProviderStack({
  providers,
  children,
}: {
  providers: Array<
    [
      React.JSXElementConstructor<any>, // Corrected type to React.JSXElementConstructor
      Record<string, any>, // Allow dynamic props
    ]
  >;
  children: ReactNode;
}) {
  let node: ReactNode = children || null;

  for (const [Provider, props] of providers) {
    node = <Provider {...props}>{node}</Provider>;
  }

  return <>{node}</>;
}
