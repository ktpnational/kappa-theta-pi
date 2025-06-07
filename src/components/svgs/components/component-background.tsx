'use client';

import { cn } from '@/lib';
import { type Variants, motion } from 'motion/react';
import React from 'react';
import type { TrueSVGProps } from '../types';

const shapeVariants = {
  float: {
    x: [0, 5, -5, 0],
    y: [0, 5, -5, 0],
    rotate: [0, 5, -5, 0],
    transition: {
      duration: 20,
      repeat: Number.POSITIVE_INFINITY,
      repeatType: 'mirror',
      ease: 'easeInOut',
    },
  },
} satisfies Variants;

export const ComponentBackground = ({ className, ...props }: TrueSVGProps) => {
  return (
    <svg
      width="1440"
      height="1024"
      viewBox="0 0 1440 1024"
      fill="#264F8D"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('w-full h-full', className)}
      {...props}
    >
      <g clipPath="url(#clip0_348_767)">
        <g filter="url(#filter0_f_348_767)">
          {/* Animated Path 1 */}
          <motion.path
            d="M220 429C496.142 429 720 205.142 720 -71C720 -347.142 496.142 -571 220 -571C-56.1424 -571 -280 -347.142 -280 -71C-280 205.142 -56.1424 429 220 429Z"
            fill="#458EFF"
            variants={shapeVariants}
            animate="float"
          />
          {/* Animated Path 2 */}
          <motion.path
            d="M1142 1650C1485.52 1650 1764 1426.14 1764 1150C1764 873.858 1485.52 650 1142 650C798.479 650 520 873.858 520 1150C520 1426.14 798.479 1650 1142 1650Z"
            fill="#8BB9FF"
            variants={shapeVariants}
            animate="float"
          />
          {/* Animated Path 3 */}
          <motion.path
            d="M81 1398C357.142 1398 581 1174.14 581 898C581 621.858 357.142 398 81 398C-195.142 398 -419 621.858 -419 898C-419 1174.14 -195.142 1398 81 1398Z"
            fill="#BAECBA"
            fillOpacity="0.44"
            variants={shapeVariants}
            animate="float"
          />
        </g>
      </g>
      <defs>
        <filter
          id="filter0_f_348_767"
          x="-679"
          y="-831"
          width="2703"
          height="2741"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="130" result="effect1_foregroundBlur_348_767" />
        </filter>
        <clipPath id="clip0_348_767">
          <rect width="1440" height="1024" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

ComponentBackground.displayName = 'ComponentBackground';
export default ComponentBackground;
