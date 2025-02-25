'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { Suspense } from 'react';
import type React from 'react';

/**
 * Animation variants for the container element.
 * Controls the staggered animation of child elements.
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
 * Defines spring animation for y-axis movement and opacity.
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
 * Skeleton loading component for the CTA section.
 * Displays placeholder content while the main content is loading.
 *
 * @returns {React.ReactElement} A skeleton UI with animated loading states
 */
const CTASectionSkeleton = () => (
  <section id="cta" className="my-16 md:my-24 px-4">
    <Card className="max-w-4xl mx-auto p-8 md:p-12 bg-gradient-to-br from-[#234c8b] to-[#458eff]">
      <div className="space-y-6 text-center">
        <Skeleton className="h-10 w-2/3 mx-auto bg-white/20" />
        <Skeleton className="h-6 w-3/4 mx-auto bg-white/20" />
        <Skeleton className="h-11 w-40 mx-auto bg-white/20" />
      </div>
    </Card>
  </section>
);

/**
 * Main content component for the CTA (Call-to-Action) section.
 * Features animated entrance effects and interactive elements.
 *
 * @returns {React.ReactElement} The main CTA content with animations and styling
 */
const CTAContent = () => (
  <motion.div
    className="max-w-4xl mx-auto text-center p-8 md:p-12 rounded-2xl shadow-2xl bg-gradient-to-br from-[#234c8b] to-[#458eff] text-white overflow-hidden relative"
    variants={containerVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.8 }}
  >
    {/* <motion.div
      className="absolute inset-0 bg-[url('/circuit-board.svg')] opacity-10"
      initial={{ opacity: 0, scale: 1.1 }}
      animate={{ opacity: 0.1, scale: 1 }}
      transition={{ duration: 1.5 }}
    /> */}
    <motion.h2 className="text-3xl md:text-4xl font-bold mb-6 relative" variants={itemVariants}>
      Join Kappa Theta Pi
    </motion.h2>
    <motion.p
      className="text-lg md:text-xl mb-8 max-w-2xl mx-auto relative"
      variants={itemVariants}
    >
      Be part of the premier national technology fraternity and shape the future of tech
    </motion.p>
    <motion.div variants={itemVariants}>
      <Link href="/chapters/start" passHref>
        <Button
          size="lg"
          className="bg-[#538b52] text-white hover:bg-[#8ddd8d] transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg group"
        >
          Start a Chapter
          <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
        </Button>
      </Link>
    </motion.div>
  </motion.div>
);

/**
 * The main CTA Section component that wraps the content with Suspense.
 * Provides a loading fallback while the main content is being rendered.
 *
 * @component
 * @example
 * ```tsx
 * <CtaSection />
 * ```
 *
 * Features:
 * - Responsive design with different spacing on mobile and desktop
 * - Animated entrance effects using Framer Motion
 * - Loading skeleton fallback
 * - Interactive button with hover effects
 * - Background pattern with gradient overlay
 *
 * @returns {React.ReactElement} The complete CTA section with loading handling
 */
export const CtaSection: React.FC = () => {
  return (
    <section className="my-16 md:my-24 px-4">
      <Suspense fallback={<CTASectionSkeleton />}>
        <CTAContent />
      </Suspense>
    </section>
  );
};

CtaSection.displayName = 'CtaSection';
export default CtaSection;
