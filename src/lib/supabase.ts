import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://qzxzttmrbeftlgujrldk.supabase.co';
const supabasePublishableKey = 
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 
  'sb_publishable_DQ_bNbJ8tB8plWGrBbRngw_Y7HhXrwi';

/**
 * Standard browser/client-side Supabase client.
 * Uses the modern Publishable Key (`sb_publishable_...`).
 * Strictly bound to Row Level Security (RLS) policies.
 */
export const supabase = createClient(supabaseUrl, supabasePublishableKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

/**
 * Factory helper for server components / server-side route handlers.
 */
export function getSupabaseServerClient() {
  return createClient(supabaseUrl, supabasePublishableKey, {
    auth: {
      persistSession: false,
    },
  });
}
