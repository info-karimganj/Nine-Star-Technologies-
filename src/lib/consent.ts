export type ConsentCategory = 'necessary' | 'preferences' | 'analytics' | 'marketing';

export interface ConsentPreferences {
  necessary: boolean;
  preferences: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
  version: string;
  hasInteracted: boolean;
}

export const CONSENT_STORAGE_KEY = '9star_cookie_consent_v1';
export const CONSENT_COOKIE_KEY = '9star_consent';
export const CONSENT_POLICY_VERSION = '2026.1';

export const DEFAULT_CONSENT: ConsentPreferences = {
  necessary: true,
  preferences: false,
  analytics: false,
  marketing: false,
  timestamp: '',
  version: CONSENT_POLICY_VERSION,
  hasInteracted: false,
};

export interface CookieInventoryItem {
  key: string;
  name: string;
  provider: string;
  domain: string;
  purpose: {
    en: string;
    bn: string;
    ar?: string;
  };
  category: ConsentCategory;
  type: 'First-party Cookie' | 'HTTP Cookie' | 'Local Storage' | 'Session Storage';
  duration: string;
  identifiers: string;
  consentRequired: boolean;
  blockedBeforeConsent: boolean;
}

export const COOKIE_INVENTORY: CookieInventoryItem[] = [
  {
    key: '9star_admin_token',
    name: 'Admin Session Token',
    provider: '9STAR Technologies Platform',
    domain: 'First-party (Strict SameSite)',
    purpose: {
      en: 'Maintains authenticated administrator sessions with cryptographic signing and protection.',
      bn: 'প্রশাসনিক প্যানেলে প্রমাণীকৃত সেশন সুরক্ষিতভাবে বজায় রাখে।'
    },
    category: 'necessary',
    type: 'HTTP Cookie',
    duration: 'Session / 24 Hours',
    identifiers: 'Cryptographically signed JWT (Admins only)',
    consentRequired: false,
    blockedBeforeConsent: false
  },
  {
    key: '9star_cookie_consent_v1',
    name: 'Privacy Preference Record',
    provider: '9STAR Technologies Platform',
    domain: 'First-party',
    purpose: {
      en: 'Stores visitor privacy and cookie category preferences (Accept/Reject/Custom choices).',
      bn: 'ভিজিটরের গোপনীয়তা পছন্দ ও সম্মতি রেকর্ড সংরক্ষণ করে।'
    },
    category: 'necessary',
    type: 'Local Storage',
    duration: '12 Months (Persistent)',
    identifiers: 'Category preferences JSON & consent timestamp',
    consentRequired: false,
    blockedBeforeConsent: false
  },
  {
    key: '9star_consent',
    name: 'Consent Cookie State',
    provider: '9STAR Technologies Platform',
    domain: 'First-party',
    purpose: {
      en: 'Enables server-side middleware and SSR engines to acknowledge active consent categories.',
      bn: 'সার্ভার-সাইড ইঞ্জিনকে সক্রিয় সম্মতির তথ্য শনাক্ত করতে সহায়তা করে।'
    },
    category: 'necessary',
    type: 'First-party Cookie',
    duration: '12 Months',
    identifiers: 'Status string (e.g. accepted, rejected, custom)',
    consentRequired: false,
    blockedBeforeConsent: false
  },
  {
    key: '9star_lang',
    name: 'User Language Preference',
    provider: '9STAR Technologies Platform',
    domain: 'First-party',
    purpose: {
      en: 'Remembers user interface language choice across visits (English, Bengali, Arabic).',
      bn: 'ব্যবহারকারীর নির্বাচিত ভাষা (ইংরেজি, বাংলা, আরবি) পরবর্তী ভিজিটের জন্য সংরক্ষণ করে।'
    },
    category: 'preferences',
    type: 'First-party Cookie',
    duration: '12 Months',
    identifiers: 'Language code string (en / bn / ar)',
    consentRequired: true,
    blockedBeforeConsent: true
  },
  {
    key: '9star_analytics_events',
    name: 'First-Party Performance Insights',
    provider: '9STAR Technologies (Privacy-Gated)',
    domain: 'First-party',
    purpose: {
      en: 'Measures page navigation pathways and service request funnel drop-offs without cross-site tracking or PII storage.',
      bn: 'ব্যবহারকারীর পথচলা এবং সার্ভিস রিকোয়েস্ট কার্যকারিতা পর্যবেক্ষণ করে (ব্যক্তিগত তথ্য ছাড়া)।'
    },
    category: 'analytics',
    type: 'Local Storage',
    duration: 'Session',
    identifiers: 'Aggregated journey counter and anonymous session timestamp',
    consentRequired: true,
    blockedBeforeConsent: true
  }
];

export function getStoredConsent(): ConsentPreferences | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed.necessary === 'boolean') {
      return parsed as ConsentPreferences;
    }
  } catch (e) {
    console.error('Error reading consent state:', e);
  }
  return null;
}

export function saveConsent(preferences: Partial<ConsentPreferences>): ConsentPreferences {
  const updated: ConsentPreferences = {
    ...DEFAULT_CONSENT,
    ...preferences,
    necessary: true, // Always true
    hasInteracted: true,
    version: CONSENT_POLICY_VERSION,
    timestamp: new Date().toISOString()
  };

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(updated));
      
      // Also write lightweight cookie for SSR / middleware awareness
      const cookieValue = encodeURIComponent(JSON.stringify({
        n: 1,
        p: updated.preferences ? 1 : 0,
        a: updated.analytics ? 1 : 0,
        m: updated.marketing ? 1 : 0,
        v: updated.version,
        t: updated.timestamp
      }));
      document.cookie = `${CONSENT_COOKIE_KEY}=${cookieValue}; path=/; max-age=31536000; SameSite=Lax`;

      // Dispatch event so active listeners update in real time
      window.dispatchEvent(new CustomEvent('9star_consent_updated', { detail: updated }));
    } catch (e) {
      console.error('Error saving consent state:', e);
    }
  }

  return updated;
}

export function hasConsentFor(category: ConsentCategory): boolean {
  if (category === 'necessary') return true;
  if (typeof window === 'undefined') return false;
  const current = getStoredConsent();
  if (!current || !current.hasInteracted) return false;
  return Boolean(current[category]);
}
