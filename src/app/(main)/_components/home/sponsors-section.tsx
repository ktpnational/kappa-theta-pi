import Marquee from '@/components/ui/marquee';
import { companies } from '@/constants';
import Image from 'next/image';

/**
 * SponsorsSection Component
 *
 * A section component that displays a horizontally scrolling marquee of company logos
 * to showcase trusted companies/partners.
 *
 * @component
 *
 * @example
 * ```jsx
 * <SponsorsSection />
 * ```
 *
 * Features:
 * - Horizontally scrolling marquee effect
 * - Gradient fade effect on edges
 * - Dark mode support for logos
 * - Responsive container padding
 *
 * Dependencies:
 * - @/components/ui/marquee - Custom marquee component
 * - @/constants - Contains companies array
 * - next/image - Next.js Image component for optimized images
 *
 * @returns {JSX.Element} A section containing a marquee of company logos
 */
export const SponsorsSection = () => {
  return (
    <section id="logos">
      <div className="container mx-auto px-4 md:px-8 py-12">
        <h3 className="text-center text-sm font-semibold text-gray-500">
          TRUSTED BY LEADING TEAMS
        </h3>
        <div className="relative mt-6">
          <Marquee className="max-w-full [--duration:40s]">
            {companies.map((logo, idx) => (
              <Image
                key={idx}
                width={112}
                height={40}
                src={`https://cdn.magicui.design/companies/${logo}.svg`}
                className="h-10 w-28 dark:brightness-0 dark:invert grayscale opacity-30"
                alt={logo}
              />
            ))}
          </Marquee>
          <div className="pointer-events-none absolute inset-y-0 left-0 h-full w-1/3 bg-gradient-to-r from-background"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 h-full w-1/3 bg-gradient-to-l from-background"></div>
        </div>
      </div>
    </section>
  );
};

SponsorsSection.displayName = 'SponsorsSection';
