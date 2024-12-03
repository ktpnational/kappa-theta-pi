//script.tsx

"use client";

import { Redacted } from "@/classes";
import Script from "next/script";
import { useCallback, useEffect, useRef } from "react";
import { flushSync } from "react-dom";

// Type for PreloadConfig
type PreloadConfig = {
  prerenderPaths: string[];
  prefetchPaths: string[];
  excludePaths: string[];
};

export function Scripts() {
  const config: PreloadConfig = {
    prerenderPaths: ["/", "/about", "/chapters", "/contact", "/resources"],
    prefetchPaths: [
      "/auth/login",
      "/auth/register",
      "/legal/privacy",
      "/legal/terms",
    ],
    excludePaths: ["/auth/*", "/dashboard/*", "/settings", "/api/*"],
  };

  const observerRef = useRef<IntersectionObserver | null>(null);
  const speculationScriptsRef = useRef<Set<string>>(new Set());

  const handleContextMenu = useCallback((event: MouseEvent) => {
    event.preventDefault();
  }, []);

  const handleViewTransition = useCallback(() => {
    if (!document.startViewTransition) return;

    document.startViewTransition(() => {
      flushSync(() => {
        document.body.classList.add("view-transition-group");
        document.body.classList.remove("view-transition-group");
      });
    });
  }, []);

  const createSpeculationScript = useCallback((rules: object) => {
    const script = document.createElement("script");
    script.type = "speculationrules";
    script.text = JSON.stringify(rules);
    return script;
  }, []);

  const addDynamicSpeculation = useCallback(
    (link: string) => {
      if (speculationScriptsRef.current.has(link)) return;

      const rules = {
        prefetch: [
          {
            source: "list",
            urls: [link],
          },
        ],
      };

      const script = createSpeculationScript(rules);
      document.head.appendChild(script);
      speculationScriptsRef.current.add(link);
    },
    [createSpeculationScript]
  );

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const link = entry.target.getAttribute("href");
          if (link && link.startsWith("/")) {
            addDynamicSpeculation(link);
          }
        }
      });
    },
    [addDynamicSpeculation]
  );

  useEffect(() => {
    observerRef.current = new IntersectionObserver(handleIntersection, {
      threshold: 0.1,
      rootMargin: "50px",
    });

    const links = document.querySelectorAll('a[href^="/"]');
    links.forEach((link) => observerRef.current?.observe(link));

    document.addEventListener("contextmenu", handleContextMenu);
    window.addEventListener("navigate", handleViewTransition);

    return () => {
      observerRef.current?.disconnect();
      document.removeEventListener("contextmenu", handleContextMenu);
      window.removeEventListener("navigate", handleViewTransition);

      speculationScriptsRef.current.forEach((link) => {
        const script = document.querySelector(
          `script[data-speculation="${link}"]`
        );
        script?.remove();
      });
    };
  }, [handleContextMenu, handleIntersection, handleViewTransition]);

  const baseSpeculationRules = {
    prerender: [
      {
        source: "list",
        urls: config.prerenderPaths,
        eagerness: "moderate",
      },
      {
        where: {
          and: [
            { href_matches: "/*" },
            ...config.excludePaths.map((path) => ({
              not: { href_matches: path },
            })),
          ],
        },
        eagerness: "conservative",
      },
    ],
    prefetch: [
      {
        source: "list",
        urls: config.prefetchPaths,
      },
      {
        where: {
          and: [
            { href_matches: "/resources/*" },
            { not: { selector_matches: "[data-no-prefetch]" } },
          ],
        },
        eagerness: "conservative",
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

      <Script
        strategy="beforeInteractive"
        src={`https://maps.googleapis.com/maps/api/js?key=${Redacted.make(
          process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
          "default-maps-api-key"
        )}&libraries=maps,marker&v=beta&callback=Function.prototype`}
        id="google-maps"
      />

      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${Redacted.make(
          process.env.NEXT_PUBLIC_GA_TRACKING_ID,
          "default-ga-id"
        )}`}
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
            gtag('config', '${Redacted.make(
              process.env.NEXT_PUBLIC_GA_TRACKING_ID,
              "default-ga-id"
            )}', {
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
              "default-gtm-id"
            )}');
          `,
        }}
      />

      <Script
        async
        strategy="afterInteractive"
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${Redacted.make(
          process.env.NEXT_PUBLIC_ADSENSE_ID,
          "default-adsense-id"
        )}`}
        crossOrigin="anonymous"
        id="google-adsense"
      />
    </>
  );
}
