"use client";

//import { HeroVideoDialog } from "@/components/lib/hero-video-dialog";
import { app } from "@/constants";
import { cn } from "@/lib/utils";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

/**
 * Custom easing function for animations
 * Uses a modified cubic bezier curve for smooth motion
 */
const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

/**
 * HeroPill Component
 * Renders an animated pill-shaped link that highlights new content
 * Features a gradient background, sparkle icon, and hover effects
 *
 * @component
 * @returns {JSX.Element} Animated pill-shaped link component
 */
const HeroPill = () => {
  return (
    <motion.a
      href="/resources/foundersday"
      className="group relative flex items-center gap-1 overflow-hidden rounded-full bg-gradient-to-r from-blue-100/90 to-blue-50/90 p-1 pr-4 shadow-sm backdrop-blur-sm transition-all hover:shadow-md"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease }}
    >
      <div className="rounded-full bg-gradient-to-r from-blue-600 to-blue-500 px-3 py-1.5">
        <span className="flex items-center gap-1.5 text-xs font-semibold text-white sm:text-sm">
          <Sparkles className="h-3.5 w-3.5" />
          New
        </span>
      </div>
      <div className="flex items-center gap-2 px-2">
        <span className="text-xs font-medium text-blue-900 sm:text-sm">
          Founder's Day
        </span>
        <ArrowRight className="h-4 w-4 text-blue-600 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
      </div>
    </motion.a>
  );
};

/**
 * HeroTitles Component
 * Displays the main heading and description with staggered animation effects
 * Features a gradient text effect and responsive typography
 *
 * @component
 * @returns {JSX.Element} Animated title and description section
 */
const HeroTitles = () => {
  return (
    <div className="flex w-full max-w-3xl flex-col space-y-6 overflow-hidden pt-8">
      <motion.h1
        className="bg-gradient-to-b from-blue-950 to-blue-800 bg-clip-text text-center text-4xl font-bold leading-tight text-transparent sm:text-5xl md:text-6xl"
        initial={{ filter: "blur(10px)", opacity: 0, y: 50 }}
        animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
        transition={{ duration: 1, ease }}
      >
        {["Kappa", "Theta", "Pi"].map((text, index) => (
          <motion.span
            key={index}
            className="inline-block px-1 text-balance md:px-2"
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
        className="mx-auto max-w-2xl text-center text-lg leading-relaxed text-blue-900/80 sm:text-xl sm:leading-relaxed text-balance"
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

/**
 * HeroCTA Component
 * Renders call-to-action buttons with animated effects
 * Features responsive layout and interactive hover states
 *
 * @component
 * @returns {JSX.Element} Animated CTA button section
 */
const HeroCTA = () => {
  return (
    <motion.div
      className="mx-auto mt-8 flex w-full max-w-2xl flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.8, ease }}
    >
      <Link
        href="/chapters/start"
        className={cn(
          "relative w-full overflow-hidden sm:w-auto",
          "group inline-flex items-center justify-center rounded-lg text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          "bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-500 hover:to-blue-400",
          "h-12 px-8 text-base",
        )}
      >
        <span className="relative z-10">Start a Chapter</span>
        <div className="absolute inset-0 -z-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,107,158,0.2)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%,100%_100%] bg-[position:-100%_0,0_0] bg-no-repeat transition-[background-position_0s_ease] duration-[0s] hover:bg-[position:200%_0,0_0] hover:duration-[1000ms]" />
      </Link>
      <Link
        href="/chapters"
        className={cn(
          "w-full sm:w-auto",
          "inline-flex items-center justify-center rounded-lg text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          "border-2 border-blue-200 bg-white text-blue-700 hover:bg-blue-50",
          "h-12 px-8 text-base",
        )}
      >
        Explore Our Chapters
      </Link>
    </motion.div>
  );
};

/**
 * HeroImage Component
 * Displays a video dialog with thumbnail and animation effects
 * Features responsive sizing and backdrop blur effects
 *
 * @component
 * @returns {JSX.Element} Animated hero image/video section
 * 
 *       <HeroVideoDialog
        animationStyle="from-center"
        videoSrc="https://www.youtube.com/embed/dQw4w9WgXcQ"
        thumbnailSrc="/assets/images/hero.webp"
        thumbnailAlt="Kappa Theta Pi Introduction Video"
        className="max-w-screen-md rounded-xl border border-blue-200/50 bg-white/50 shadow-xl shadow-blue-900/5 backdrop-blur-sm"
      />
 */
const HeroImage = () => {
  return (
    <motion.div
      className="relative mx-auto mt-16 flex w-full items-center justify-center"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 1, ease }}
    ></motion.div>
  );
};

/**
 * HeroSection Component
 * Main hero section component that combines all hero elements
 * Features a responsive layout with animated children components
 *
 * @component
 * @returns {JSX.Element} Complete hero section with all subcomponents
 */
export const HeroSection = () => {
  return (
    <section id="hero" className="relative overflow-hidden">
      <div className="relative flex w-full flex-col items-center justify-start px-4 pt-12 sm:px-6 sm:pt-16 md:pt-4 lg:px-8">
        <HeroPill />
        <HeroTitles />
        <HeroCTA />
        <div className="pointer-events-none absolute inset-x-0 -bottom-12 h-1/3 bg-gradient-to-t from-white via-white to-transparent lg:h-1/4" />
        <HeroImage />
      </div>
    </section>
  );
};

export default HeroSection;
