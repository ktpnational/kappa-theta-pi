'use client';

import { HeroVideoDialog } from '@/components/lib/hero-video-dialog';
import { app } from '@/constants';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';

/** Custom easing function for animations */
const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

/**
 * Animated announcement pill component that appears at the top of the hero section
 * @returns {React.JSX.Element} A motion.a component with announcement styling and animation
 */
const HeroPill = () => {
  return (
    <motion.a
      href="/"
      className="group flex items-center gap-1 overflow-hidden rounded-full bg-gradient-to-r from-[#88dddd]/20 to-[#8bb9ff]/20 p-1 pr-4 backdrop-blur-sm transition-all hover:from-[#88dddd]/30 hover:to-[#8bb9ff]/30"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease }}
    >
      <div className="rounded-full bg-gradient-to-r from-[#88dddd] to-[#8bb9ff] px-2 py-1 sm:px-3 sm:py-1.5">
        <span className="text-[10px] font-medium text-[#234c8b] xs:text-xs sm:text-sm">⚡ Announcement</span>
      </div>
      <div className="flex items-center gap-1 px-1 sm:gap-2 sm:px-2">
        <span className="text-[10px] font-medium text-[#234c8b] xs:text-xs sm:text-sm">Introducing ΚΘΠ</span>
        <ArrowRight className="h-3 w-3 text-[#234c8b] transition-transform duration-300 ease-in-out group-hover:translate-x-0.5 sm:h-4 sm:w-4" />
      </div>
    </motion.a>
  );
};

HeroPill.displayName = 'HeroPill';

/**
 * Component that renders the main hero titles with staggered animation effects
 * @returns {React.JSX.Element} A div containing animated heading and description text
 */
const HeroTitles = () => {
  return (
    <div className="flex w-full max-w-2xl flex-col space-y-4 overflow-hidden pt-8">
      <motion.h1
        className="text-center text-4xl font-medium leading-tight text-foreground sm:text-5xl md:text-6xl"
        initial={{ filter: 'blur(10px)', opacity: 0, y: 50 }}
        animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
        transition={{
          duration: 1,
          ease,
          staggerChildren: 0.2,
        }}
      >
        {['Uniting', 'Tech', 'Enthusiasts', 'Nationwide'].map((text, index) => (
          <motion.span
            key={index}
            className="inline-block px-1 md:px-2 text-balance font-semibold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: index * 0.2,
              ease,
            }}
          >
            {text}
          </motion.span>
        ))}
      </motion.h1>
      <motion.p
        className="mx-auto max-w-xl text-center text-lg leading-7 text-muted-foreground sm:text-xl sm:leading-9 text-balance"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.6,
          duration: 0.8,
          ease,
        }}
      >
        {app.description}
      </motion.p>
    </div>
  );
};

HeroTitles.displayName = 'HeroTitles';

/**
 * Component that renders the Call-to-Action buttons in the hero section
 * Features animated entrance and responsive layout
 * @returns {React.JSX.Element} A motion.div containing two Link buttons for primary actions
 */
const HeroCTA = () => {
  return (
    <>
      <motion.div
        className="mx-auto mt-6 flex w-full max-w-2xl flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8, ease }}
      >
        <Link
          href="/join"
          className={cn(
            'w-full sm:w-auto text-primary-foreground flex gap-2',
            'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
            'bg-primary text-primary-foreground hover:bg-primary/90',
            'h-11 px-8 text-base',
          )}
        >
          Join {app.name.split(' - ')[0]}
        </Link>
        <Link
          href="/chapters"
          className={cn(
            'w-full sm:w-auto border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground',
            'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
            'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
            'h-11 px-8 text-base',
          )}
        >
          Explore Our Chapters
        </Link>
      </motion.div>
    </>
  );
};

HeroCTA.displayName = 'HeroCTA';

/**
 * Component that renders the hero image/video section
 * Includes an animated entrance and embedded video dialog
 * @returns {React.JSX.Element} A motion.div containing the HeroVideoDialog component
 */
const HeroImage = () => {
  return (
    <motion.div
      className="relative mx-auto flex w-full items-center justify-center"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 1, ease }}
    >
      <HeroVideoDialog
        animationStyle="from-center"
        videoSrc="https://www.youtube.com/embed/dQw4w9WgXcQ"
        thumbnailSrc="/assets/images/hero.png"
        thumbnailAlt="Kappa Theta Pi Introduction Video"
        className="border rounded-lg shadow-lg max-w-screen-lg mt-16"
      />
    </motion.div>
  );
};

HeroImage.displayName = 'HeroImage';

/**
 * Main hero section component that combines all hero elements
 * Includes announcement pill, titles, CTA buttons, and hero image
 * Features a gradient overlay at the bottom for smooth transition
 * @returns {React.JSX.Element} A section element containing all hero components
 */
export const HeroSection = () => {
  return (
    <section id="hero" className="relative bg-none">
      <div className="relative flex w-full flex-col items-center justify-start px-4 pt-32 sm:px-6 sm:pt-24 md:pt-32 lg:px-8">
        <HeroPill />
        <HeroTitles />
        <HeroCTA />
        <div className="pointer-events-none absolute inset-x-0 -bottom-12 h-1/3 bg-gradient-to-t from-white via-white to-transparent lg:h-1/4" />
        <HeroImage />
      </div>
    </section>
  );
};

HeroSection.displayName = 'HeroSection';

export default HeroSection;
