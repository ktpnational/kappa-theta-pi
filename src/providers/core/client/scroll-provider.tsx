'use client';

import { ReactLenis } from '@studio-freight/react-lenis';
import type * as React from 'react';

/**
 * Props interface for the SmoothScrollProvider component
 * @interface SmoothScrollProviderProps
 * @property {React.ReactNode} children - Child components to be wrapped by the smooth scroll provider
 */
interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

/**
 * Provider component that enables smooth scrolling functionality
 * @component
 * @param {SmoothScrollProviderProps} props - Component props
 * @param {React.ReactNode} props.children - Child components to be wrapped
 * @returns {JSX.Element} ReactLenis wrapper component
 *
 * @example
 * ```tsx
 * <SmoothScrollProvider>
 *   <YourComponent />
 * </SmoothScrollProvider>
 * ```
 *
 * @remarks
 * This component uses ReactLenis to provide smooth scrolling with the following options:
 * - lerp: 0.1 (Linear interpolation factor)
 * - duration: 1.5 (Animation duration in seconds)
 * - syncTouch: true (Synchronizes touch events)
 */
export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.5,
        syncTouch: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
