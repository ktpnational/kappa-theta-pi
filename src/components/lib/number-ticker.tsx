'use client';

import { useInView, useMotionValue, useSpring } from 'motion/react';
import { useEffect, useRef } from 'react';
import React from 'react';

import { cn } from '@/lib/utils';

/**
 * NumberTicker Component
 * A memoized React component that displays an animated number counting up or down with configurable animation settings.
 *
 * @component
 * @param {Object} props - Component props
 * @param {number} props.value - The target number value to animate to/from
 * @param {('up'|'down')} [props.direction='up'] - The direction of the animation - counting up from 0 or down from value
 * @param {number} [props.delay=0] - Delay in seconds before starting the animation
 * @param {string} [props.className] - Additional CSS classes to apply to the component
 * @param {number} [props.decimalPlaces=0] - Number of decimal places to display
 *
 * @returns {React.JSX.Element} A span element containing the animated number
 *
 * @example
 * // Basic usage counting up to 100
 * <NumberTicker value={100} />
 *
 * @example
 * // Counting down from 1000 with 2 decimal places and 1s delay
 * <NumberTicker
 *   value={1000}
 *   direction="down"
 *   decimalPlaces={2}
 *   delay={1}
 * />
 */
export const NumberTicker = React.memo(
  ({
    value,
    direction = 'up',
    delay = 0,
    className,
    decimalPlaces = 0,
  }: {
    value: number;
    direction?: 'up' | 'down';
    className?: string;
    delay?: number; // delay in s
    decimalPlaces?: number;
  }) => {
    const ref = useRef<HTMLSpanElement>(null);
    const motionValue = useMotionValue(direction === 'down' ? value : 0);
    const springValue = useSpring(motionValue, {
      damping: 60,
      stiffness: 100,
    });
    const isInView = useInView(ref as React.RefObject<HTMLElement>, { once: true, margin: '0px' });

    useEffect(() => {
      isInView &&
        setTimeout(() => {
          motionValue.set(direction === 'down' ? 0 : value);
        }, delay * 1000);
    }, [motionValue, isInView, delay, value, direction]);

    useEffect(
      () =>
        springValue.on('change', (latest) => {
          if (ref.current) {
            ref.current.textContent = Intl.NumberFormat('en-US', {
              minimumFractionDigits: decimalPlaces,
              maximumFractionDigits: decimalPlaces,
            }).format(Number(latest.toFixed(decimalPlaces)));
          }
        }),
      [springValue, decimalPlaces],
    );

    return (
      <span
        className={cn(
          'inline-block tabular-nums text-black dark:text-white tracking-wider',
          className,
        )}
        ref={ref}
      />
    );
  },
);

NumberTicker.displayName = 'NumberTicker';
