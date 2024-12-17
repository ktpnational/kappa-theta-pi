'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useMemo,
  type ReactNode,
} from 'react';
import { motion, useScroll, useSpring } from 'motion/react';

/**
 * Configuration interface for smooth scrolling
 */
export interface SmoothScrollConfig {
  stiffness?: number;
  damping?: number;
  mass?: number;
  restSpeed?: number;
  restDelta?: number;

  scrollAxis?: 'vertical' | 'horizontal' | 'both';
  scrollDirection?: 'normal' | 'reversed';

  preventOverscroll?: boolean;
  disableOnInput?: boolean;
  ignoredElements?: string[];
}

const DEFAULT_CONFIG: SmoothScrollConfig = {
  stiffness: 300,
  damping: 30,
  mass: 1,
  restSpeed: 0.5,
  restDelta: 0.5,
  scrollAxis: 'vertical',
  scrollDirection: 'normal',
  preventOverscroll: true,
  disableOnInput: false,
  ignoredElements: ['input', 'textarea', 'select', 'button'],
};

const SmoothScrollContext = createContext<{
  scrollTo: (target: number | HTMLElement, options?: Partial<SmoothScrollConfig>) => void;
}>({
  scrollTo: () => { },
});

/**
 * Smooth Scroll Provider Component
 * @param {React.PropsWithChildren} props - Component props
 * @param {React.ReactNode} props.children - Child components that will have access to the smooth scroll functionality
 * @returns {React.JSX.Element} SmoothScrollProvider component wrapping the children with the smooth scroll context
 * @example
 * ```tsx
 * <SmoothScrollProvider>
 *   <App />
 * </SmoothScrollProvider>
 * ```
 */
export function SmoothScrollProvider({
  children,
  config = {},
}: {
  children: ReactNode;
  config?: SmoothScrollConfig;
}) {
  // Merge default config with provided config
  const mergedConfig = useMemo(
    () => ({
      ...DEFAULT_CONFIG,
      ...config,
    }),
    [config]
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  // Create a spring-based scroll output
  const smoothScrollY = useSpring(scrollY, {
    stiffness: mergedConfig.stiffness,
    damping: mergedConfig.damping,
    mass: mergedConfig.mass,
    restSpeed: mergedConfig.restSpeed,
    restDelta: mergedConfig.restDelta,
  });

  const scrollTo = (target: number | HTMLElement, overrideConfig?: Partial<SmoothScrollConfig>) => {
    // Merge any override config
    const currentConfig = { ...mergedConfig, ...overrideConfig };

    if (!containerRef.current) return;

    // Calculate target position
    const targetPosition =
      typeof target === 'number'
        ? target
        : target.getBoundingClientRect().top + window.scrollY;

    // Apply scroll direction
    const adjustedPosition =
      currentConfig.scrollDirection === 'reversed'
        ? document.documentElement.scrollHeight - targetPosition
        : targetPosition;

    // Prevent overscroll if configured
    if (currentConfig.preventOverscroll) {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      window.scrollTo({
        top: Math.min(Math.max(0, adjustedPosition), maxScroll),
        behavior: 'smooth',
      });
    } else {
      window.scrollTo({
        top: adjustedPosition,
        behavior: 'smooth',
      });
    }
  };

  // Custom scroll prevention logic
  const shouldPreventScroll = (e: Event) => {
    if (!mergedConfig.disableOnInput) return false;

    const target = e.target as HTMLElement;
    return mergedConfig.ignoredElements?.some((selector) => target.matches(selector)) || false;
  };

  // Add event listeners for scroll prevention
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (shouldPreventScroll(e) || mergedConfig.scrollAxis !== 'vertical') return;
      e.preventDefault();
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (shouldPreventScroll(e) || mergedConfig.scrollAxis !== 'vertical') return;
      e.preventDefault();
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [mergedConfig]);

  return (
    <SmoothScrollContext.Provider value={{ scrollTo }}>
      <div ref={containerRef}>
        <motion.div style={{ y: smoothScrollY }}>
          {children}
        </motion.div>
      </div>
    </SmoothScrollContext.Provider>
  );
}

/**
 * Hook to access smooth scroll functionality
 * @returns {SmoothScrollContext} SmoothScrollContext - The smooth scroll context
 * @example
 * ```tsx
 * const { scrollTo } = useSmoothScroll();
 * ```
 */
export function useSmoothScroll() {
  return useContext(SmoothScrollContext);
}
