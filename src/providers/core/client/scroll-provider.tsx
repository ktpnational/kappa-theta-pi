'use client';

import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import type React from 'react';
import { useEffect, useRef, useState } from 'react';

interface SmoothScrollProps {
  children: React.ReactNode;
}

export const SmoothScrollProvider: React.FC<SmoothScrollProps> = ({ children }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (contentRef.current) {
        setContentHeight(contentRef.current.scrollHeight - 19);
      }
      setWindowHeight(window.innerHeight);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [contentRef]);

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    mass: 0.1,
    stiffness: 100,
    damping: 20,
    restDelta: 0.001,
  });

  const y = useTransform(smoothProgress, (value) => value * -(contentHeight - windowHeight));

  return (
    <div style={{ height: contentHeight }}>
      <motion.div
        className="fixed w-screen top-0 flex flex-col transition-opacity duration-200 ease-in-out"
        ref={contentRef}
        style={{ y: y, opacity: 1 }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export const useSmoothScroll = () => {
  return {
    scrollTo: (target: number | HTMLElement) => {
      window.scrollTo({
        top: typeof target === 'number' ? target : target.offsetTop,
        behavior: 'smooth',
      });
    },
  };
};
