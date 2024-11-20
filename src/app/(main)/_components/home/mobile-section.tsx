'use client';

import { Icons } from '@/components';
import { motion } from 'framer-motion';
import { memo } from 'react';

/**
 * Animation variants for the container element.
 * Controls the staggered fade-in animation of child elements.
 */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

/**
 * Animation variants for individual items within the container.
 * Provides a spring-based animation that moves elements up while fading in.
 */
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
    },
  },
};

/**
 * MobileSection Component
 *
 * A responsive section component that showcases the KTP Life mobile application.
 * Features animated content, app store download links, and decorative phone mockups.
 *
 * @component
 * @memoized - Component is memoized to prevent unnecessary re-renders
 *
 * Key Features:
 * - Responsive layout that adapts to different screen sizes
 * - Animated content using Framer Motion
 * - Download links for both iOS and Android platforms
 * - Interactive phone mockups with hover effects
 * - Staggered animation effects for enhanced user experience
 *
 * Layout Structure:
 * - Two-column grid on larger screens (single column on mobile)
 * - Left column: Text content and app store buttons
 * - Right column: Decorative phone mockups with overlapping layout
 *
 * Animation Features:
 * - Fade-in animations for all content
 * - Staggered animations for child elements
 * - Hover animations on app store buttons and phone mockups
 *
 * @returns {JSX.Element} A section element containing the mobile app showcase
 */
export const MobileSection = memo(() => {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden">
      <motion.div
        className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <motion.div variants={itemVariants} className="space-y-4 sm:space-y-6 lg:pr-8">
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: '900',
                letterSpacing: '-0.02em',
              }}
            >
              Kappa Theta Pi Life
            </h2>
            <p className="text-[#707070] text-sm sm:text-base md:text-lg max-w-[500px] lg:max-w-none">
              The KTP Life App is your one-stop shop for everything KTP! View upcoming events and
              details personalized to you, never miss important announcements, connect with
              brothers, learn more about our organization, and so much more!
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-start">
              <motion.div
                variants={itemVariants}
                className="p-0 transform hover:scale-105 transition-transform"
              >
                <a
                  href="https://apps.apple.com/us/app/kappa-theta-pi-life/id1641588942"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <Icons.logos.apple
                    size="24"
                    className="w-[120px] sm:w-[140px] md:w-[160px] lg:w-[180px] h-auto cursor-pointer"
                    style={{ aspectRatio: '3/1' }}
                  />
                </a>
              </motion.div>
              <motion.div
                variants={itemVariants}
                className="p-0 transform hover:scale-105 transition-transform"
              >
                <a
                  href="https://play.google.com/store/apps/details?id=com.ktpumich.ktp_rush&pli=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <Icons.logos.android
                    size="24"
                    className="w-[120px] sm:w-[140px] md:w-[160px] lg:w-[180px] h-auto cursor-pointer"
                    style={{ aspectRatio: '3/1' }}
                  />
                </a>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="relative flex justify-center items-center h-[400px] sm:h-[450px] md:h-[500px] lg:h-[600px] mt-8"
          >
            <div className="relative h-full w-full flex items-center justify-center">
              <Icons.phones.phone3
                size="96"
                className="absolute -translate-y-16 sm:-translate-y-20 md:-translate-y-24 lg:-translate-y-32
                          -translate-x-4 sm:-translate-x-6 md:-translate-x-8 lg:-translate-x-12
                          z-10 w-40 sm:w-48 md:w-56 lg:w-64
                          transform hover:scale-105 transition-transform duration-300"
              />
              <Icons.phones.phone4
                size="96"
                className="absolute translate-y-16 sm:translate-y-20 md:translate-y-24 lg:translate-y-32
                          translate-x-4 sm:translate-x-6 md:translate-x-8 lg:translate-x-12
                          z-20 w-40 sm:w-48 md:w-56 lg:w-64
                          transform hover:scale-105 transition-transform duration-300"
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
});

MobileSection.displayName = 'MobileSection';
export default MobileSection;
