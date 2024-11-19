import withPwa from '@ducanh2912/next-pwa';
import MillionLint from '@million/lint';
import { SentryBuildOptions, withSentryConfig } from '@sentry/nextjs';
import type { NextConfig } from 'next';

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
  webpack: (config, { isServer, nextRuntime }) => {
    // Initialize config.resolve if needed
    config.resolve = config.resolve || {};
    config.resolve.fallback = config.resolve.fallback || {};
    config.resolve.alias = config.resolve.alias || {};

    // Client-side configuration
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
      };
    }

    // Edge runtime configuration
    if (nextRuntime === 'edge') {
      config.resolve.alias = {
        ...config.resolve.alias,
        fs: false,
        path: false,
        'decode-named-character-reference': false,
        'micromark-core-commonmark': false,
        'micromark': false,
      };
    }

    // Handle externals as a function
    const existingExternals = config.externals;
    config.externals = (context: any, request: any, callback: any) => {
      if (request === '@opentelemetry/instrumentation') {
        return callback(null, 'commonjs ' + request);
      }
      if (request === 'node:fs') {
        return callback(null, 'commonjs fs');
      }
      if (request === 'node:path') {
        return callback(null, 'commonjs path');
      }
      if (typeof existingExternals === 'function') {
        return existingExternals(context, request, callback);
      }
      callback();
    };

    // Initialize module rules if not present
    if (!config.module) {
      config.module = { rules: [] };
    }

    // Edge and Node.js runtime specific rules
    if (nextRuntime === 'edge' || nextRuntime === 'nodejs') {
      config.module.rules.push({
        test: /decode-named-character-reference|micromark-core-commonmark|micromark/,
        loader: 'null-loader',
      });
    }

    // Common rules for all environments
    config.module.rules.push(
      {
        test: /\.svg$/i,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.html$/,
        loader: 'ignore-loader',
      }
    );

    config.module.rules.push({
      test: /\.(txt|ttf|woff|woffeot|otf)$/,
      type: 'asset/resource',
    });

    // Add font handling for edge runtime
    if (nextRuntime === 'edge') {
      config.module.rules.push({
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: 'asset/resource',
        generator: {
          filename: 'static/media/[name].[hash][ext]'
        }
      });
    }

    return config;
  },
  ignoreWarnings: [
    {
      module: /node_modules\/@opentelemetry/,
      message: /the request of a dependency is an expression/,
    },
  ],
};

// Plugin configurations
const millionConfig = {
  rsc: true,
  filter: {
    include: '**/components/**/*.{mtsx,mjsx,tsx,jsx}',
    exclude: ['**/api/**/*.{ts,tsx}', '**/components/html/**/*.{ts,tsx}'],
  },
};

const sentryConfig = process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_SENTRY_AUTH_TOKEN
  ? {
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
    }
  : null;

// Compose configuration with plugins
let config = nextConfig;
config = MillionLint.next(millionConfig)(config);
config = withPwa({ ...config, dest: 'public' });
if (sentryConfig) {
  config = withSentryConfig(config, sentryConfig as SentryBuildOptions);
}

export default config;
