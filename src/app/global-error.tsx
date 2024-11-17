'use client';

import { AnimatedBackground } from '@/components';
import { Button } from '@/components/ui/button';
import * as Sentry from '@sentry/nextjs';
import { motion } from 'framer-motion';
import { AlertTriangle, Home, RotateCw } from 'lucide-react';
import { useEffect } from 'react';

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

  return (
    <html lang="en">
      <body>
        <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
          <AnimatedBackground />
          <motion.div
            style={{
              zIndex: 10,
              maxWidth: '28rem',
              width: '100%',
              paddingLeft: '1rem',
              paddingRight: '1rem',
              textAlign: 'center',
            }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <AlertTriangle className="mx-auto h-12 w-12 text-destructive" />
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-white">
              Something went wrong
            </h1>
            <p className="mt-2 text-base text-white/80">
              We apologize for the inconvenience. Our team has been notified and is working on
              resolving the issue.
            </p>
            <div className="mt-6 flex flex-col gap-2">
              <Button
                onClick={() => window.location.reload()}
                variant="outline"
                className="w-full bg-white/10 text-white hover:bg-white/20"
              >
                <RotateCw className="w-4 h-4 mr-2" />
                Try again
              </Button>
              <Button
                onClick={() => (window.location.href = '/')}
                className="w-full bg-primary text-white hover:bg-primary/90"
              >
                <Home className="w-4 h-4 mr-2" />
                Go back home
              </Button>
            </div>
            {error.digest && <p className="mt-4 text-sm text-white/60">Error ID: {error.digest}</p>}
          </motion.div>
        </div>
      </body>
    </html>
  );
}
