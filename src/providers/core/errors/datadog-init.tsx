'use client';

import { datadogRum } from '@datadog/browser-rum';
import app from 'next/app';
import { useEffect } from 'react';

const initDatadog = () => {
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
      allowedTracingUrls: [/https:\/\/.*\.ktpnational\.com/],
    });

    datadogRum.startSessionReplayRecording();
  }
};

export const DatadogInit = () => {
  useEffect(() => {
    initDatadog();
  }, []);

  return null;
};

export const errorHandler = (error: Error, errorInfo: React.ErrorInfo) => {
  datadogRum.addError(error, { errorInfo });
};
