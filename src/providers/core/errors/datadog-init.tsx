'use client';

import { datadogRum } from '@datadog/browser-rum';
import app from 'next/app';
import { useEffect } from 'react';

/**
 * Initializes the Datadog RUM client.
 *
 * @returns {void}
 */
const initDatadog = (): void => {
  if (typeof window !== 'undefined') {
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
  }
};

/**
 * DatadogInit component to initialize the Datadog RUM client.
 *
 * @returns {null}
 */
export const DatadogInit = (): null => {
  useEffect(() => {
    initDatadog();
  }, []);

  return null;
};

/**
 * Error handler function to log errors to Datadog RUM.
 *
 * @param {Error} error - The error object.
 * @param {React.ErrorInfo} errorInfo - The error information.
 * @returns {void}
 */
export const errorHandler = (error: Error, errorInfo: React.ErrorInfo): void => {
  datadogRum.addError(error, { errorInfo });
};
