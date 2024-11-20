import { constructMetadata } from '@/utils';
import React from 'react';
import { LegalTerms } from '../_components';

export const metadata = constructMetadata({ title: 'Terms' });

/**
 * Terms Component
 * @description A React component that renders the Terms and Conditions page
 * @component
 * @example
 * ```tsx
 * import Terms from './Terms';
 *
 * // Basic usage
 * <Terms />
 * ```
 * @returns {JSX.Element} A div containing the Terms heading
 * @since 1.0.0
 * @public
 * @category Components
 * @subcategory Static Pages
 * @maintainer Your Name <your@email.com>
 * @status Stable
 * @version 1.0.0
 */
const Terms = (): JSX.Element => {
  return <LegalTerms />;
};

Terms.displayName = 'Terms';

export default Terms;
