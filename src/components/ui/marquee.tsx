'use client';

import { cn } from '@/lib/utils';

/**
 * Interface for Marquee component props
 * @interface MarqueeProps
 * @property {string} [className] - Optional CSS class name to apply additional styles
 * @property {boolean} [reverse] - Optional flag to reverse the marquee animation direction
 * @property {boolean} [pauseOnHover=false] - Optional flag to pause animation on hover
 * @property {React.ReactNode} [children] - Optional child elements to display in the marquee
 * @property {any} [key: string] - Additional props passed to the root div element
 */
interface MarqueeProps {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children?: React.ReactNode;
  [key: string]: any;
}

/**
 * Marquee component that creates an infinitely scrolling content container
 *
 * @component
 * @param {MarqueeProps} props - Component props
 * @param {string} [props.className] - Additional CSS classes to apply to the container
 * @param {boolean} [props.reverse] - When true, scrolls content from left to right instead of right to left
 * @param {boolean} [props.pauseOnHover=false] - When true, pauses the animation when user hovers over the marquee
 * @param {React.ReactNode} [props.children] - Content to display in the scrolling marquee
 * @param {...any} props - Additional props are spread to the root div element
 *
 * @example
 * ```jsx
 * <Marquee pauseOnHover className="py-4">
 *   <div>Scrolling Item 1</div>
 *   <div>Scrolling Item 2</div>
 * </Marquee>
 * ```
 *
 * @remarks
 * The component creates a continuous scrolling effect by duplicating the children
 * and animating them using CSS animations. It uses CSS custom properties for
 * configuration:
 * - --duration: Animation duration (default 40s)
 * - --gap: Gap between items (default 2rem)
 *
 * @returns {React.JSX.Element} Rendered marquee component
 */

export const Marquee = ({
  className,
  reverse,
  pauseOnHover = false,
  children,
  ...props
}: MarqueeProps) => {
  return (
    <div
      {...props}
      className={cn(
        'group flex overflow-hidden [--duration:40s] [--gap:2rem] [gap:var(--gap)]',
        className,
      )}
    >
      {Array(2)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={cn('flex shrink-0 justify-around items-center [gap:var(--gap)]', {
              'animate-marquee': !reverse,
              'animate-marquee-reverse': reverse,
              'group-hover:[animation-play-state:paused]': pauseOnHover,
            })}
          >
            {children}
          </div>
        ))}
    </div>
  );
};
