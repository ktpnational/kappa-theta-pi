'use client';

import { Button } from '@/components/ui';
import Link from 'next/link';
import React from 'react';

export const CtaSection = () => {
  return (
    <section className="text-center mb-16 md:mb-24 bg-[#234c8b] text-white py-12 px-4 rounded-lg shadow-lg">
      <h2 className="text-4xl font-bold mb-6">Join Kappa Theta Pi</h2>
      <p className="text-xl mb-8 max-w-2xl mx-auto">
        Be part of the premier national technology fraternity and shape the future of tech
      </p>
      <Link href="/join-us">
        <Button size="lg" className="bg-[#538b52] text-white hover:bg-[#8ddd8d]">
          Apply to ΚΘΠ Now
        </Button>
      </Link>
    </section>
  );
};

CtaSection.displayName = 'CtaSection';
