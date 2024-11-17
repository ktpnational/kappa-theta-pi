'use client';

import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { memo } from 'react';
import { AnimatedBackground } from '.';

/**
 * The NotFound component renders a 404 error page with an animated background.
 *
 * @component
 * @description A memoized component that displays a 404 error page with a heading,
 * subheading, and a button to return to the home page. The page includes an animated
 * background and is fully responsive.
 *
 * @example
 * ```tsx
 * <NotFound />
 * ```
 *
 * @returns {JSX.Element} A React component that renders the 404 error page layout
 * with animated background, error message, and navigation button.
 *
 * @remarks
 * - Uses the 'use client' directive for Next.js client-side rendering
 * - Implements responsive design using Tailwind CSS classes
 * - Includes an animated background component
 * - Features custom font styling using Palatino serif
 * - Provides a home navigation button with Lucide React icons
 */
export const NotFound = memo(() => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden p-4">
      <AnimatedBackground />
      <div className="z-10 text-center">
        <h1
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold text-white mb-2 sm:mb-4"
          style={{
            fontFamily: 'Palatino, serif',
            textShadow: '0 0 10px rgba(0,0,0,0.2)',
          }}
        >
          404
        </h1>
        <h2
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-8"
          style={{
            fontFamily: 'Palatino, serif',
          }}
        >
          Page Not Found
        </h2>
        <Button asChild size="lg" className="font-semibold text-base sm:text-lg">
          <Link href="/" className="flex items-center">
            <Home className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
            Return home
          </Link>
        </Button>
      </div>
    </div>
  );
});

NotFound.displayName = 'NotFound';
