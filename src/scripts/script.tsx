'use client';

import { Redacted } from '@/classes';
import Script from 'next/script';
import { useCallback, useEffect, useRef } from 'react';
import { flushSync } from 'react-dom';

/**
 * Configuration type for preload/prefetch behavior
 * @typedef {Object} PreloadConfig
 * @property {string[]} prerenderPaths - Paths to prerender eagerly for instant navigation
 * @property {string[]} prefetchPaths - Paths to prefetch in the background
 * @property {string[]} excludePaths - Paths to exclude from preloading
 */
type PreloadConfig = {
  prerenderPaths: string[];
  prefetchPaths: string[];
  excludePaths: string[];
};

/**
 * Component that manages external scripts, view transitions, and speculation rules
 * for optimized page loading and navigation performance.
 *
 * Features:
 * - Manages speculation rules for prerendering and prefetching
 * - Handles view transitions for smooth page changes
 * - Loads and configures external scripts (Google Analytics, Maps, etc)
 * - Implements intersection observer for dynamic prefetching
 * - Prevents context menu on right click
 *
 * @component
 * @example
 * ```tsx
 * // In head section of document
 * <Scripts />
 * ```
 */
export function Scripts() {
  const schemaOrg = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Kappa Theta Pi',
    url: 'https://www.kappathetapi.org',
    image: 'https://www.kappathetapi.com/logo.png',
    logo: 'https://www.kappathetapi.com/logo.png',
    sameAs: ['https://www.facebook.com/kappathetapi', 'https://www.instagram.com/kappathetapi'],
  };

  /**
   * Configuration object defining paths for preloading behavior
   */
  const config: PreloadConfig = {
    prerenderPaths: ['/', '/about', '/chapters', '/contact', '/resources'],
    prefetchPaths: ['/auth/login', '/auth/register', '/legal/privacy', '/legal/terms'],
    excludePaths: ['/auth/*', '/dashboard/*', '/settings', '/api/*'],
  };

  /**
   * Ref to store the intersection observer instance
   */
  const observerRef = useRef<IntersectionObserver | null>(null);

  /**
   * Ref to track which links have already had speculation rules added
   */
  const speculationScriptsRef = useRef<Set<string>>(new Set());

  /**
   * Prevents default context menu behavior
   * @param {MouseEvent} event - The context menu event
   */
  const handleContextMenu = useCallback((event: MouseEvent) => {
    event.preventDefault();
  }, []);

  /**
   * Handles view transitions between pages using the View Transitions API
   * Adds and removes transition classes for animation
   */
  const handleViewTransition = useCallback(() => {
    if (!document.startViewTransition) return;

    document.startViewTransition(() => {
      flushSync(() => {
        document.body.classList.add('view-transition-group');
        document.body.classList.remove('view-transition-group');
      });
    });
  }, []);

  /**
   * Creates a speculation rules script element
   * @param {object} rules - The speculation rules to apply
   * @returns {HTMLScriptElement} The created script element
   */
  const createSpeculationScript = useCallback((rules: object) => {
    const script = document.createElement('script');
    script.type = 'speculationrules';
    script.text = JSON.stringify(rules);
    return script;
  }, []);

  /**
   * Adds dynamic speculation rules for a specific link
   * @param {string} link - The URL to add speculation rules for
   */
  const addDynamicSpeculation = useCallback(
    (link: string) => {
      if (speculationScriptsRef.current.has(link)) return;

      const rules = {
        prefetch: [
          {
            source: 'list',
            urls: [link],
          },
        ],
      };

      const script = createSpeculationScript(rules);
      document.head.appendChild(script);
      speculationScriptsRef.current.add(link);
    },
    [createSpeculationScript],
  );

  /**
   * Handles intersection observer entries
   * Adds speculation rules for links as they become visible
   * @param {IntersectionObserverEntry[]} entries - The intersection entries to process
   */
  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const link = entry.target.getAttribute('href');
          if (link && link.startsWith('/')) {
            addDynamicSpeculation(link);
          }
        }
      });
    },
    [addDynamicSpeculation],
  );

  /**
   * Sets up intersection observer, event listeners, and cleanup
   * - Initializes intersection observer for link prefetching
   * - Adds event listeners for context menu and navigation
   * - Cleans up observers and listeners on unmount
   */
  useEffect(() => {
    observerRef.current = new IntersectionObserver(handleIntersection, {
      threshold: 0.1,
      rootMargin: '50px',
    });

    const links = document.querySelectorAll('a[href^="/"]');
    links.forEach((link) => observerRef.current?.observe(link));

    document.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('navigate', handleViewTransition);

    return () => {
      observerRef.current?.disconnect();
      document.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('navigate', handleViewTransition);

      speculationScriptsRef.current.forEach((link) => {
        const script = document.querySelector(`script[data-speculation="${link}"]`);
        script?.remove();
      });
    };
  }, [handleContextMenu, handleIntersection, handleViewTransition]);

  /**
   * Base speculation rules configuration for prerendering and prefetching
   * Defines rules for:
   * - Prerendering specific paths with different eagerness levels
   * - Prefetching paths and patterns with conditions
   * - Excluding certain paths from speculation
   */
  const baseSpeculationRules = {
    prerender: [
      {
        source: 'list',
        urls: config.prerenderPaths,
        eagerness: 'moderate',
      },
      {
        where: {
          and: [
            { href_matches: '/*' },
            ...config.excludePaths.map((path) => ({ not: { href_matches: path } })),
          ],
        },
        eagerness: 'conservative',
      },
    ],
    prefetch: [
      {
        source: 'list',
        urls: config.prefetchPaths,
      },
      {
        where: {
          and: [
            { href_matches: '/resources/*' },
            { not: { selector_matches: '[data-no-prefetch]' } },
          ],
        },
        eagerness: 'conservative',
      },
    ],
  };
  return (
    <>
      <Script
        id="speculation-rules"
        strategy="beforeInteractive"
        type="speculationrules"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(baseSpeculationRules),
        }}
      />

      {/* External Scripts */}
      <Script
        strategy="beforeInteractive"
        src={`https://maps.googleapis.com/maps/api/js?key=${Redacted.make(
          process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        ).getValue()}&libraries=maps,marker&v=beta&callback=Function.prototype`}
        id="google-maps"
      />

      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${Redacted.make(
          process.env.NEXT_PUBLIC_GA_TRACKING_ID,
        ).getValue()}`}
        id="google-analytics-script"
      />

      <Script
        strategy="afterInteractive"
        id="google-analytics-config"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${Redacted.make(process.env.NEXT_PUBLIC_GA_TRACKING_ID).getValue()}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />

      <Script
        strategy="afterInteractive"
        id="google-tag-manager"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){
              w[l]=w[l]||[];
              w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
              var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),
                  dl=l!='dataLayer'?'&l='+l:'';
              j.async=true;
              j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
              f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${Redacted.make(
              process.env.NEXT_PUBLIC_GTM_ID,
            ).getValue()}');
          `,
        }}
      />

      <Script
        async
        strategy="afterInteractive"
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${Redacted.make(
          process.env.NEXT_PUBLIC_ADSENSE_ID,
        ).getValue()}`}
        crossOrigin="anonymous"
        id="google-adsense"
      />

      <Script
        type="application/ld+json"
        id="schema-org"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaOrg),
        }}
      />
    </>
  );
}
