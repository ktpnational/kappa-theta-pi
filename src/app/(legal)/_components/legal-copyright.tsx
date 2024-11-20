'use client';
import React from 'react';
import { LegalHeader } from '../_client';

/**
 * LegalCopyright Component
 *
 * A client-side React component that renders the copyright policy page.
 * This component is part of the legal section of the application and displays
 * copyright-related information and policies.
 *
 * @component
 * @example
 * ```tsx
 * <LegalCopyright />
 * ```
 *
 * @returns {JSX.Element} A React component that renders the copyright policy page
 * with a standardized legal header.
 *
 * @remarks
 * - Uses the 'use client' directive for client-side rendering
 * - Implements a consistent layout with other legal pages through LegalHeader
 * - Displays "Copyright Policy" as the page title
 */
export const LegalCopyright = () => {
  return (
    <>
      <LegalHeader title="Copyright Policy" />
    </>
  );
};

LegalCopyright.displayName = 'LegalCopyright';
export default LegalCopyright;
