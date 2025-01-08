// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

if (!process.env.NEXT_PUBLIC_SENTRY_DSN) {
  console.warn(
    'Sentry DSN is missing. Please set the NEXT_PUBLIC_SENTRY_DSN environment variable.',
  );
} else {
  // Initialize Sentry
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

    // Add optional integrations for additional features
    integrations: [
      Sentry.replayIntegration(),
      Sentry.browserTracingIntegration()
    ],

    // Adjust the sample rate for traces in production
    tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0, // 10% in production, 100% in development

    // Adjust the sample rate for session replays
    replaysSessionSampleRate: process.env.NODE_ENV === 'production' ? 0.01 : 0.1, // 1% in production, 10% in development

    // Capture 100% of replay events when an error occurs
    replaysOnErrorSampleRate: 1.0,

    // Enable debug mode only in development

    // Additional Sentry configuration options
    environment: process.env.NODE_ENV || 'development', // Set the environment
    release: process.env.NEXT_PUBLIC_APP_VERSION, // Link errors to a specific release
  });

  console.log('Sentry initialized successfully.');
}
