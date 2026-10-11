'use client';

import { useEffect } from 'react';
import { trackEvent, AnalyticsEvent, AnalyticsProperties } from '@/lib/analytics';

interface AnalyticsTrackerProps {
  event: AnalyticsEvent;
  properties?: AnalyticsProperties;
}

export function AnalyticsTracker({ event, properties }: AnalyticsTrackerProps) {
  useEffect(() => {
    // Only track once per mount
    trackEvent(event, properties);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
