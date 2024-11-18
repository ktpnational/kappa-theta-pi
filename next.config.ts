import withPwa from '@ducanh2912/next-pwa';
import MillionLint from '@million/lint';
import { withSentryConfig } from '@sentry/nextjs';
import type { NextConfig } from 'next';
import type { NextJsWebpackConfig, WebpackConfigContext } from 'next/dist/server/config-shared';

/** @type {NextConfig} */
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
    ],
  },
  serverComponentsExternalPackages: ['@supabase/ssr'],
  experimental: {
    optimizeCss: true,
    serverActions: {
      allowedOrigins: ['localhost:3000', process.env.NEXT_PUBLIC_APP_URL || ''],
      bodySizeLimit: '2mb',
    },
    turbo: {
      resolveExtensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
      resolveAlias: {
        '@': './src',
      },
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,DELETE,PATCH,POST,PUT' },
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
  webpack: ((config, { isServer }: WebpackConfigContext) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    config.module.rules.push({
      test: /\.svg$/i,
      use: ['@svgr/webpack'],
    });
    config.module.rules.push({
      test: /\.html$/,
      loader: 'ignore-loader',
    });
    config.externals = [...(config.externals || [])];
    return config;
  }) satisfies NextJsWebpackConfig,
  publicRuntimeConfig: {
    basePath: '',
  },
};

const millionLintConfig = MillionLint.next({
  rsc: true,
  filter: {
    include: '**/components/**/*.{mtsx,mjsx,tsx,jsx}',
    exclude: ['**/api/**/*.{ts,tsx}', '**/components/html/**/*.{ts,tsx}'],
  },
});

const finalConfig = withPwa(millionLintConfig(nextConfig));

const shouldUseSentry = process.env.NODE_ENV === 'production' && process.env.SENTRY_AUTH_TOKEN;

let exportedConfig = finalConfig;

if (shouldUseSentry) {
  exportedConfig = withSentryConfig(finalConfig, {
    org: 'womb0comb0',
    project: 'ktp',
    authToken: process.env.NEXT_PUBLIC_SENTRY_AUTH_TOKEN,
    silent: process.env.NODE_ENV === 'production',
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
  });
}

export default exportedConfig;
