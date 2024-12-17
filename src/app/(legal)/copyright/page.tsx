import { constructMetadata } from '@/utils';
import dynamic from 'next/dynamic';
import React from 'react';

export const metadata = constructMetadata({ title: 'Copyright' });

const LegalCopyright = dynamic(() => import('../_components').then((mod) => mod.LegalCopyright));

/**
 * Copyright component that displays the copyright page.
 *
 * @component
 * @description A simple React functional component that renders the copyright section of the application.
 * The component currently displays a basic header with the text "Copyright".
 *
 * @example
 * ```jsx
 * <Copyright />
 * ```
 *
 * @returns {React.JSX.Element} A div container with a h1 heading displaying "Copyright"
 *
 * @example
 * ```jsx
 * // Basic usage
 * import Copyright from './Copyright';
 *
 * function Footer() {
 *   return (
 *     <footer>
 *       <Copyright />
 *     </footer>
 *   );
 * }
 * ```
 */
const Copyright = () => {
  return <LegalCopyright />;
};

Copyright.displayName = 'Copyright';

export default Copyright;
