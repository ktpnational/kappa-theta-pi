'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import type React from 'react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

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

export const CtaSection: React.FC = () => {
  return (
    <section className="my-16 md:my-24 px-4">
      <motion.div
        className="max-w-4xl mx-auto text-center p-8 md:p-12 rounded-2xl shadow-2xl bg-gradient-to-br from-[#234c8b] to-[#458eff] text-white overflow-hidden relative"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.8 }}
      >
        <motion.div
          className="absolute inset-0 bg-[url('/circuit-board.svg')] opacity-10"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 1.5 }}
        />
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
          <Link href="/join" passHref>
            <Button
              size="lg"
              className="bg-[#538b52] text-white hover:bg-[#8ddd8d] transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg group"
            >
              Apply to ΚΘΠ Now
              <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

CtaSection.displayName = 'CtaSection';
export default CtaSection;
