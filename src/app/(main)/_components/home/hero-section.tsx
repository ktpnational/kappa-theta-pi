'use client';

import { Button } from '@/components/ui';
import Link from 'next/link';
import React from 'react';

export const HeroSection = () => {
  return (
    <section className="text-center mb-16 md:mb-24">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-[#234c8b] leading-tight">
        Source Sans 3
      </h1>
      <p className="text-xl md:text-2xl mb-8 text-[#234c8b]">
        Uniting tech enthusiasts and future innovators across the nation
      </p>
      <p className="text-lg mb-8 max-w-3xl mx-auto">
        Our mission is to foster a community of technology leaders and innovators, providing
        opportunities for professional development, networking, and collaborative learning.
      </p>
      <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
        <Link href="/join-us">
          <Button size="lg" className="w-full sm:w-auto bg-[#234c8b] text-white hover:bg-[#458eff]">
            Join Kappa Theta Pi
          </Button>
        </Link>
        <Link href="/chapters">
          <Button
            size="lg"
            variant="outline"
            className="w-full sm:w-auto border-[#234c8b] text-[#234c8b] hover:bg-[#458eff] hover:text-white"
          >
            Explore Our Chapters
          </Button>
        </Link>
      </div>
    </section>
  );
};

HeroSection.displayName = 'HeroSection';
