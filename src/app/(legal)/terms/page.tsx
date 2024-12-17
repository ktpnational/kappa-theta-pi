import { constructMetadata } from '@/utils';
import dynamic from 'next/dynamic';
import type React from 'react';

export const metadata = constructMetadata({ title: 'Terms' });

const LegalTerms = dynamic(() => import('../_components').then((mod) => mod.LegalTerms));

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
 * @returns {React.JSX.Element} A div containing the Terms heading
 * @since 1.0.0
 * @public
 * @category Components
 * @subcategory Static Pages
 * @maintainer Your Name <your@email.com>
 * @status Stable
 * @version 1.0.0
 */
const Terms = (): React.JSX.Element => {
  return <LegalTerms />;
};

Terms.displayName = 'Terms';

export default Terms;
