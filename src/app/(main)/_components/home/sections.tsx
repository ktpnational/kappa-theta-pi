'use client';

import React from 'react';
import { BlogSection, CtaSection, HeroSection, MapSection, SponsorsSection } from './';

export const HomeSections = () => {
  return (
    <>
      <HeroSection />
      <SponsorsSection />
      <MapSection />
      <BlogSection />
      <CtaSection />
    </>
  );
};

HomeSections.displayName = 'HomeSections';
