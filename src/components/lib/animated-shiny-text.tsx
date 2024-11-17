import React from 'react';
import type { CSSProperties, ReactNode } from 'react';

import { cn } from '@/lib/utils';

/**
 * Props interface for the AnimatedShinyText component
 * @interface AnimatedShinyTextProps
 * @property {ReactNode} children - The content to be displayed with the shiny animation effect
 * @property {string} [className] - Optional CSS class names to be applied to the component
 * @property {number} [shimmerWidth=100] - Optional width in pixels of the shimmer effect gradient. Defaults to 100px
 */
interface AnimatedShinyTextProps {
  children: ReactNode;
  className?: string;
  shimmerWidth?: number;
}

/**
 * A memoized React component that renders text with an animated shimmering effect
 * 
 * @component
 * @param {AnimatedShinyTextProps} props - The component props
 * @param {ReactNode} props.children - The content to display with the shiny animation
 * @param {string} [props.className] - Additional CSS classes to apply
 * @param {number} [props.shimmerWidth=100] - Width of the shimmer effect in pixels
 * 
 * @returns {JSX.Element} A paragraph element with animated shimmer effect applied to its text
 * 
 * @example
 * ```tsx
 * <AnimatedShinyText shimmerWidth={150}>
 *   This text will have a shimmering effect
 * </AnimatedShinyText>
 * ```
 */
export const AnimatedShinyText = React.memo(
  ({ children, className, shimmerWidth = 100 }: AnimatedShinyTextProps) => {
    return (
      <p
        style={
          {
            '--shiny-width': `${shimmerWidth}px`,
          } as CSSProperties
        }
        className={cn(
          'mx-auto max-w-md text-neutral-600/70 dark:text-neutral-400/70',

          // Shine effect
          'animate-shiny-text bg-clip-text bg-no-repeat [background-position:0_0] [background-size:var(--shiny-width)_100%] [transition:background-position_1s_cubic-bezier(.6,.6,0,1)_infinite]',

          // Shine gradient
          'bg-gradient-to-r from-transparent via-black/80 via-50% to-transparent  dark:via-white/80',

          className,
        )}
      >
        {children}
      </p>
    );
  },
);

AnimatedShinyText.displayName = 'AnimatedShinyText';
