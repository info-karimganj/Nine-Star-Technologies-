'use client';

import React from 'react';
import { trackEvent, AnalyticsEvent, AnalyticsProperties } from '@/lib/analytics';

export function TrackAction({
  event,
  properties,
  children
}: {
  event: AnalyticsEvent;
  properties?: AnalyticsProperties;
  children: React.ReactNode;
}) {
  return (
    <div 
      onClick={() => trackEvent(event, properties)}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') trackEvent(event, properties); }}
      role="presentation"
      className="contents"
    >
      {children}
    </div>
  );
}
