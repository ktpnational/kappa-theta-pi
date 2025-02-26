'use client';

import { Marquee } from '@/components/ui/marquee';
import { companies } from '@/constants';
import Image from 'next/image';

/**
 * SponsorsSection Component
 *
 * A section component that displays a horizontally scrolling marquee of company logos
 * to showcase trusted companies and partners. The component creates an engaging visual
 * display with smooth animations and hover effects.
 *
 * @component
 *
 * @example
 * ```jsx
 * // Basic usage
 * <SponsorsSection />
 * ```
 *
 * @remarks
 * The component implements several key features:
 * - Continuous horizontal scrolling using a custom Marquee component
 * - Gradient fade effects on both edges for smooth visual transition
 * - Grayscale company logos with hover animation
 * - Responsive design with mobile-friendly padding
 * - Animated section heading using Framer Motion
 * - Client-side rendering (marked with 'use client' directive)
 *
 * @dependencies
 * - @/components/ui/marquee - Provides the scrolling marquee functionality
 * - @/constants - Contains the companies array with company names
 * - next/image - Next.js Image component for optimized image loading
 * - motion/react - Animation library for heading motion effects
 *
 * @styling
 * The component uses Tailwind CSS classes for styling:
 * - Background color: Light green (#f0f9f0)
 * - Heading color: Blue (#234c8b)
 * - Responsive padding using container class
 * - Gradient overlays for fade effects
 *
 * @accessibility
 * - Images include alt text for screen readers
 * - Marquee pauses on hover for better user interaction
 * - Non-interactive gradient overlays are marked as pointer-events-none
 *
 * @performance
 * - Uses Next.js Image component for optimized image loading
 * - Implements lazy loading for company logos
 * - Minimal re-renders due to static content
 *
 * @returns {JSX.Element} A section element containing:
 * - An animated heading
 * - A marquee of company logos with hover effects
 * - Gradient overlays on both sides
 */
export const SponsorsSection = () => {
  return (
    <section id="sponsors" className="w-full py-12">
      <div className="container px-4 md:px-6">
        <h2 className="text-center text-4xl font-bold tracking-wide text-[#234c8b] mb-4">
          Our Network
        </h2>
        <div className="relative w-full">
          <Marquee className="py-6 bg-none" pauseOnHover>
            {companies.map((company, idx) => (
              <div key={idx} className="relative w-[180px] h-[60px] px-4">
                <Image
                  src={`https://cdn.magicui.design/companies/${company}.svg`}
                  alt={company}
                  className="object-contain w-full h-full grayscale opacity-60 transition-opacity duration-200 hover:opacity-100 hover:grayscale-0"
                  width={112}
                  height={40}
                />
              </div>
            ))}
          </Marquee>
          <div className="pointer-events-none absolute inset-y-0 left-0 h-full w-1/3 bg-gradient-to-r from-white" />
          <div className="pointer-events-none absolute inset-y-0 right-0 h-full w-1/3 bg-gradient-to-l from-white" />
        </div>
      </div>
    </section>
  );
};
SponsorsSection.displayName = 'SponsorsSection';
