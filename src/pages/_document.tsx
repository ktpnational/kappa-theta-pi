import { Html, Head, Main, NextScript } from "next/document";

/**
 * Custom Document file to extend the HTML structure
 * @returns {JSX.Element} Custom document structure
 */
export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Example: Add custom meta tags or links here */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
