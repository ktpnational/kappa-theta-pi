'use client';

import type * as React from 'react';

interface ScrollProviderProps {
  children: React.ReactNode;
}

/**
 * Regular scroll provider that simply renders children without any smooth scroll functionality.
 * I removed everything due to some lagging still happening
 * @component
 * @param {ScrollProviderProps} props - Component props
 * @param {React.ReactNode} props.children - Child components to be rendered
 * @returns {JSX.Element} A wrapper for regular scrolling
 */
export function ScrollProvider({ children }: ScrollProviderProps) {
  return <>{children}</>;
}
