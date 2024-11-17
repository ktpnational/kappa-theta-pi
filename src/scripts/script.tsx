'use client';

import Script from 'next/script';
import { useIsomorphicLayoutEffect } from 'usehooks-ts';

/**
 * Component that manages the inclusion of various external scripts and disables context menu functionality.
 *
 * @component
 * @description
 * This component handles the integration of multiple external scripts including:
 * - Google Maps JavaScript API with beta features
 * - Google Analytics tracking script
 * - Google Tag Manager implementation
 *
 * It also prevents the default context menu from appearing on right-click by adding
 * an event listener to the document object.
 *
 *
 * @remarks
 * The component uses different loading strategies for scripts:
 * - 'lazyOnload' for Google Maps to defer loading until other resources are loaded
 * - 'afterInteractive' for analytics to load after the page becomes interactive
 *
 * @returns {JSX.Element} A fragment containing multiple Script components for external services
 */
export function Scripts() {
  useIsomorphicLayoutEffect(() => {
    document.addEventListener('contextmenu', (event: MouseEvent) => {
      event.preventDefault();
    });
  }, []);
  return (
    <>
      <Script
        strategy="lazyOnload"
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=maps,marker&v=beta`}
        id="google-maps"
      />
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_TRACKING_ID}`}
      />
      <Script
        strategy="afterInteractive"
        id="google-analytics"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_TRACKING_ID}');
          `,
        }}
      />
      <Script
        strategy="afterInteractive"
        id="google-tag-manager"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||
            [];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.
            js'});var f=d.
            getElementsByTagName(s)[0],
            j=d.createElement(s),
            dl=l!='dataLayer'?'&l='+l:'';j.
            async=true;j.src=
            'https://www.googletagmanager.
            com/gtm.js?id='+i+dl;f.
            parentNode.insertBefore(j,f);
            })(window,document,'script',
            'dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');
          `,
        }}
      />
    </>
  );
}
