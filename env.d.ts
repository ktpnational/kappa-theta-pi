/// <reference types="node" />

enum NodeEnv {
  DEVELOPMENT = 'development',
  TEST = 'test',
  PRODUCTION = 'production',
}

export enum ServerConfig {
  URL = 'x-url',
  COOKIE = 'auth',
  DAYS = `${60 * 60 * 24 * 7}`,
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // Datadog
      NEXT_PUBLIC_DATADOG_APPLICATION_ID: string;
      NEXT_PUBLIC_DATADOG_CLIENT_TOKEN: string;
      NEXT_PUBLIC_DATADOG_SITE: string;

      // App
      ANALYZE: string;
      NODE_ENV: NodeEnv;
      NEXT_PUBLIC_APP_VERSION: string;
      NEXT_PUBLIC_APP_URL: string;

      // Supabase
      NEXT_PUBLIC_SUPABASE_URL: string;
      NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
      NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY: string;
      NEXT_PUBLIC_SUPABASE_JWT_SECRET: string;
      SUPABASE_ACCESS_TOKEN: string;
      NEXT_PUBLIC_DATABASE_URL: string;
      NEXT_PUBLIC_DIRECT_URL: string;
      NEXT_PUBLIC_PROJECT_REGION: string;

      // Google
      NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: string;
      NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID: string;
      NEXT_PUBLIC_GOOGLE_CLIENT_ID: string;
      NEXT_PUBLIC_GOOGLE_CLIENT_SECRET: string;

      // Analytics
      NEXT_PUBLIC_GA_MEASUREMENT_ID: string;
      NEXT_PUBLIC_GA_TRACKING_ID: string;
      NEXT_PUBLIC_GTM_ID: string;
      NEXT_PUBLIC_ADSENSE_ID: string;

      // Sentry
      NEXT_PUBLIC_SENTRY_DSN: string;
      NEXT_PUBLIC_SENTRY_AUTH_TOKEN: string;

      // Vercel
      VERCEL_GIT_COMMIT_SHA?: string;

      // GitHub
      GITHUB_TOKEN: string;

      // JWT
      AUTH_COOKIE: ServerConfig.COOKIE;
      SERVER_URL_KEY: ServerConfig.URL;
      SECRET: string;
      SEVEN_DAYS: ServerConfig.DAYS;
      AUTH_SECRET: string;

      // Resend
      NEXT_PUBLIC_RESEND_API_KEY: string;
      NEXT_PUBLIC_RESEND_HOST: string;
      NEXT_PUBLIC_RESEND_PORT: string;
      NEXT_PUBLIC_RESEND_USERNAME: string;
      NEXT_PUBLIC_RESEND_EMAIL_FROM: string;
      NEXT_PUBLIC_RESEND_EMAIL_TO: string;

      // Password
      PASSWORD_PEPPER: string;
    }
  }
}
