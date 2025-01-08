import '@/styles/globals.css';
import { getServerSession } from 'next-auth';
import { PageTransition } from '@/components';
import { Providers } from '@/providers';
import { Scripts } from '@/scripts';
import { constructMetadata, constructViewport } from '@/utils';
import { Analytics } from '@vercel/analytics/react';
import type { NextWebVitalsMetric } from 'next/app';

/** Application metadata constructed from utility function */
export const metadata = constructMetadata();

/** Viewport configuration constructed from utility function */
export const viewport = constructViewport();

/**
 * Reports web vitals metrics for performance monitoring
 * @param {NextWebVitalsMetric} metric - The web vital metric to report
 */
export const reportWebVitals = (metric: NextWebVitalsMetric) => {
  if (metric.label === 'web-vital') {
    console.log(metric);
  }
};

/**
 * Root layout component that wraps the entire application
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render
 * @returns {React.JSX.Element} Root layout structure
 */
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Replace this line with the correct call for your Auth library
  // For example, if you're using NextAuth:
  const session = await getServerSession(); 
  // Or: const session = await auth(); // if your custom `@/auth` actually exports `auth()`.

  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-a11y-animated-images="system"
      data-a11y-link-underlines="false"
    >
      <head>
        <meta
          name="google-site-verification"
          content="VBE7MGGVF5cIh-gYXQcDVhonxXv3wJKQqCsQvCjUY1k"
        />

        <meta name="google-adsense-account" content={process.env.NEXT_PUBLIC_ADSENSE_ID} />

        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="theme-color" content="#234c8b" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        <meta name="referrer" content="no-referrer" />

        <link rel="canonical" href={process.env.NEXT_PUBLIC_APP_URL} />
        <meta name="language" content="English" />
        <meta name="geo.region" content="US" />
        <meta name="geo.placename" content="Miami, FL" />

        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://www.google.com" />

        <Scripts />
      </head>
      <body className="min-h-screen bg-white overflow-x-hidden">
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <Providers session={session}>
          <PageTransition>{children}</PageTransition>
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}

RootLayout.displayName = 'RootLayout';
