'use client';

import {
  type HTMLMotionProps,
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'motion/react';
import React, { useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

/**
 * Props for the VelocityScroll component
 * @interface VelocityScrollProps
 * @property {string} text - The text content to be scrolled
 * @property {number} [default_velocity=5] - The default scrolling velocity
 * @property {string} [className] - Optional CSS class name
 */
interface VelocityScrollProps {
  text: string;
  default_velocity?: number;
  className?: string;
}

/**
 * Props for the ParallaxText component
 * @interface ParallaxProps
 * @property {string} children - The text content to be displayed
 * @property {number} baseVelocity - The base velocity for the parallax effect
 * @property {string} [className] - Optional CSS class name
 */
interface ParallaxProps {
  children: string;
  baseVelocity: number;
  className?: string;
}

/**
 * Wraps a value within a range, creating a circular motion effect
 * @param {number} min - The minimum value of the range
 * @param {number} max - The maximum value of the range
 * @param {number} v - The value to wrap
 * @returns {number} The wrapped value within the specified range
 */
export const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

/**
 * A component that creates a velocity-based scrolling text effect
 * @param {VelocityScrollProps} props - The component props
 * @returns {React.JSX.Element} The rendered VelocityScroll component
 */
export function VelocityScroll({ text, default_velocity = 5, className }: VelocityScrollProps) {
  /**
   * Inner component that handles the parallax text animation
   * @param {ParallaxProps} props - The component props
   * @returns {React.JSX.Element} The rendered ParallaxText component
   */
  function ParallaxText({ children, baseVelocity = 100, className }: ParallaxProps) {
    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
      damping: 50,
      stiffness: 400,
    });

    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
      clamp: false,
    });

    const [repetitions, setRepetitions] = useState(1);
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
      const calculateRepetitions = () => {
        if (containerRef.current && textRef.current) {
          const containerWidth = containerRef.current.offsetWidth;
          const textWidth = textRef.current.offsetWidth;
          const newRepetitions = Math.ceil(containerWidth / textWidth) + 2;
          setRepetitions(newRepetitions);
        }
      };

      calculateRepetitions();

      window.addEventListener('resize', calculateRepetitions);
      return () => window.removeEventListener('resize', calculateRepetitions);
    }, [children]);

    const x = useTransform(baseX, (v) => `${wrap(-100 / repetitions, 0, v)}%`);

    const directionFactor = React.useRef<number>(1);
    useAnimationFrame((_t, delta) => {
      let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

      if (velocityFactor.get() < 0) {
        directionFactor.current = -1;
      } else if (velocityFactor.get() > 0) {
        directionFactor.current = 1;
      }

      moveBy += directionFactor.current * moveBy * velocityFactor.get();

      baseX.set(baseX.get() + moveBy);
    });

    return (
      <div className="w-full overflow-hidden whitespace-nowrap" ref={containerRef}>
        <motion.div
          style={{ x }}
          {...({
            className: cn('inline-block', className),
          } as HTMLMotionProps<'div'>)}
        >
          {Array.from({ length: repetitions }).map((_, i) => (
            <span key={i} ref={i === 0 ? textRef : null}>
              {children}{' '}
            </span>
          ))}
        </motion.div>
      </div>
    );
  }

  return (
    <section className="relative w-full">
      <ParallaxText baseVelocity={default_velocity} className={className}>
        {text}
      </ParallaxText>
      <ParallaxText baseVelocity={-default_velocity} className={className}>
        {text}
      </ParallaxText>
    </section>
  );
}
