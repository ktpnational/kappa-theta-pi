'use client';

import React from 'react';
import { LegalHeader } from '../_client';

/**
 * LegalPrivacy Component
 *
 * A client-side React component that renders the privacy policy page header.
 * This component is part of the legal section of the application and uses the
 * 'use client' directive to ensure client-side rendering.
 *
 * @component
 * @example
 * ```tsx
 * <LegalPrivacy />
 * ```
 *
 * @remarks
 * - Uses the LegalHeader component to display the "Privacy Policy" title
 * - Marked as a client component using 'use client' directive
 * - Implements a displayName for better debugging and development tools support
 *
 * @returns {React.JSX.Element} A React component that displays the privacy policy header
 */
export const LegalPrivacy = () => {
  return (
    <>
      <LegalHeader title="Privacy Policy" />
    </>
  );
};

LegalPrivacy.displayName = 'LegalPrivacy';
export default LegalPrivacy;
