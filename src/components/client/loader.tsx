'use client';

import { AnimatedBackground } from '@/components';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import React from 'react';

export const Loader = React.memo(
  () => {
    return (
      <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
        <AnimatedBackground />
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="relative">
            <motion.div
              className="w-24 h-24 rounded-full border-4 border-primary-foreground/20"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            />
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: 'linear',
              }}
            >
              <Loader2 className="w-12 h-12 text-primary-foreground" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    );
  },
  () => true,
);

Loader.displayName = 'Loader';
