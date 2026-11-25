/**
 * Public runtime configuration.
 *
 * Only EXPO_PUBLIC_* values may be read here. Service-role keys and inference
 * tokens must never be bundled into the app.
 */
const url = process.env.EXPO_PUBLIC_SUPABASE_URL?.trim() || '';
const anonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY?.trim() || '';

export const supabaseConfig = {
  url: url || null,
  anonKey: anonKey || null,
  isConfigured: Boolean(url && anonKey),
};
