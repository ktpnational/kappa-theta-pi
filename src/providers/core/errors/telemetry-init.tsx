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
 * Initializes the OpenTelemetry tracer for application telemetry and monitoring.
 * This function sets up the core telemetry infrastructure including tracers, exporters,
 * and instrumentations for comprehensive application monitoring.
 *
 * The function will only execute in browser environments and includes:
 * - WebTracerProvider configuration with service name and version
 * - OTLP exporter setup for sending telemetry data
 * - Batch span processor for efficient trace processing
 * - Zone.js context management for accurate async operations tracking
 * - Auto-instrumentations for document load, user interactions, and fetch calls
 *
 * @returns {void} Nothing is returned
 * @throws {Error} May throw initialization errors if telemetry services fail to start
 * @example
 * ```ts
 * // Initialize telemetry at application startup
 * initTelemetry();
 * ```
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
    const otlpExporter = new OTLPTraceExporter({
      url: process.env.NEXT_PUBLIC_OTEL_COLLECTOR_URL || 'http://localhost:4318/v1/traces',
    });

    provider.addSpanProcessor(new BatchSpanProcessor(otlpExporter));
    provider.register({
      contextManager: new ZoneContextManager(),
    });

    // Register instrumentations
    registerInstrumentations({
      instrumentations: [
        new DocumentLoadInstrumentation(),
        new UserInteractionInstrumentation(),
        new FetchInstrumentation({
          ignoreUrls: [/localhost/],
          clearTimingResources: true,
        }),
      ],
    });
  }
};

/**
 * React component that initializes OpenTelemetry when mounted.
 * This component should be placed near the root of your application to ensure
 * telemetry is properly initialized before other components render.
 *
 * The component is memoized to prevent unnecessary re-renders and uses
 * useEffect to handle the initialization side effect.
 *
 * @component
 * @returns {null} Renders nothing in the DOM
 * @example
 * ```tsx
 * function App() {
 *   return (
 *     <>
 *       <TelemetryInit />
 *       <RestOfYourApp />
 *     </>
 *   );
 * }
 * ```
 */
export const TelemetryInit = memo((): null => {
  useEffect(() => {
    initTelemetry();
  }, []);

  return null;
});

/**
 * Global error handler that creates telemetry spans for application errors.
 * This function should be used as an error boundary handler or global error callback
 * to track and report errors through OpenTelemetry.
 *
 * Creates a new span with error details including:
 * - Error type/name
 * - Error message
 * - Stack trace (if available)
 * - React component stack (if available)
 *
 * @param {Error} error - The error object that was caught
 * @param {React.ErrorInfo} errorInfo - React-specific error information containing component stack
 * @returns {void} Nothing is returned
 * @throws {Error} May throw if tracer initialization fails
 * @example
 * ```tsx
 * class ErrorBoundary extends React.Component {
 *   componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
 *     errorHandler(error, errorInfo);
 *   }
 * }
 * ```
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
 * Custom React hook for monitoring component performance.
 * Creates a span that tracks the lifecycle of a component from mount to unmount,
 * providing insights into rendering and lifecycle performance.
 *
 * The span is automatically ended when the component unmounts through the cleanup
 * function returned by useEffect.
 *
 * @param {string} name - Identifier for the component or operation being monitored
 * @returns {void} Nothing is returned
 * @throws {Error} May throw if tracer initialization fails
 * @example
 * ```tsx
 * function MyComponent() {
 *   usePerformanceMonitoring('MyComponent');
 *   return <div>Content</div>;
 * }
 * ```
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
