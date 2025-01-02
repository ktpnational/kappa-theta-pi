import pwa from "@ducanh2912/next-pwa";
import MillionLint from "@million/lint";
import withBundleAnalyzer from "@next/bundle-analyzer";
import { type SentryBuildOptions, withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";

const withPwa = pwa({
  dest: "public",
});

const withBundleAnalyzerConfig = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
  openAnalyzer: false,
  analyzerMode: "static",
  logLevel: "error",
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  pageExtensions: ["tsx", "mdx", "ts", "js"],
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "http", hostname: "localhost" },
      { protocol: "https", hostname: "media.licdn.com" },
      { protocol: "https", hostname: "github.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "maps.googleapis.com" },
      { protocol: "https", hostname: "cdn.magicui.design" },
      { protocol: "https", hostname: "pagead2.googlesyndication.com" },
    ],
  },
  experimental: {
    // esmExternals: "loose",
    optimizeCss: true,
    serverActions: {
      allowedOrigins: ["localhost:3000", process.env.NEXT_PUBLIC_APP_URL || ""],
      bodySizeLimit: "2mb",
    },
    typedRoutes: false,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' *",
              "connect-src 'self' *",
              "img-src 'self' data: blob: *",
              "style-src 'self' 'unsafe-inline' *",
              "font-src 'self' data: *",
              "frame-src 'self' *",
              "worker-src 'self' blob:",
              "manifest-src 'self'",
            ].join("; "),
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(self), interest-cohort=()",
          },
        ],
      },
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,DELETE,PATCH,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
      {
        source: "/(.*).png",
        headers: [{ key: "Content-Type", value: "image/png" }],
      },
    ];
  },
  // @ts-expect-error - Next.js types are not updated yet
  webpack: (config, { isServer, nextRuntime }) => {
    config.resolve = config.resolve || {};
    config.resolve.fallback = config.resolve.fallback || {};
    config.resolve.alias = config.resolve.alias || {};

    if (nextRuntime === "edge") {
      config.module.rules.push({
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: "asset/resource",
        generator: {
          filename: "static/media/[name].[hash][ext]",
        },
      });

      config.resolve.alias = {
        ...config.resolve.alias,
        "decode-named-character-reference": false,
        "micromark-core-commonmark": false,
        micromark: false,
        unified: false,
        "remark-parse": false,
        "remark-rehype": false,
        "rehype-stringify": false,
      };
    }

    return config;
  },
};

const millionConfig = MillionLint.next({
  rsc: true,
  filter: {
    include: "**/components/**/*.{mtsx,mjsx,tsx,jsx}",
    exclude: ["**/api/**/*.{ts,tsx}", "**/components/html/**/*.{ts,tsx}"],
  },
});

const sentryConfig: SentryBuildOptions = {
  org: "womb0comb0",
  project: "ktp",
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
    assets: "./**/*.{js,map}",
    ignore: ["node_modules/**/*"],
  },
  hideSourceMaps: true,
  widenClientFileUpload: true,
  autoInstrumentServerFunctions: true,
  autoInstrumentMiddleware: true,
  autoInstrumentAppDirectory: true,
  tunnelRoute: "/monitoring",
  disableLogger: true,
  automaticVercelMonitors: true,
  reactComponentAnnotation: {
    enabled: true,
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
