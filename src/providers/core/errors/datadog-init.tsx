'use client';

import { datadogRum } from '@datadog/browser-rum';
import app from 'next/app';
import { cache, memo, useEffect } from 'react';

/**
 * Type declaration extending the global Window interface to include Datadog initialization flag
 * @interface Window
 * @property {boolean} __datadogRumInitialized - Flag indicating whether Datadog RUM has been initialized
 */
declare global {
  interface Window {
    __datadogRumInitialized?: boolean;
  }
}

/**
 * Initializes the Datadog Real User Monitoring (RUM) client with configuration settings.
 * This function is cached to prevent multiple initializations.
 *
 * @function initDatadog
 * @description Sets up Datadog RUM with application monitoring configurations including:
 * - Application and client identification
 * - Environment and version tracking
 * - Session sampling and replay settings
 * - User interaction and resource tracking
 * - Privacy and security settings
 *
 * @returns {void}
 *
 * @example
 * ```ts
 * initDatadog(); // Initializes Datadog RUM with predefined configuration
 * ```
 *
 * @remarks
 * - Only initializes in browser environment
 * - Prevents multiple initializations using window.__datadogRumInitialized flag
 * - Configures session replay and tracking settings
 * - Sets up URL allowlist for tracing
 */
const initDatadog = cache(() => {
  if (typeof window !== 'undefined' && !window.__datadogRumInitialized) {
    datadogRum.init({
      applicationId: process.env.NEXT_PUBLIC_DATADOG_APPLICATION_ID,
      clientToken: process.env.NEXT_PUBLIC_DATADOG_CLIENT_TOKEN,
      site: process.env.NEXT_PUBLIC_DATADOG_SITE,
      service: app.name,
      env: process.env.NODE_ENV,
      version: process.env.NEXT_PUBLIC_APP_VERSION,
      sessionSampleRate: 100,
      sessionReplaySampleRate: 33,
      trackUserInteractions: true,
      trackResources: true,
      trackLongTasks: true,
      defaultPrivacyLevel: 'mask-user-input',
      allowedTracingUrls: [/https:\/\/.*\.kappathetapi\.org/],
    });

    datadogRum.startSessionReplayRecording();
    window.__datadogRumInitialized = true;
  }
});

/**
 * Memoized React component that handles Datadog RUM initialization.
 *
 * @component DatadogInit
 * @description A null-rendering component that initializes Datadog RUM on mount.
 * Uses useEffect to ensure browser-only execution and memo for performance optimization.
 *
 * @returns {null} Component renders nothing, only handles initialization
 *
 * @example
 * ```tsx
 * // In your app's root component:
 * function App() {
 *   return (
 *     <>
 *       <DatadogInit />
 *     </>
 *   );
 * }
 * ```
 *
 * @remarks
 * - Should be placed high in the component tree
 * - Only initializes in browser environment
 * - Memoized to prevent unnecessary re-renders
 */
export const DatadogInit = memo((): null => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      initDatadog();
    }
  }, []);

  return null;
});

/**
 * Error handler function that reports errors to Datadog RUM.
 *
 * @function datadogErrorHandler
 * @description Captures and reports errors to Datadog RUM for monitoring and debugging.
 *
 * @param {Error} error - The error object containing information about the error that occurred
 * @param {React.ErrorInfo} errorInfo - React-specific error information including component stack trace
 * @returns {void}
 *
 * @example
 * ```tsx
 * class ErrorBoundary extends React.Component {
 *   componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
 *     datadogErrorHandler(error, errorInfo);
 *   }
 * }
 * ```
 *
 * @remarks
 * - Should be used within error boundaries or global error handlers
 * - Automatically adds error context to Datadog RUM
 * - Preserves original error information while adding it to monitoring
 */
export const datadogErrorHandler = (error: Error, errorInfo: React.ErrorInfo): void => {
  datadogRum.addError(error, { errorInfo });
};
