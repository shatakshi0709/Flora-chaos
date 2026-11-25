import { supabase } from '../lib/supabase';

export const NOT_CONFIGURED_MESSAGE =
  'Supabase is not configured. Add EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY to .env.';

function client() {
  if (!supabase) throw new Error(NOT_CONFIGURED_MESSAGE);
  return supabase;
}

export function errorMessage(error) {
  return error?.message || 'Something went wrong. Please try again.';
}

export async function signIn({ email, password }) {
  const { data, error } = await client().auth.signInWithPassword({
    email: email.trim(),
    password,
  });
  if (error) throw error;
  return data;
}

export async function signUp({ email, password, fullName }) {
  const { data, error } = await client().auth.signUp({
    email: email.trim(),
    password,
    options: {
      data: { full_name: fullName.trim() },
    },
  });
  if (error) throw error;

  return {
    ...data,
    needsConfirmation: Boolean(data.user && !data.session),
  };
}

export async function signOut() {
  const { error } = await client().auth.signOut();
  if (error) throw error;
}

export async function getProfile(userId) {
  const { data, error } = await client()
    .from('profiles')
    .select('id, full_name, avatar_url, created_at')
    .eq('id', userId)
    .maybeSingle();
  if (error) throw error;
  return data;
}
