import pwa, { type PluginOptions } from '@ducanh2912/next-pwa';
import MillionLint from '@million/lint';
import withBundleAnalyzer from '@next/bundle-analyzer';
import { type SentryBuildOptions, withSentryConfig } from '@sentry/nextjs';
import type { NextConfig } from 'next';
import './src/env';
import path from 'path';
import webpack from 'webpack';

// Just in case you accidentally import these packages
const EXEMPT_DEPS: Set<string> = new Set([
  'lucide-react',
  'date-fns',
  'lodash-es',
  'ramda',
  'antd',
  'react-bootstrap',
  'ahooks',
  '@ant-design/icons',
  '@headlessui/react',
  '@headlessui-float/react',
  '@heroicons/react/20/solid',
  '@heroicons/react/24/solid',
  '@heroicons/react/24/outline',
  '@visx/visx',
  '@tremor/react',
  'rxjs',
  '@mui/material',
  '@mui/icons-material',
  'recharts',
  'react-use',
  '@material-ui/core',
  '@material-ui/icons',
  '@tabler/icons-react',
  'mui-core',
  'react-icons/*',
]);

const withPwa = pwa({
  dest: 'public', // Output directory for the service worker and other PWA files
  disable: process.env.NODE_ENV === 'development', // Disable PWA in development mode
  register: true, // Automatically register the service worker
  dynamicStartUrl: true, // Enable dynamic start URL caching
  cacheOnFrontEndNav: true, // Enable caching for front-end navigation
  aggressiveFrontEndNavCaching: true, // Cache every `<link rel="stylesheet" />` and `<script />` on frontend navigation
  cacheStartUrl: true, // Cache the start URL
  reloadOnOnline: true, // Reload the app when it comes back online
  fallbacks: {
    document: '/offline', // Fallback route for pages
    image: '/static/images/logo.webp', // Fallback route for images
    font: '/static/fonts/fallback.woff2', // Fallback route for fonts
  },
  workboxOptions: {
    exclude: [/\/_next\/static\/.*(?<!\.p)\.woff2/, /\.map$/, /^manifest.*\.js$/, /\.pdf$/], // Exclude specific files from precaching
    ignoreURLParametersMatching: [/^utm_/, /^fbclid$/], // Ignore specific URL parameters
    runtimeCaching: [
      {
        urlPattern: /\/offline/,
        handler: 'CacheFirst',
        options: {
          cacheName: 'offline-page',
          expiration: {
            maxEntries: 1,
          },
        },
      },
      {
        urlPattern: /\.(?:png|jpg|jpeg|svg|webp)$/,
        handler: 'CacheFirst',
        options: {
          cacheName: 'images',
          expiration: {
            maxEntries: 100,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
          },
        },
      },
      {
        urlPattern: /\.(?:js|css)$/,
        handler: 'StaleWhileRevalidate',
        options: {
          cacheName: 'static-resources',
        },
      },
      {
        urlPattern: /\.(?:woff|woff2|eot|ttf|otf|pdf)$/,
        handler: 'CacheFirst',
        options: {
          cacheName: 'fonts',
          expiration: {
            maxEntries: 50,
            maxAgeSeconds: 365 * 24 * 60 * 60, // 1 year
          },
        },
      },
      {
        urlPattern: /api\/.*/,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'api-responses',
          networkTimeoutSeconds: 10, // Fallback to cache if the network takes longer than 10 seconds
          expiration: {
            maxEntries: 50,
            maxAgeSeconds: 24 * 60 * 60, // 1 day
          },
        },
      },
    ],
  },
} satisfies PluginOptions);

const withBundleAnalyzerConfig = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: false,
  analyzerMode: 'static',
  logLevel: 'error',
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  pageExtensions: ['tsx', 'mdx', 'ts', 'js'],
  compress: true,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
      { protocol: 'http', hostname: 'localhost' },
      { protocol: 'https', hostname: 'media.licdn.com' },
      { protocol: 'https', hostname: 'github.com' },
      { protocol: 'https', hostname: 'maps.googleapis.com' },
      { protocol: 'https', hostname: 'cdn.magicui.design' },
      { protocol: 'https', hostname: 'www.googletagmanager.com' },
      { protocol: 'https', hostname: 'va.vercel-scripts.com' },
      { protocol: 'https', hostname: 'www.gstatic.com' },
      { protocol: 'https', hostname: 'pagead2.googlesyndication.com' },
    ],
  },
  poweredByHeader: false,
  experimental: {
    // nodeMiddleware: true,
    optimizePackageImports: [
      ...new Set([
        'react-email', // 149.2 MB
        'next', // 120.6 MB
        'react-icons', // 86.2 MB
        'lucide-react', // 28.6 MB
        'effect', // 24.8 MB
        'typescript', // 22.7 MB
        'date-fns', // 22.6 MB
        '@prisma/client', // 8.6 MB
        'react-dom', // 6.4 MB
        'react-spinners', // 5.6 MB
        'recharts', // 4.7 MB
        '@radix-ui/react-icons', // 3.4 MB
        '@sentry/nextjs', // 2.8 MB
        'use-context-selector', // 19.8 MB
        'usehooks-ts', // 18.8 MB
        'uuid', // 18.7 MB
        'vaul', // 18.6 MB
        'vitest', // 18.5 MB
        'yaml-eslint-parser', // 18.4 MB
        'zod', // 18.3 MB
        'motion', // 18.2 MB
        'zustand', // 18.2 MB
        '@prisma/client', // ???
      ])
        .difference(EXEMPT_DEPS)
        .values(),
    ],
    optimizeCss: true,
    serverActions: {
      allowedOrigins: ['localhost:3000', process.env.NEXT_PUBLIC_APP_URL || ''],
      bodySizeLimit: '2mb',
    },
    webVitalsAttribution: ['CLS', 'LCP', 'TTFB', 'FCP', 'FID'],
    authInterrupts: true,
    typedRoutes: false,
    turbo: {
      resolveAlias: {
        '@/*': './src/*',
      },
      rules: {
        '**/*.{ts,tsx}': ['typescript'],
      },
    },
  },
  async headers() {
    return [
      {
        source: '/api/og',
        headers: [
          { key: 'Content-Type', value: 'image/png' },
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/media/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(self), interest-cohort=()',
          },
          { key: 'X-Frame-Options', value: 'DENY' },
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
        ],
      },
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          {
            key: 'Access-Control-Allow-Origin',
            value: process.env.NODE_ENV === 'production' ? 'https://www.kappathetapi.org' : '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,DELETE,PATCH,POST,PUT,OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
        ],
      },
      {
        source: '/(.*).png',
        headers: [{ key: 'Content-Type', value: 'image/png' }],
      },
      {
        source: '/(.*).webp',
        headers: [{ key: 'Content-Type', value: 'image/webp' }],
      },
      {
        source: '/assets/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'content-type, x-requested-with',
          },
        ],
      },
    ];
  },
  webpack: (config, { nextRuntime, isServer }) => {
    config.resolve = config.resolve || {};
    config.resolve.fallback = {
      ...config.resolve.fallback,
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      buffer: require.resolve('buffer/'),
    };
    config.resolve.alias = config.resolve.alias || {};

    if (nextRuntime === 'edge' && !isServer) {
      config.module.rules.push({
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: 'asset/resource',
        generator: {
          filename: 'static/media/[name].[hash][ext]',
        },
      });
      config.plugins.push(
        new webpack.ProvidePlugin({
          Buffer: ['buffer', 'Buffer'],
        }),
      );
      config.resolve.alias = {
        ...config.resolve.alias,
        'decode-named-character-reference': false,
        'micromark-core-commonmark': false,
        micromark: false,
        unified: false,
        'remark-parse': false,
        'remark-rehype': false,
        'rehype-stringify': false,
        react: path.resolve('./node_modules/react'),
        'react-dom': path.resolve('./node_modules/react-dom'),
        'create-hmac': false,
        'create-hash': false,
        randombytes: false,
      };
    }

    return config;
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/api/:path*',
          destination: '/api/client/:path*',
          has: [
            {
              type: 'header',
              key: 'x-skip-error-handling',
              value: '(?<skip>.*)',
            },
          ],
        },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};

const millionConfig = MillionLint.next({
  rsc: true,
  filter: {
    include: '**/components/**/*.{mtsx,mjsx,tsx,jsx}',
    exclude: ['**/api/**/*.{ts,tsx}', '**/components/html/**/*.{ts,tsx}'],
  },
});

const sentryConfig: SentryBuildOptions = {
  org: 'womb0comb0',
  project: 'ktp',
  authToken: process.env.NEXT_PUBLIC_SENTRY_AUTH_TOKEN,
  silent: true,
  release: {
    name: `local-${Date.now()}`,
    create: true,
    setCommits: {
      auto: true,
      ignoreMissing: true,
    },
  },
  sourcemaps: {
    assets: './**/*.{js,map}',
    ignore: ['node_modules/**/*'],
  },
  widenClientFileUpload: true,
  autoInstrumentServerFunctions: true,
  autoInstrumentMiddleware: true,
  autoInstrumentAppDirectory: true,
  tunnelRoute: '/monitoring',
  disableLogger: true,
  automaticVercelMonitors: true,
  reactComponentAnnotation: {
    enabled: true,
  },
  bundleSizeOptimizations: {
    excludeDebugStatements: true,
    excludeReplayShadowDom: true,
    excludeReplayIframe: true,
    excludeReplayWorker: true,
  },
};

const withSentry =
  process.env.NODE_ENV === 'production'
    ? (config: NextConfig) => withSentryConfig(config, sentryConfig)
    : (config: NextConfig) => config;

const finalConfig = withPwa(withSentry(nextConfig));
// const finalConfig = withPwa(nextConfig);
const combinedConfig = millionConfig(withBundleAnalyzerConfig(finalConfig));

export default combinedConfig;
