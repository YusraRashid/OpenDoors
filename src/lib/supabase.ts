import 'react-native-url-polyfill/auto';

import { createClient } from '@supabase/supabase-js';

import 'expo-sqlite/localStorage/install';

import { env, isSupabaseConfigured } from './env';

// When .env is missing, a placeholder URL keeps createClient from throwing at
// import time. Callers check isSupabaseConfigured before making requests.
const url = isSupabaseConfigured ? env.supabaseUrl : 'https://not-configured.invalid';
const key = isSupabaseConfigured ? env.supabasePublishableKey : 'not-configured';

/** The single Supabase client. Uses the publishable key only. */
export const supabase = createClient(url, key, {
  auth: {
    storage: localStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
