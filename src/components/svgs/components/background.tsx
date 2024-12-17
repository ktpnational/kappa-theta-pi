'use client';

import { cn } from '@/lib';
import { motion } from 'motion/react';
import React from 'react';
import type { TrueSVGProps } from '../types';

/**
 * An animated background component that displays floating shapes and fraternity branding
 *
 * @component
 * @returns {React.JSX.Element} A full-screen background with animated SVG shapes and fraternity text
 *
 * @example
 * return (
 *   <AnimatedBackground />
 * )
 */
export const AnimatedBackground = ({ className, ...props }: TrueSVGProps) => {
  /**
   * Generates random movement parameters for animated shapes
   *
   * @returns {Object} Movement parameters for Framer Motion
   * @property {number[]} x - X-axis movement range [start, end]
   * @property {number[]} y - Y-axis movement range [start, end]
   * @property {number[]} rotate - Rotation range in degrees [start, end]
   */
  const randomMovement = () => ({
    x: [0, Math.random() * 10 - 5],
    y: [0, Math.random() * 10 - 5],
    rotate: [0, Math.random() * 10 - 5],
  });

  return (
    <div className="fixed inset-0 overflow-hidden bg-[#234C8B]">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1440 1024"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        style={{ position: 'absolute', top: 0, left: 0, zIndex: -1 }}
        aria-hidden="true"
        className={cn('w-full h-full', className)}
        {...props}
      >
        <g clipPath="url(#clip0_348_767)">
          <g filter="url(#filter0_f_348_767)">
            <motion.path
              d="M220 429C496.142 429 720 205.142 720 -71C720 -347.142 496.142 -571 220 -571C-56.1424 -571 -280 -347.142 -280 -71C-280 205.142 -56.1424 429 220 429Z"
              fill="#458EFF"
              animate={randomMovement()}
              transition={{
                duration: 20,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: 'reverse',
                ease: 'easeInOut',
              }}
            />
            <motion.path
              d="M1142 1650C1485.52 1650 1764 1426.14 1764 1150C1764 873.858 1485.52 650 1142 650C798.479 650 520 873.858 520 1150C520 1426.14 798.479 1650 1142 1650Z"
              fill="#8BB9FF"
              animate={randomMovement()}
              transition={{
                duration: 25,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: 'reverse',
                ease: 'easeInOut',
              }}
            />
            <motion.path
              d="M81 1398C357.142 1398 581 1174.14 581 898C581 621.858 357.142 398 81 398C-195.142 398 -419 621.858 -419 898C-419 1174.14 -195.142 1398 81 1398Z"
              fill="#BAECBA"
              fillOpacity="0.44"
              animate={randomMovement()}
              transition={{
                duration: 22,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: 'reverse',
                ease: 'easeInOut',
              }}
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
      <div className="absolute top-4 right-4 sm:top-8 sm:right-8 z-10 text-right">
        <h2
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white"
          style={{
            fontFamily: 'Palatino, serif',
          }}
        >
          ΚΘΠ
        </h2>
      </div>
      <div className="absolute bottom-4 left-4 sm:bottom-8 sm:left-8 z-10 text-left max-w-[calc(100%-2rem)]">
        <h2
          className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1 sm:mb-2"
          style={{
            fontFamily: 'Palatino, serif',
          }}
        >
          Kappa Theta Pi (ΚΘΠ)
        </h2>
        <p className="text-sm sm:text-base md:text-xl text-white font-semibold">
          Co-ed professional fraternity for Information Technology
        </p>
      </div>
    </div>
  );
};

AnimatedBackground.displayName = 'AnimatedBackground';
export default AnimatedBackground;
