'use client';

import { AnimatedBackground } from '@/components';
import { type HTMLMotionProps, motion } from 'framer-motion';
import React from 'react';

export const Loader = React.memo(
  () => {
    return (
      <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
        <AnimatedBackground />
        <motion.div
          {...({
            className: 'z-10 flex flex-col items-center',
          } as HTMLMotionProps<'div'>)}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative w-32 h-32">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle
                className="text-gray-200 stroke-current"
                strokeWidth="8"
                cx="50"
                cy="50"
                r="40"
                fill="none"
              />
              <motion.circle
                className="text-primary stroke-current"
                strokeWidth="8"
                strokeLinecap="round"
                cx="50"
                cy="50"
                r="40"
                fill="none"
                initial={{ strokeDasharray: '0 251.2' }}
                animate={{ strokeDasharray: '251.2 0' }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: 'loop',
                  ease: 'linear',
                }}
              />
            </svg>
          </div>
          <motion.p
            {...({
              className: 'mt-4 text-lg font-semibold text-white',
            } as HTMLMotionProps<'p'>)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Loading...
          </motion.p>
        </motion.div>
      </div>
    );
  },
  () => true,
);

Loader.displayName = 'Loader';
