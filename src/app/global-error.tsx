'use client';

import * as Sentry from '@sentry/react';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';

const InternalServerError = dynamic(
  () => import('@/app/_client').then((mod) => mod.InternalServerError),
  {
    ssr: false,
  },
);

/**
 * Global error boundary component that displays a user-friendly error page
 * when unhandled errors occur in the application.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Error & { digest?: string }} props.error - Error object that contains details about what went wrong
 * @param {string} [props.error.digest] - Optional unique error identifier/hash
 *
 * @description
 * This component serves as the top-level error boundary for the Next.js application.
 * It captures unhandled errors, reports them to Sentry for monitoring, and displays
 * a user-friendly error page with options to retry or return home.
 *
 * Features:
 * - Automatic error reporting to Sentry
 * - Animated error message display using Framer Motion
 * - Responsive design with mobile-friendly layout
 * - "Try Again" button to reload the page
 * - "Go Home" button to return to the homepage
 * - Displays error ID when available
 *
 * @example
 * // Automatically used by Next.js when unhandled errors occur
 * <GlobalError error={new Error('Something went wrong')} />
 */
export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
  /**
   * Reports the error to Sentry when the component mounts or when the error changes
   */
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return <InternalServerError error={error} reset={() => window.location.reload()} />;
}
