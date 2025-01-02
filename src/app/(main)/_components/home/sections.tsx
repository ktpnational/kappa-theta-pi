import React from "react";
import {
  // BlogSection,
  CtaSection,
  FAQSection,
  HeroSection,
  MapSection,
  // MobileSection,
  SponsorsSection,
} from ".";

/**
 * React component that renders the main sections of the home page
 *
 * @component
 * @example
 * return (
 *   <HomeSections />
 * )
 *
 * @returns {JSX.Element} A React Fragment containing the following sections:
 * - HeroSection: Main banner/hero section
 * - SponsorsSection: Section displaying sponsor logos/info
 * - MapSection: Geographic map section
 * - ContactSection: Contact form/info section
 * - CtaSection: Call-to-action section
 *
 * @remarks
 * This component uses the 'use client' directive for Next.js client-side rendering.
 * It serves as the main layout component combining all major sections of the homepage.
 * Sections are rendered in a specific order to create the page flow.
 */
export const HomeSections = () => {
  return (
    <>
      <HeroSection />
      <SponsorsSection />
      <MapSection />
      <FAQSection />
      {/* <BlogSection /> */}
      <CtaSection />
      {/* <MobileSection /> */}
    </>
  );
};

HomeSections.displayName = "HomeSections";
