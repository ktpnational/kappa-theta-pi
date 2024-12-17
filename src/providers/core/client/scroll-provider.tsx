'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useMemo,
  type ReactNode,
} from 'react';

/**
 * Configuration interface for smooth scrolling
 */
export interface SmoothScrollConfig {
  lerp?: number;
  lerpEase?: 'linear' | 'easeInQuad' | 'easeOutQuad' | 'easeInOutQuad';

  scrollSpeed?: number;
  wheelSensitivity?: number;
  touchSensitivity?: number;

  minScrollSpeed?: number;
  maxScrollSpeed?: number;

  inertia?: boolean;
  inertiaDecay?: number;
  momentumDampening?: number;

  scrollAxis?: 'vertical' | 'horizontal' | 'both';
  scrollDirection?: 'normal' | 'reversed';

  preventOverscroll?: boolean;
  smoothingFactor?: number;
  scrollThrottle?: number;

  disableOnInput?: boolean;
  ignoredElements?: string[];
}

const DEFAULT_CONFIG: SmoothScrollConfig = {
  lerp: 0.075,
  lerpEase: 'easeOutQuad',
  scrollSpeed: 1,
  wheelSensitivity: 1,
  touchSensitivity: 1,
  minScrollSpeed: 0.1,
  maxScrollSpeed: 2,
  inertia: true,
  inertiaDecay: 0.95,
  momentumDampening: 0.8,
  scrollAxis: 'vertical',
  scrollDirection: 'normal',
  preventOverscroll: true,
  smoothingFactor: 0.1,
  scrollThrottle: 16,
  disableOnInput: false,
  ignoredElements: ['input', 'textarea', 'select', 'button'],
};

const easingFunctions = {
  linear: (t: number) => t,
  easeInQuad: (t: number) => t * t,
  easeOutQuad: (t: number) => t * (2 - t),
  easeInOutQuad: (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
};

const SmoothScrollContext = createContext<{
  scrollTo: (target: number | HTMLElement, options?: Partial<SmoothScrollConfig>) => void;
  currentScroll: number;
}>({
  scrollTo: () => {},
  currentScroll: 0,
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
  let mergedConfig = useMemo(
    () => ({
      ...DEFAULT_CONFIG,
      ...config,
    }),
    [config],
  );

  const [currentScroll, setCurrentScroll] = useState<number>(0);
  const targetScrollRef = useRef<number>(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  const momentumRef = useRef<number>(0);
  const touchStartYRef = useRef<number | null>(null);
  const lastTouchYRef = useRef<number | null>(null);

  const scrollTo = (target: number | HTMLElement, overrideConfig?: Partial<SmoothScrollConfig>) => {
    mergedConfig = { ...mergedConfig, ...overrideConfig };
    const scrollContainer = scrollContainerRef.current;

    if (!scrollContainer) return;

    const targetPosition =
      typeof target === 'number' ? target : target.getBoundingClientRect().top + window.scrollY;

    const adjustedPosition =
      mergedConfig.scrollDirection === 'reversed'
        ? document.documentElement.scrollHeight - targetPosition
        : targetPosition;

    targetScrollRef.current = adjustedPosition;
  };

  const shouldPreventScroll = (e: Event) => {
    if (!mergedConfig.disableOnInput) return false;

    const target = e.target as HTMLElement;
    return mergedConfig.ignoredElements?.some((selector) => target.matches(selector)) || false;
  };

  const animate = () => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const { lerp, lerpEase, inertia, inertiaDecay, preventOverscroll } = mergedConfig;

    const ease = easingFunctions[lerpEase || 'linear'];
    const lerpAmount = ease(lerp || 0.1);

    let newScroll = currentScroll;

    newScroll += (targetScrollRef.current - currentScroll) * lerpAmount;

    if (inertia && momentumRef.current !== 0) {
      newScroll += momentumRef.current;
      momentumRef.current *= inertiaDecay || 0.95;

      if (Math.abs(momentumRef.current) < 0.1) {
        momentumRef.current = 0;
      }
    }

    if (preventOverscroll) {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      newScroll = Math.min(Math.max(0, newScroll), maxScroll);
    }

    setCurrentScroll(newScroll);
    window.scrollTo(0, newScroll);

    rafRef.current = requestAnimationFrame(animate);
  };

  const handleWheel = (e: WheelEvent) => {
    if (shouldPreventScroll(e)) return;

    const { wheelSensitivity, scrollAxis, scrollSpeed } = mergedConfig;

    if (scrollAxis !== 'vertical' && e.deltaY !== 0) return;

    e.preventDefault();

    const delta = e.deltaY * (wheelSensitivity || 1) * (scrollSpeed || 1);

    targetScrollRef.current += delta;
    momentumRef.current = delta;
  };

  const handleTouchStart = (e: TouchEvent) => {
    if (shouldPreventScroll(e)) return;

    const touch =
      e.touches[0] ||
      (() => {
        throw new Error(`${SmoothScrollProvider.name} - TouchEvent.touches[0] is null`);
      })();
    touchStartYRef.current = touch.clientY;
    lastTouchYRef.current = touch.clientY;
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (shouldPreventScroll(e)) return;

    const { touchSensitivity, scrollAxis, scrollSpeed } = mergedConfig;

    const touch =
      e.touches[0] ||
      (() => {
        throw new Error(`${SmoothScrollProvider.name} - TouchEvent.touches[0] is null`);
      })();

    if (touchStartYRef.current === null || lastTouchYRef.current === null) return;

    if (scrollAxis !== 'vertical') return;

    e.preventDefault();

    const currentY = touch.clientY;
    const delta = (lastTouchYRef.current - currentY) * (touchSensitivity || 1) * (scrollSpeed || 1);

    targetScrollRef.current += delta;
    momentumRef.current = delta;

    lastTouchYRef.current = currentY;
  };

  const handleTouchEnd = () => {
    touchStartYRef.current = null;
    lastTouchYRef.current = null;
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    rafRef.current = requestAnimationFrame(animate);

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd, { passive: false });

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [mergedConfig]);

  const contextValue = useMemo(
    () => ({
      scrollTo,
      currentScroll,
    }),
    [scrollTo, currentScroll],
  );

  return (
    <SmoothScrollContext.Provider value={contextValue}>
      <div ref={scrollContainerRef}>{children}</div>
    </SmoothScrollContext.Provider>
  );
}

/**
 * Hook to access smooth scroll functionality
 * @returns {SmoothScrollContext} SmoothScrollContext - The smooth scroll context
 * @example
 * ```tsx
 * const { scrollTo, currentScroll } = useSmoothScroll();
 * ```
 */
export function useSmoothScroll() {
  return useContext(SmoothScrollContext);
}
