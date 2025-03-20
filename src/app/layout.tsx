import '@/styles/globals.css';
import { GlobalProvider } from '@/app/_providers';
import { env } from '@/env';
import { Scripts } from '@/scripts';
import { constructMetadata, constructViewport } from '@/utils';
import localFont from 'next/font/local';
import { headers } from 'next/headers';

/** Application metadata constructed from utility function */
export const metadata = constructMetadata();

/** Viewport configuration constructed from utility function */
export const viewport = constructViewport();

const sourceFont = localFont({
  src: [
    {
      path: '../../public/assets/fonts/SourceSans3-VariableFont_wght.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/assets/fonts/SourceSans3-Italic-VariableFont_wght.ttf',
      weight: '400',
      style: 'italic',
    },
  ],
  variable: '--font-source',
  display: 'swap',
  preload: true,
});

const palatinoFont = localFont({
  src: '../../public/assets/fonts/palatino.ttf',
  variable: '--font-palatino',
  display: 'swap',
  preload: true,
});

/**
 * Root layout component that wraps the entire application
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render
 * @returns {React.JSX.Element} Root layout structure
 */
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const pathname = headersList.get('x-url') || '';
  console.log(pathname);
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-a11y-animated-images="system"
      data-a11y-link-underlines="false"
      className={`${sourceFont.variable} ${palatinoFont.variable}`}
    >
      <head>
        <meta
          name="google-site-verification"
          content="VBE7MGGVF5cIh-gYXQcDVhonxXv3wJKQqCsQvCjUY1k"
        />

        <meta name="google-adsense-account" content={env.NEXT_PUBLIC_ADSENSE_ID} />

        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="theme-color" content="#234c8b" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        <meta name="referrer" content="no-referrer" />

        <link rel="canonical" href={`${env.NEXT_PUBLIC_APP_URL}${pathname}`} />
        <meta name="language" content="English" />
        <meta name="geo.region" content="US" />
        <meta name="geo.placename" content="Miami, FL" />

        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.google-analytics.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.google.com" crossOrigin="anonymous" />

        <Scripts />
      </head>
      <body className="min-h-screen bg-white overflow-x-hidden">
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${env.NEXT_PUBLIC_GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <GlobalProvider>{children}</GlobalProvider>
      </body>
    </html>
  );
}

RootLayout.displayName = 'RootLayout';
