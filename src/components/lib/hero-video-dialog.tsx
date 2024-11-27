'use client';

import { cn } from '@/lib/utils';
import { Play, XIcon } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import Image from 'next/image';
import React, { useState, useCallback } from 'react';

/**
 * Defines the available animation styles for the video dialog transitions
 * @typedef {'from-bottom' | 'from-center' | 'from-top' | 'from-left' | 'from-right' | 'fade' | 'top-in-bottom-out' | 'left-in-right-out'} AnimationStyle
 */
type AnimationStyle =
  | 'from-bottom'
  | 'from-center'
  | 'from-top'
  | 'from-left'
  | 'from-right'
  | 'fade'
  | 'top-in-bottom-out'
  | 'left-in-right-out';

/**
 * Props interface for the HeroVideoDialog component
 * @interface HeroVideoProps
 * @property {AnimationStyle} [animationStyle='from-center'] - The animation style to use for dialog transitions
 * @property {string} videoSrc - Source URL of the video to be displayed
 * @property {string} thumbnailSrc - Source URL of the thumbnail image
 * @property {string} [thumbnailAlt='Video thumbnail'] - Alt text for the thumbnail image
 * @property {string} [className] - Additional CSS classes to apply to the container
 */
interface HeroVideoProps {
  animationStyle?: AnimationStyle;
  videoSrc: string;
  thumbnailSrc: string;
  thumbnailAlt?: string;
  className?: string;
}

/**
 * Animation variant configurations for different transition styles
 * Each variant defines initial, animate, and exit states for the animation
 * @constant
 * @type {Record<AnimationStyle, {initial: object, animate: object, exit: object}>}
 */
const animationVariants = {
  'from-bottom': {
    initial: { y: '100%', opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: '100%', opacity: 0 },
  },
  'from-center': {
    initial: { scale: 0.5, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.5, opacity: 0 },
  },
  'from-top': {
    initial: { y: '-100%', opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: '-100%', opacity: 0 },
  },
  'from-left': {
    initial: { x: '-100%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '-100%', opacity: 0 },
  },
  'from-right': {
    initial: { x: '100%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '100%', opacity: 0 },
  },
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  'top-in-bottom-out': {
    initial: { y: '-100%', opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: '100%', opacity: 0 },
  },
  'left-in-right-out': {
    initial: { x: '-100%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '100%', opacity: 0 },
  },
};

/**
 * A memoized video dialog component with animated transitions
 * @component
 * @param {HeroVideoProps} props - Component props
 * @param {AnimationStyle} [props.animationStyle='from-center'] - Animation style for transitions
 * @param {string} props.videoSrc - URL of the video to display
 * @param {string} props.thumbnailSrc - URL of the thumbnail image
 * @param {string} [props.thumbnailAlt='Video thumbnail'] - Alt text for thumbnail
 * @param {string} [props.className] - Additional CSS classes
 * @returns {React.ReactElement} Rendered component
 */
export const HeroVideoDialog = React.memo(
  ({
    animationStyle = 'from-center',
    videoSrc,
    thumbnailSrc,
    thumbnailAlt = 'Video thumbnail',
    className,
  }: HeroVideoProps) => {
    const [isVideoOpen, setIsVideoOpen] = useState(false);
    const selectedAnimation = animationVariants[animationStyle];

    const handleClose = useCallback(() => setIsVideoOpen(false), []);
    const handleOpen = useCallback(() => setIsVideoOpen(true), []);

    return (
      <div className={cn('relative', className)}>
        <div
          className="relative cursor-pointer group"
          onClick={handleOpen}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && handleOpen()}
          aria-label="Open video"
        >
          <div className="relative w-full">
            <Image
              src={thumbnailSrc}
              alt={thumbnailAlt}
              width={1920}
              height={1080}
              className="w-full transition-all duration-200 group-hover:brightness-[0.8] ease-out rounded-md shadow-lg border"
            />
          </div>
          <div className="absolute inset-0 flex items-center justify-center group-hover:scale-100 scale-[0.9] transition-all duration-200 ease-out rounded-2xl">
            <div className="bg-primary/10 flex items-center justify-center rounded-full backdrop-blur-md size-28">
              <div className="flex items-center justify-center bg-gradient-to-b from-primary/30 to-primary shadow-md rounded-full size-20 transition-all ease-out duration-200 relative group-hover:scale-[1.2] scale-100">
                <Play
                  className="size-8 text-white fill-white group-hover:scale-105 scale-100 transition-transform duration-200 ease-out"
                  style={{
                    filter:
                      'drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06))',
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isVideoOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md"
              onClick={handleClose}
              role="dialog"
              aria-modal="true"
              aria-label="Video player"
            >
              <motion.div
                initial={selectedAnimation.initial}
                animate={selectedAnimation.animate}
                exit={selectedAnimation.exit}
                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                className="relative w-full max-w-4xl mx-4 md:mx-0 aspect-[3/2]"
                onClick={(e) => e.stopPropagation()}
              >
                <motion.button
                  className="absolute -top-16 right-0 text-white text-xl bg-neutral-900/50 ring-1 backdrop-blur-md rounded-full p-2 dark:bg-neutral-100/50 dark:text-black"
                  onClick={handleClose}
                  aria-label="Close video"
                >
                  <XIcon className="size-5" />
                </motion.button>
                <div className="size-full border-2 border-white rounded-2xl overflow-hidden isolate z-[1] relative">
                  <iframe
                    src={videoSrc}
                    title={thumbnailAlt}
                    className="size-full rounded-2xl"
                    loading="lazy"
                    allowFullScreen
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  },
);

HeroVideoDialog.displayName = 'HeroVideoDialog';
