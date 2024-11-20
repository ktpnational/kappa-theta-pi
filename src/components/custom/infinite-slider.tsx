'use client';

import { cn } from '@/lib/utils';
import { useGlobalStore } from '@/providers';
import { AnimatePresence, motion, useAnimation } from 'framer-motion';
import { nanoid } from 'nanoid';
import React, { useEffect, useRef } from 'react';
/**
 * Props for the Slider component
 * @interface SliderProps
 * @property {React.ReactNode} children - Child elements to be rendered in the slider
 * @property {string} [width='200px'] - Width of each slide
 * @property {number} [duration=40] - Duration of the slide animation in seconds
 * @property {boolean} [toRight=false] - Direction of the slider movement. If true, slides move right to left
 * @property {boolean} [pauseOnHover=false] - If true, animation pauses when mouse hovers over the slider
 * @property {boolean} [blurBorders=false] - If true, adds gradient blur effect to slider edges
 * @property {string} [blurBorderColor='#fff'] - Color of the blur gradient borders
 * @property {boolean} [infiniteRepeat=false] - If true, animation loops infinitely
 */
interface SliderProps {
  children: React.ReactNode;
  width?: string;
  duration?: number;
  toRight?: boolean;
  pauseOnHover?: boolean;
  blurBorders?: boolean;
  blurBorderColor?: string;
  infiniteRepeat?: boolean;
}

/**
 * Props for individual Slide components
 * @interface SlideProps
 * @property {React.ReactNode} children - Content to be rendered within the slide
 * @property {string} [width='200px'] - Width of the slide
 */
interface SlideProps {
  children: React.ReactNode;
  width?: string;
}

/**
 * A customizable slider/carousel component with animation controls
 * @component
 * @param {SliderProps} props - The props for the Slider component
 * @returns {React.ReactElement} Rendered Slider component
 */
const Slider: React.FC<SliderProps> & { Slide: React.FC<SlideProps> } = ({
  children,
  width = '200px',
  duration = 40,
  toRight = false,
  pauseOnHover = false,
  blurBorders = false,
  blurBorderColor = '#fff',
  infiniteRepeat = false,
}) => {
  const { id, setId } = useGlobalStore((state) => state.idNanoid);
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);
  const { width: containerWidth, setWidth } = useGlobalStore((state) => state.containerWidth);

  // Generate unique ID for slider wrapper
  useEffect(() => {
    setId(nanoid());
  }, []);

  // Update container width when children change
  useEffect(() => {
    if (containerRef.current) {
      setWidth(containerRef.current.offsetWidth);
    }
  }, [children]);

  // Handle animation frame updates
  useEffect(() => {
    let animationFrameId: number;
    let startTime: number;
    let currentPosition = 0;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = (elapsed % duration) / duration;

      currentPosition = toRight ? -progress * containerWidth : progress * containerWidth;

      controls.set({ x: currentPosition });

      if (infiniteRepeat) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [controls, duration, toRight, containerWidth, infiniteRepeat]);

  /**
   * Handles mouse enter event for pause on hover functionality
   * @function handleMouseEnter
   */
  const handleMouseEnter = () => {
    if (pauseOnHover) {
      controls.stop();
    }
  };

  /**
   * Handles mouse leave event to resume animation
   * @function handleMouseLeave
   */
  const handleMouseLeave = () => {
    if (pauseOnHover) {
      controls.start({
        x: toRight ? -containerWidth : containerWidth,
        transition: {
          duration,
          ease: 'linear',
          repeat: infiniteRepeat ? Number.POSITIVE_INFINITY : 0,
        },
      });
    }
  };

  return (
    <div className="relative">
      <div
        className="w-full h-auto mx-auto overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        id={`slider_wrapper_${id}`}
        ref={containerRef}
      >
        <motion.div
          style={{
            width: `calc(${width} * ${React.Children.count(children) * 2})`,
          }}
          animate={controls}
        >
          <AnimatePresence>
            {React.Children.map(children, (child, i) => (
              <MemoizedChild key={i} child={child} width={width} />
            ))}
            {React.Children.map(children, (child, i) => (
              <MemoizedChild key={i + React.Children.count(children)} child={child} width={width} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
      {blurBorders && (
        <>
          <div
            className="absolute right-0 top-0 w-[180px] h-[105%] z-10 rotate-180"
            style={{
              background: `linear-gradient(90deg, ${blurBorderColor} 10%, rgba(255, 255, 255, 0) 80%)`,
            }}
          />
          <div
            className="absolute left-0 top-0 w-[180px] h-[120%] z-10"
            style={{
              background: `linear-gradient(90deg, ${blurBorderColor} 10%, rgba(255, 255, 255, 0) 80%)`,
            }}
          />
        </>
      )}
    </div>
  );
};

/**
 * Memoized child component for performance optimization
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.child - Child element to be rendered
 * @param {string} props.width - Width of the child element
 * @returns {React.ReactElement} Memoized child component
 */
const MemoizedChild = React.memo(({ child, width }: { child: React.ReactNode; width: string }) => (
  <React.Fragment>
    {React.cloneElement(child as React.ReactElement<any>, { style: { width } })}
  </React.Fragment>
));

/**
 * Individual slide component for the Slider
 * @component
 * @param {SlideProps} props - The props for the Slide component
 * @returns {React.ReactElement} Rendered Slide component
 */
const Slide: React.FC<SlideProps> = React.memo(({ children, width = '200px', ...props }) => {
  return (
    <div className={cn('flex items-center', `w-[${width}]`)} {...props}>
      {children}
    </div>
  );
});

Slider.Slide = Slide;

Slider.displayName = 'Slider';
Slide.displayName = 'Slide';

export { Slider };
