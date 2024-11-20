import { constructMetadata } from '@/utils';
import React from 'react';
import { LegalPrivacy } from '../_components';

export const metadata = constructMetadata({
  title: 'Privacy',
});

/**
 * Privacy component that displays the privacy policy page.
 *
 * @component
 * @description A simple React functional component that renders the privacy policy section of the application.
 * The component currently displays a basic header with the text "Privacy".
 *
 * @example
 * ```jsx
 * <Privacy />
 * ```
 *
 * @returns {JSX.Element} A div container with a h1 heading displaying "Privacy"
 *
 * @since 1.0.0
 * @version 1.0.0
 * @category Components
 * @subcategory Pages
 */
const Privacy = () => {
  return <LegalPrivacy />;
};

Privacy.displayName = 'Privacy';

export default Privacy;
