import * as React from 'react';

/**
 * The breakpoint width in pixels below which the viewport is considered mobile-sized.
 * Viewport widths less than this value will be considered mobile, while widths greater
 * than or equal to this will be considered non-mobile.
 */
const MOBILE_BREAKPOINT = 768;

/**
 * A React hook that detects whether the current viewport width is mobile-sized.
 *
 * This hook uses the MediaQueryList API to efficiently detect viewport size changes
 * and updates its value accordingly. It considers viewports narrower than
 * {@link MOBILE_BREAKPOINT} to be mobile-sized.
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const isMobile = useIsMobile();
 *   return (
 *     <div>
 *       Current viewport is: {isMobile ? 'mobile' : 'desktop'}
 *     </div>
 *   );
 * }
 * ```
 *
 * @returns {boolean} True if the current viewport width is less than {@link MOBILE_BREAKPOINT},
 *                    false otherwise. The initial value will be based on the viewport width
 *                    when the component mounts.
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener('change', onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return !!isMobile;
}
