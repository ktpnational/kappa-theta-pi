'use client';

import React from 'react';
import {
  BlogSection,
  ContactSection,
  CtaSection,
  HeroSection,
  MapSection,
  SponsorsSection,
} from './';

export const HomeSections = () => {
  return (
    <>
      <HeroSection />
      <SponsorsSection />
      <MapSection />
      <BlogSection />
      <ContactSection />
      <CtaSection />
    </>
  );
};

HomeSections.displayName = 'HomeSections';
