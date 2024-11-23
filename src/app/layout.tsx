import '@/styles/globals.css';

import { auth } from '@/auth';
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
 * @returns {JSX.Element} Root layout structure
 */
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-a11y-animated-images="system"
      data-a11y-link-underlines="false"
    >
      <head>
        <meta name="google-adsense-account" content={process.env.NEXT_PUBLIC_ADSENSE_ID} />
        <Scripts />
      </head>
      <body className={`min-h-screen bg-white overflow-x-hidden`}>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        <Providers session={session}>
          <PageTransition>{children}</PageTransition>
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}

/**
 * Display name for the RootLayout component
 */
RootLayout.displayName = 'RootLayout';
