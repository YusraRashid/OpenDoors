// Expo inlines EXPO_PUBLIC_* variables at build time, so each one must be read
// with a literal `process.env.NAME` expression.
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL?.trim() ?? '';
const supabasePublishableKey = process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim() ?? '';

export const env = {
  supabaseUrl,
  supabasePublishableKey,
} as const;

/** False when either Supabase variable is missing. The app must still run. */
export const isSupabaseConfigured = supabaseUrl.length > 0 && supabasePublishableKey.length > 0;
