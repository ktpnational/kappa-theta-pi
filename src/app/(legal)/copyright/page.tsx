import React from 'react';

/**
 * @component Copyright
 * @description A React component that displays a copyright notice or statement.
 * This simple component renders a heading containing the word "Copyright"
 * in a div container. It can be used in footers or other areas where
 * copyright information needs to be displayed.
 *
 * @returns {JSX.Element} A div containing an h1 heading with "Copyright" text
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
  return (
    <div>
      <h1>Copyright</h1>
    </div>
  );
};

Copyright.displayName = 'Copyright';

export default Copyright;
