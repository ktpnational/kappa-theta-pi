import withBundleAnalyzer from "@next/bundle-analyzer";
import { type SentryBuildOptions, withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";
import "./src/env";

const withBundleAnalyzerConfig = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
  openAnalyzer: false,
  analyzerMode: "static",
  logLevel: "error",
});

const withPWA = require("@imbios/next-pwa")({
  disable: process.env.NODE_ENV === "development", // Disable in dev
  dest: "public",
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  pageExtensions: ["tsx", "mdx", "ts", "js"],
  compress: true,
  logging: { fetches: { fullUrl: true } },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "http", hostname: "localhost" },
      { protocol: "https", hostname: "media.licdn.com" },
      { protocol: "https", hostname: "github.com" },
      { protocol: "https", hostname: "maps.googleapis.com" },
      { protocol: "https", hostname: "cdn.magicui.design" },
      { protocol: "https", hostname: "www.googletagmanager.com" },
      { protocol: "https", hostname: "va.vercel-scripts.com" },
      { protocol: "https", hostname: "www.gstatic.com" },
      { protocol: "https", hostname: "pagead2.googlesyndication.com" },
    ],
  },
  experimental: {
    disablePostcssPresetEnv: true,
    optimizeCss: true,
    serverActions: {
      allowedOrigins: ["localhost:3000", process.env.NEXT_PUBLIC_APP_URL || ""],
      bodySizeLimit: "2mb",
    },
    output: "standalone", // Ensures a Node.js runtime
    typedRoutes: false,
    turbo: {
      resolveAlias: { "@/*": "./src/*" },
      rules: { "**/*.{ts,tsx}": ["typescript"] },
    },
  },
  async headers() {
    return [
      {
        source: "/api/og",
        headers: [
          { key: "Content-Type", value: "image/png" },
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  webpack: (config, { nextRuntime }) => {
    config.resolve ??= {};
    config.resolve.fallback = {
      ...config.resolve.fallback,
      crypto: false,
      stream: false,
      buffer: false,
    };
    config.resolve.alias = {
      ...config.resolve.alias,
      "nanoid/non-secure": require.resolve("nanoid/non-secure"),
    };

    if (nextRuntime === "edge") {
      config.module.rules.push({
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: "asset/resource",
        generator: { filename: "static/media/[name].[hash][ext]" },
      });
    }

    return config;
  },
};

const sentryConfig: SentryBuildOptions = {
  org: "womb0comb0",
  project: "ktp",
  authToken: process.env.NEXT_PUBLIC_SENTRY_AUTH_TOKEN,
  silent: true,
  release: {
    name: process.env.VERCEL_GIT_COMMIT_SHA || `local-${Date.now()}`,
    create: true,
    setCommits: { auto: true, ignoreMissing: true },
  },
  sourcemaps: {
    assets: "./**/*.{js,map}",
    ignore: ["node_modules/**/*"],
    deleteSourcemapsAfterUpload: true,
  },
  hideSourceMaps: process.env.NODE_ENV === "production",
  widenClientFileUpload: true,
  autoInstrumentAppDirectory: true,
  tunnelRoute: "/monitoring",
  disableLogger: true,
  bundleSizeOptimizations: {
    excludeDebugStatements: true,
    excludeReplayShadowDom: true,
    excludeReplayIframe: true,
    excludeReplayWorker: true,
  },
};

export default withBundleAnalyzerConfig(
  withSentryConfig(withPWA(nextConfig), sentryConfig),
);
