'use client';

import { useEffect } from 'react';
import { Typography } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Error monitoring integration point (e.g., Sentry, Datadog)
    if (process.env.NODE_ENV === 'development') {
      console.error('[Application Error Boundary]', error);
    }
  }, [error]);

  return (
    <main className="w-full min-h-[70vh] flex items-center justify-center bg-[var(--color-base)] py-20">
      <div className="container mx-auto px-4 text-center max-w-2xl">
        <div className="w-24 h-24 mx-auto bg-red-50 text-red-600 rounded-full flex items-center justify-center mb-8 border border-red-100 shadow-sm">
          <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <Typography variant="h1" className="mb-6">Something went wrong</Typography>
        <Typography variant="body" className="text-[var(--color-text-muted)] text-lg mb-10">
          An unexpected error occurred. Our team has been notified. 
          Please try reloading the page.
        </Typography>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button onClick={() => reset()} size="lg" className="w-full sm:w-auto">
            Try Again
          </Button>
        </div>
      </div>
    </main>
  );
}
