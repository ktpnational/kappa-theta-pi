import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: 'Googlebot',
        allow: ['/api/og/*'],
        disallow: ['/api/', '/legal'],
      },
      {
        userAgent: ['Applebot', 'Bingbot'],
        allow: ['/api/og/*'],
        disallow: ['/api/', '/legal'],
      },
    ],
    sitemap: `https://www.kappathetapi.org/sitemap.xml`,
  };
}
