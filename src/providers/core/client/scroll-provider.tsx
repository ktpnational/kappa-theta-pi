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
 * - lerp: 0.075 (Reduced from 0.1 for smoother interpolation)
 * - duration: 1.2 (Slightly reduced for more responsive feel)
 * - smoothWheel: true (Enable smooth mousewheel scrolling)
 * - syncTouch: true (Keep touch sync enabled)
 * - syncTouchLerp: 0.075 (Match the main lerp value)
 * - touchInertiaMultiplier: 35 (Add some inertia to touch scrolling)
 * - wheelMultiplier: 1.15 (Slightly increase wheel sensitivity)
 * - orientation: 'vertical' (Ensure vertical scrolling is prioritized)
 * - gestureOrientation: 'vertical' (Match gesture orientation)
 * - infinite: false (Disable infinite scroll)
 */
export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.075,
        duration: 1.2,
        smoothWheel: true,
        syncTouch: true,
        syncTouchLerp: 0.075,
        touchInertiaMultiplier: 35,
        wheelMultiplier: 1.15,
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        infinite: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}
