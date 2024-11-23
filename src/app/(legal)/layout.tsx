import { Footer, Header } from '@/components';
import { constructMetadata } from '@/utils';
import type React from 'react';

export const metadata = constructMetadata({
  title: 'Legal',
});

/**
 * Layout component for legal pages that provides consistent header, footer and styling
 *
 * @component
 * @description Creates a standardized layout for legal-related pages with centered content and consistent spacing.
 * Includes the site header and footer components while providing a flex container for the main content.
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to be rendered in the main content area
 *
 * @example
 * return (
 *   <LegalLayout>
 *     <PrivacyPolicy />
 *   </LegalLayout>
 * )
 *
 * @returns {JSX.Element} A legal page layout wrapper with header, centered content area, and footer
 */
const LegalLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main className="flex flex-col items-center justify-center min-h-[calc(100dvh-10rem)] container">
        {children}
      </main>
      <Footer />
    </>
  );
};

LegalLayout.displayName = 'LegalLayout';

export default LegalLayout;
