import { hasConsentFor } from '@/lib/consent';

export type AnalyticsEvent = 
  | 'service_view'
  | 'service_search'
  | 'problem_finder_started'
  | 'problem_finder_selected'
  | 'service_request_started'
  | 'service_request_step_completed'
  | 'service_request_completed'
  | 'contact_form_started'
  | 'contact_form_completed'
  | 'cta_clicked'
  | 'case_study_view'
  | 'product_view'
  | 'language_changed'
  | 'page_view';

export interface AnalyticsProperties {
  [key: string]: string | number | boolean | undefined | null;
}

/**
 * Clean analytics abstraction.
 * Enforces international privacy standards (GDPR, ePrivacy): Optional telemetry
 * strictly disabled until explicit affirmative analytics consent is obtained.
 */
export const trackEvent = (eventName: AnalyticsEvent, properties?: AnalyticsProperties) => {
  // Ensure this only runs on client
  if (typeof window === 'undefined') return;

  // Technical Gating: Verify analytics consent
  if (!hasConsentFor('analytics')) {
    if (process.env.NODE_ENV === 'development') {
      console.debug(`[Analytics Gated] Suppressed "${eventName}" — Analytics consent not granted.`);
    }
    return;
  }
    
    // Sanitize properties: NEVER track PII (Personal Identifiable Information)
    // We intentionally filter out names, emails, phones if they accidentally get passed
    const safeProperties: AnalyticsProperties = {};
    if (properties) {
      for (const [key, value] of Object.entries(properties)) {
        if (!['email', 'name', 'phone', 'password', 'address'].includes(key.toLowerCase())) {
          safeProperties[key] = value;
        }
      }
    }

    // Default metadata useful for conversion funnels
    const eventPayload = {
      event: eventName,
      properties: safeProperties,
      context: {
        url: window.location.href,
        path: window.location.pathname,
        referrer: document.referrer || undefined,
        userAgent: navigator.userAgent, // Allows provider to extract device type
        timestamp: new Date().toISOString()
      }
    };

    // TODO: Connect to your actual analytics provider here
    // Example: window.plausible(eventName, { props: safeProperties });
    // Example: gtag('event', eventName, safeProperties);

    // Development logging
    if (process.env.NODE_ENV === 'development') {
      console.debug(`[Analytics Tracker] ${eventName}`, eventPayload);
    }
};
