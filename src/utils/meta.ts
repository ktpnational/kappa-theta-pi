import { app } from '@/constants';
import type { Metadata, Viewport } from 'next';

// Remove ' - National'
const cleaned_title = app.name.replace(' - National', '');

/**
 * Constructs metadata for the application.
 *
 * @param {Object} [options] - The options for constructing metadata.
 * @param {string} [options.title=`${app.name}`] - The title of the application.
 * @param {string} [options.description=`${app.description}`] - The description of the application.
 * @param {string} [options.image='/opengraph-image.png'] - The URL of the Open Graph image.
 * @param {string} [options.twitter='/twitter-image.png'] - The URL of the Twitter image.
 * @param {string} [options.icons='/assets/svgs/logo.svg'] - The URL of the icons.
 * @param {boolean} [options.noIndex=false] - Whether to set noIndex for robots.
 * @param {string} [options.url=app.url] - The URL of the application.
 * @returns {Metadata} - The constructed metadata.
 */
export function constructMetadata({
  title = cleaned_title,
  description = `${app.description}`,
  image = '/api/og',
  twitter = '/api/og',
  icons = '/assets/svgs/logo.svg',
  noIndex = false,
  url = app.url,
}: {
  title?: string;
  description?: string;
  image?: string;
  twitter?: string;
  icons?: string;
  noIndex?: boolean;
  url?: string;
} = {}): Metadata {
  return {
    title: {
      default: title,
      template: `${title} | %s`,
    },
    description: description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
      siteName: title,
      url,
      type: 'website',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [twitter],
      creator: '@OdnisMike',
    },
    icons: [
      {
        url: icons,
        href: icons,
      },
    ],
    category: 'education',
    manifest: '/manifest.webmanifest',
    metadataBase: new URL(url),

    other: {
      currentYear: new Date().getFullYear(),
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}

/**
 * Constructs viewport settings for the application.
 *
 * @returns {Viewport} - The constructed viewport settings.
 */
export function constructViewport(): Viewport {
  return {
    width: 'device-width',
    height: 'device-height',
    initialScale: 1,
    minimumScale: 1,
    maximumScale: 5,
    userScalable: true,
    viewportFit: 'cover',
    interactiveWidget: 'resizes-visual',
    themeColor: [
      { media: '(prefers-color-scheme: light)', color: '#8bb9ff' },
      { media: '(prefers-color-scheme: dark)', color: '#234c8b' },
    ],
    colorScheme: 'dark light',
  };
}
