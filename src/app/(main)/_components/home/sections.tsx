'use client';

import React from 'react';
import { ContactSection, CtaSection, HeroSection, MapSection, SponsorsSection } from './';

export const HomeSections = () => {
  return (
    <>
      <HeroSection />
      <SponsorsSection />
      <MapSection />
      <ContactSection />
      <CtaSection />
    </>
  );
};

HomeSections.displayName = 'HomeSections';
