'use client';

import { cn } from '@/lib/utils';
import { AnimatePresence, type HTMLMotionProps, motion } from 'motion/react';
import Image from 'next/image';
import { useCallback, useRef, useState } from 'react';
import React from 'react';

/**
 * A component that provides direction-aware hover effects for images.
 *
 * @component
 * @param {Object} props - The component props
 * @param {string} props.imageUrl - URL of the image to display
 * @param {React.ReactNode | string} props.children - Content to display over the image
 * @param {string} [props.childrenClassName] - Additional CSS classes for the children container
 * @param {string} [props.imageClassName] - Additional CSS classes for the image
 * @param {string} [props.className] - Additional CSS classes for the root container
 * @returns {React.JSX.Element} A direction-aware hover component
 */
export const DirectionAwareHover = React.memo(
  ({
    imageUrl,
    children,
    childrenClassName,
    imageClassName,
    className,
  }: {
    imageUrl: string;
    children: React.ReactNode | string;
    childrenClassName?: string;
    imageClassName?: string;
    className?: string;
  }) => {
    const ref = useRef<HTMLDivElement>(null);

    const [direction, setDirection] = useState<'top' | 'bottom' | 'left' | 'right' | string>(
      'left',
    );

    /**
     * Handles mouse enter events and determines hover direction
     *
     * @param {React.MouseEvent<HTMLDivElement, MouseEvent>} event - Mouse enter event
     */
    const handleMouseEnter = useCallback(
      (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!ref.current) return;

        const direction = getDirection(event, ref.current);
        console.log('direction', direction);
        switch (direction) {
          case 0:
            setDirection('top');
            break;
          case 1:
            setDirection('right');
            break;
          case 2:
            setDirection('bottom');
            break;
          case 3:
            setDirection('left');
            break;
          default:
            setDirection('left');
            break;
        }
      },
      [ref],
    );

    /**
     * Calculates the direction of hover based on mouse position relative to element
     *
     * @param {React.MouseEvent<HTMLDivElement, MouseEvent>} ev - Mouse event
     * @param {HTMLElement} obj - DOM element being hovered
     * @returns {number} Direction index (0: top, 1: right, 2: bottom, 3: left)
     */
    const getDirection = (ev: React.MouseEvent<HTMLDivElement, MouseEvent>, obj: HTMLElement) => {
      const { width: w, height: h, left, top } = obj.getBoundingClientRect();
      const x = ev.clientX - left - (w / 2) * (w > h ? h / w : 1);
      const y = ev.clientY - top - (h / 2) * (h > w ? w / h : 1);
      const d = Math.round(Math.atan2(y, x) / 1.57079633 + 5) % 4;
      return d;
    };

    return (
      <motion.div
        {...({
          onMouseEnter: handleMouseEnter,
          className: cn(
            'md:h-96 w-60 h-60 md:w-96 bg-transparent rounded-lg overflow-hidden group/card relative',
            className,
          ),
        } as HTMLMotionProps<'div'>)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            {...({
              className: 'relative h-full w-full',
            } as HTMLMotionProps<'div'>)}
            initial="initial"
            whileHover={direction}
            exit="exit"
          >
            <motion.div
              {...({
                className:
                  'group-hover/card:block hidden absolute inset-0 w-full h-full bg-black/40 z-10 transition duration-500',
              } as HTMLMotionProps<'div'>)}
            />
            <motion.div
              variants={variants}
              {...({
                className: 'h-full w-full relative bg-gray-50 dark:bg-black',
              } as HTMLMotionProps<'div'>)}
              transition={{
                duration: 0.2,
                ease: 'easeOut',
              }}
            >
              <Image
                alt="image"
                className={cn('h-full w-full object-cover scale-[1.15]', imageClassName)}
                width="1000"
                height="1000"
                src={imageUrl}
              />
            </motion.div>
            <motion.div
              variants={textVariants}
              transition={{
                duration: 0.5,
                ease: 'easeOut',
              }}
              {...({
                className: cn('text-white absolute bottom-4 left-4 z-40', childrenClassName),
              } as HTMLMotionProps<'div'>)}
            >
              {children}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    );
  },
);

DirectionAwareHover.displayName = 'DirectionAwareHover';

/**
 * Animation variants for the image container motion
 */
const variants = {
  initial: {
    x: 0,
  },
  exit: {
    x: 0,
    y: 0,
  },
  top: {
    y: 20,
  },
  bottom: {
    y: -20,
  },
  left: {
    x: 20,
  },
  right: {
    x: -20,
  },
};

/**
 * Animation variants for the text overlay motion
 */
const textVariants = {
  initial: {
    y: 0,
    x: 0,
    opacity: 0,
  },
  exit: {
    y: 0,
    x: 0,
    opacity: 0,
  },
  top: {
    y: -20,
    opacity: 1,
  },
  bottom: {
    y: 2,
    opacity: 1,
  },
  left: {
    x: -2,
    opacity: 1,
  },
  right: {
    x: 20,
    opacity: 1,
  },
};
