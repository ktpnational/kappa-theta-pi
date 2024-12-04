import pwa from '@ducanh2912/next-pwa';
import MillionLint from '@million/lint';
import withBundleAnalyzer from '@next/bundle-analyzer';
import { type SentryBuildOptions, withSentryConfig } from '@sentry/nextjs';
import type { NextConfig } from 'next';

const withPwa = pwa({
  dest: 'public',
});

const withBundleAnalyzerConfig = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: false,
  analyzerMode: 'static',
  logLevel: 'error',
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  pageExtensions: ['tsx', 'mdx', 'ts', 'js'],
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
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'maps.googleapis.com' },
      { protocol: 'https', hostname: 'cdn.magicui.design' },
      { protocol: 'https', hostname: 'www.googletagmanager.com' },
      { protocol: 'https', hostname: 'va.vercel-scripts.com' },
      { protocol: 'https', hostname: 'www.gstatic.com' },
      { protocol: 'https', hostname: 'pagead2.googlesyndication.com' },
    ],
  },
  experimental: {
    optimizeCss: true,
    serverActions: {
      allowedOrigins: ['localhost:3000', process.env.NEXT_PUBLIC_APP_URL || ''],
      bodySizeLimit: '2mb',
    },
    typedRoutes: false,
    turbo: {
      resolveAlias: {
        '@/*': './src/*'
      },
      rules: {
        '**/*.{ts,tsx}': ['typescript']
      }
    },
  },
  async headers() {
    return [
            {
        source: '/api/og',
        headers: [
          {
            key: 'Content-Type',
            value: 'image/png',
          },
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
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(self), interest-cohort=()',
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
          { key: 'Access-Control-Allow-Methods', value: 'GET,DELETE,PATCH,POST,PUT,OPTIONS' },
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
    ];
  },
  // @ts-expect-error - Next.js types are not updated yet
  webpack: (config, { isServer, nextRuntime }) => {
    config.resolve = config.resolve || {};
    config.resolve.fallback = config.resolve.fallback || {};
    config.resolve.alias = config.resolve.alias || {};

    if (nextRuntime === 'edge') {
      config.module.rules.push({
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: 'asset/resource',
        generator: {
          filename: 'static/media/[name].[hash][ext]',
        },
      });

      config.resolve.alias = {
        ...config.resolve.alias,
        'decode-named-character-reference': false,
        'micromark-core-commonmark': false,
        micromark: false,
        unified: false,
        'remark-parse': false,
        'remark-rehype': false,
        'rehype-stringify': false,
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
    name: process.env.VERCEL_GIT_COMMIT_SHA || `local-${Date.now()}`,
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
  hideSourceMaps: true,
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

const finalConfig = withPwa(nextConfig);

let combinedConfig = millionConfig(withBundleAnalyzerConfig(finalConfig));

if (require.main === module) {
  if (sentryConfig) {
    combinedConfig = withSentryConfig(combinedConfig, sentryConfig);
  }
}

export default combinedConfig;
