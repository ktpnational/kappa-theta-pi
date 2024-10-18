'use client';

import { Button } from '@/components/ui/button';
import * as Sentry from '@sentry/nextjs';
import { AlertTriangle } from 'lucide-react';
import { useEffect } from 'react';

export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="max-w-md w-full px-4">
            <div className="text-center">
              <AlertTriangle className="mx-auto h-12 w-12 text-destructive" />
              <h1 className="mt-4 text-3xl font-bold tracking-tight text-primary">
                Something went wrong
              </h1>
              <p className="mt-2 text-base text-muted-foreground">
                We apologize for the inconvenience. Our team has been notified and is working on
                resolving the issue.
              </p>
              <div className="mt-6 flex flex-col gap-2">
                <Button onClick={() => window.location.reload()} variant="outline">
                  Try again
                </Button>
                <Button onClick={() => (window.location.href = '/')}>Go back home</Button>
              </div>
              {error.digest && (
                <p className="mt-4 text-sm text-muted-foreground">Error ID: {error.digest}</p>
              )}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
