'use client';

import { cn } from '@/lib/utils';
import { AnimatePresence, motion, useAnimation } from 'framer-motion';
import { nanoid } from 'nanoid';
import React, { useEffect, useState } from 'react';

/**
 * Props for the Slider component.
 * @interface SliderProps
 * @property {React.ReactNode} children - The slides to be displayed in the slider.
 * @property {string} [width='200px'] - The width of each slide.
 * @property {number} [duration=40] - The duration of the slide animation.
 * @property {boolean} [toRight=false] - Direction of the slide animation.
 * @property {boolean} [pauseOnHover=false] - Whether to pause the animation on hover.
 * @property {boolean} [blurBorders=false] - Whether to blur the borders of the slider.
 * @property {string} [blurBorderColor='#fff'] - The color of the blurred borders.
 */
interface SliderProps {
  children: React.ReactNode;
  width?: string;
  duration?: number;
  toRight?: boolean;
  pauseOnHover?: boolean;
  blurBorders?: boolean;
  blurBorderColor?: string;
}

/**
 * Props for the Slide component.
 * @interface SlideProps
 * @property {React.ReactNode} children - The content of the slide.
 * @property {string} [width='200px'] - The width of the slide.
 */
interface SlideProps {
  children: React.ReactNode;
  width?: string;
}

/**
 * Slider component to display slides with animation.
 * @param {SliderProps} props - The props for the Slider component.
 * @returns {JSX.Element} The Slider component.
 */
const Slider: React.FC<SliderProps> & { Slide: React.FC<SlideProps> } = ({
  children,
  width = '200px',
  duration = 40,
  toRight = false,
  pauseOnHover = false,
  blurBorders = false,
  blurBorderColor = '#fff',
}) => {
  const [idNanoid, setIdNanoid] = useState('');
  const controls = useAnimation();

  useEffect(() => {
    setIdNanoid(nanoid());
  }, []);

  useEffect(() => {
    controls.start({
      x: toRight
        ? `calc(${width} * ${React.Children.count(children)})`
        : `calc(-${width} * ${React.Children.count(children)})`,
      transition: {
        duration,
        ease: 'linear',
        repeat: Number.POSITIVE_INFINITY,
      },
    });
  }, [toRight, width, children, duration, controls]);

  const handleMouseEnter = () => {
    if (pauseOnHover) {
      controls.stop();
    }
  };

  const handleMouseLeave = () => {
    if (pauseOnHover) {
      controls.start({
        x: toRight
          ? `calc(${width} * ${React.Children.count(children)})`
          : `calc(-${width} * ${React.Children.count(children)})`,
        transition: {
          duration,
          ease: 'linear',
          repeat: Number.POSITIVE_INFINITY,
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
        id={`slider_wrapper_${idNanoid}`}
      >
        <motion.div
          className={cn('flex', `w-[calc(${width} * ${React.Children.count(children) * 3})]`)}
          animate={controls}
          id={`slider_${idNanoid}`}
        >
          <AnimatePresence>
            {React.Children.map(children, (child, i) => (
              <React.Fragment key={i}>
                {React.cloneElement(child as React.ReactElement, { width })}
              </React.Fragment>
            ))}
            {React.Children.map(children, (child, i) => (
              <React.Fragment key={i + React.Children.count(children)}>
                {React.cloneElement(child as React.ReactElement, { width })}
              </React.Fragment>
            ))}
            {React.Children.map(children, (child, i) => (
              <React.Fragment key={i + React.Children.count(children) * 2}>
                {React.cloneElement(child as React.ReactElement, { width })}
              </React.Fragment>
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
 * Slide component to display individual slide content.
 * @param {SlideProps} props - The props for the Slide component.
 * @returns {JSX.Element} The Slide component.
 */
const Slide: React.FC<SlideProps> = ({ children, width = '200px', ...props }) => {
  return (
    <div className={cn('flex items-center', `w-[${width}]`)} {...props}>
      {children}
    </div>
  );
};

Slider.Slide = Slide;

Slider.displayName = 'Slider';

export default Slider;
