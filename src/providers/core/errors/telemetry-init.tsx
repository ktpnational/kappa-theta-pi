'use client';

import { ZoneContextManager } from '@opentelemetry/context-zone';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { DocumentLoadInstrumentation } from '@opentelemetry/instrumentation-document-load';
import { FetchInstrumentation } from '@opentelemetry/instrumentation-fetch';
import { UserInteractionInstrumentation } from '@opentelemetry/instrumentation-user-interaction';
import { Resource } from '@opentelemetry/resources';
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { memo, useEffect } from 'react';

/**
 * Initializes the OpenTelemetry tracer.
 *
 * @returns {void}
 */
const initTelemetry = (): void => {
  if (typeof window !== 'undefined') {
    const provider = new WebTracerProvider({
      resource: new Resource({
        [SemanticResourceAttributes.SERVICE_NAME]: 'ktp-web',
        [SemanticResourceAttributes.SERVICE_VERSION]:
          process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
        environment: process.env.NODE_ENV,
      }),
    });

    // Configure the OTLP exporter
    const exporter = new OTLPTraceExporter({
      url: process.env.NEXT_PUBLIC_OTEL_COLLECTOR_URL || 'http://localhost:4318/v1/traces',
    });

    provider.addSpanProcessor(new BatchSpanProcessor(exporter));
    provider.register({
      contextManager: new ZoneContextManager(),
    });

    // Register instrumentations
    registerInstrumentations({
      instrumentations: [
        new DocumentLoadInstrumentation(),
        new UserInteractionInstrumentation(),
        new FetchInstrumentation({
          ignoreUrls: [/localhost/], // Ignore local development URLs
          clearTimingResources: true,
        }),
      ],
    });
  }
};

/**
 * TelemetryInit component to initialize OpenTelemetry.
 *
 * @returns {null}
 */
export const TelemetryInit = memo((): null => {
  useEffect(() => {
    initTelemetry();
  }, []);

  return null;
});

/**
 * Error handler function to log errors.
 *
 * @param {Error} error - The error object.
 * @param {React.ErrorInfo} errorInfo - The error information.
 * @returns {void}
 */
export const errorHandler = (error: Error, errorInfo: React.ErrorInfo): void => {
  const tracer = new WebTracerProvider().getTracer('error-tracer');

  tracer
    .startSpan('error')
    .setAttributes({
      'error.type': error.name,
      'error.message': error.message,
      'error.stack': error.stack ?? undefined,
      'error.componentStack': errorInfo.componentStack ?? undefined,
    })
    .end();
};

/**
 * Custom hook for performance monitoring
 * @param {string} name - Name of the component or operation to monitor
 */
export const usePerformanceMonitoring = (name: string) => {
  useEffect(() => {
    const tracer = new WebTracerProvider().getTracer('performance-tracer');
    const span = tracer.startSpan(`component.${name}.render`);

    return () => {
      span.end();
    };
  }, [name]);
};
