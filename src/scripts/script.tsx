'use client';

import Script from 'next/script';
import { useIsomorphicLayoutEffect } from 'usehooks-ts';

/**
 * Component that manages the inclusion of various external scripts
 * and prevents the default context menu from appearing.
 */
export function Scripts() {
  useIsomorphicLayoutEffect(() => {
    document.addEventListener('contextmenu', (event: MouseEvent) => {
      event.preventDefault();
    });
  }, []);
  // TODO: ffix dangerously set  html
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
