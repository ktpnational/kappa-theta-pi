'use client';

import React from 'react';
import { LegalHeader } from '../_client';

/**
 * LegalTerms Component
 *
 * A client-side React component that renders the Terms of Service page.
 * This component is marked with 'use client' directive to indicate it runs on the client side.
 *
 * @component
 * @example
 * ```jsx
 * <LegalTerms />
 * ```
 *
 * @returns {JSX.Element} A React fragment containing the LegalHeader component with "Terms of Service" title
 *
 * Key Features:
 * - Uses the LegalHeader component to display the page title
 * - Implements a simple layout for legal terms content
 * - Client-side rendered component
 *
 * @see {@link LegalHeader} For the header component implementation
 */
export const LegalTerms = () => {
  return (
    <>
      <LegalHeader title={'Terms of Service'} />
    </>
  );
};

LegalTerms.displayName = 'LegalTerms';
export default LegalTerms;
