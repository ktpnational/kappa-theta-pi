'use client';

import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import React, { useEffect, useRef, useState } from "react";

interface SmoothScrollProps {
  children: React.ReactNode;
}

export const SmoothScrollProvider: React.FC<SmoothScrollProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (contentRef.current) {
        setContentHeight(contentRef.current.scrollHeight);
      }
      setWindowHeight(window.innerHeight);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [contentRef]);

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    mass: 0.1,
    stiffness: 100,
    damping: 20,
    restDelta: 0.001,
  });

  useMotionValueEvent(smoothProgress, "change", (latest) => {
    if (latest === 0) {
      setIsLoading(false);
    }
  });

  const y = useTransform(smoothProgress, (value) =>
    value * -(contentHeight - windowHeight)
  );

  return (
    <>
      <div style={{ height: contentHeight }} />
      <motion.div
        className="w-screen fixed top-0 flex flex-col transition-opacity duration-200 ease-in-out"
        ref={contentRef}
        style={{ y: isLoading ? 0 : y, opacity: isLoading ? 0 : 1 }}
      >
        {children}
      </motion.div>
    </>
  );
};

export const useSmoothScroll = () => {
  // Keep this hook for backward compatibility if needed
  return { scrollTo: (target: number | HTMLElement) => {
    window.scrollTo({ top: typeof target === 'number' ? target : target.offsetTop, behavior: 'smooth' });
  }};
};
