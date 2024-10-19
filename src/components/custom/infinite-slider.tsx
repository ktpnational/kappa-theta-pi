'use client';

import { cn } from '@/lib/utils';
import { AnimatePresence, motion, useAnimation } from 'framer-motion';
import { nanoid } from 'nanoid';
import React, { useEffect, useState, memo, useRef } from 'react';

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

interface SlideProps {
  children: React.ReactNode;
  width?: string;
}

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
  const [idNanoid, setIdNanoid] = useState('');
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    setIdNanoid(nanoid());
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
    }
  }, [children]);

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

  const handleMouseEnter = () => {
    if (pauseOnHover) {
      controls.stop();
    }
  };

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
        id={`slider_wrapper_${idNanoid}`}
        ref={containerRef}
      >
        <motion.div
          className={cn('flex', `w-[calc(${width} * ${React.Children.count(children) * 2})]`)}
          animate={controls}
          id={`slider_${idNanoid}`}
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

// Define a memoized component for children
const MemoizedChild = React.memo(({ child, width }: { child: React.ReactNode; width: string }) => (
  <React.Fragment>{React.cloneElement(child as React.ReactElement, { width })}</React.Fragment>
));

const Slide: React.FC<SlideProps> = memo(({ children, width = '200px', ...props }) => {
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
