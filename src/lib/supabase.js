import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { supabaseConfig } from '../config/env';

/**
 * Single reusable Supabase client.
 *
 * When public env vars are absent the client is `null` and the app remains in
 * its explicitly labelled preview mode. This keeps the existing UI usable
 * without pretending that a backend is connected.
 */
export const supabase = supabaseConfig.isConfigured
  ? createClient(supabaseConfig.url, supabaseConfig.anonKey, {
      auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
      },
    })
  : null;
