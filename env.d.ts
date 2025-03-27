/// <reference types="node" />

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
      SECRET: string;

      // Supabase
      NEXT_PUBLIC_SUPABASE_URL: string;
      NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
      NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY: string;
      NEXT_PUBLIC_SUPABASE_JWT_SECRET: string;
      SUPABASE_ACCESS_TOKEN: string;
      DATABASE_URL: string;
      DIRECT_URL: string;
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
      AUTH_COOKIE: 'auth';
      SERVER_URL_KEY: 'x-url';
      SECRET: string;
      SEVEN_DAYS: string;
      AUTH_SECRET: string;

      // Resend
      NEXT_PUBLIC_RESEND_API_KEY: string;
      NEXT_PUBLIC_RESEND_HOST: string;
      NEXT_PUBLIC_RESEND_PORT: string;
      NEXT_PUBLIC_RESEND_USERNAME: string;
      NEXT_PUBLIC_RESEND_EMAIL_FROM: string;
      NEXT_PUBLIC_RESEND_EMAIL_TO: string;

      // Upstash
      NEXT_PUBLIC_UPSTASH_REDIS_REST_URL: string;
      NEXT_PUBLIC_UPSTASH_REDIS_REST_TOKEN: string;

      // Password
      PASSWORD_PEPPER: string;

      // Arcjet
      ARCJET_KEY: string;
      ALLOWED_BOT_SIGNATURES:
        | import('@arcjet/core').ArcjetWellKnownBot
        | import('@arcjet/core').ArcjetBotCategory;
      BLOCKED_BOT_SIGNATURES:
        | typeof import('@arcjet/core').ArcjetWellKnownBot
        | import('@arcjet/core').ArcjetBotCategory;
      ARCJET_CHARACTERISTICS: string;
      ARCJET_RULES: string;
      // Better Auth
      BETTER_AUTH_SECRET: string;

      // Cloudflare
      TURNSTILE_SECRET_KEY: string;
      TURNSTILE_SITE_KEY: string;

      // CSRF
      CSRF_SECRET: string;
    }
  }
}

export {};
