import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { supabaseConfig } from '../config/env';
import { supabase } from '../lib/supabase';
import {
  getProfile,
  signIn as authSignIn,
  signOut as authSignOut,
  signUp as authSignUp,
} from '../services/auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(supabaseConfig.isConfigured);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!supabase) return undefined;

    let mounted = true;

    supabase.auth
      .getSession()
      .then(({ data }) => {
        if (!mounted) return;
        const restored = data.session ?? null;
        setSession(restored);
        setUser(restored?.user ?? null);
        if (!restored) setProfile(null);
      })
      .catch((cause) => {
        if (mounted) setError(cause);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (!mounted) return;
      setSession(nextSession ?? null);
      setUser(nextSession?.user ?? null);
      if (!nextSession) setProfile(null);
      setLoading(false);
    });

    return () => {
      mounted = false;
      data.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!user || !supabase) return undefined;

    let mounted = true;
    getProfile(user.id)
      .then((data) => {
        if (mounted) setProfile(data ?? null);
      })
      .catch(() => {
        if (mounted) setProfile(null);
      });

    return () => {
      mounted = false;
    };
  }, [user]);

  const runAction = useCallback(async (action, args) => {
    setError(null);
    try {
      return await action(args);
    } catch (cause) {
      setError(cause);
      throw cause;
    }
  }, []);

  const value = useMemo(
    () => ({
      session,
      user,
      profile,
      loading,
      error,
      isConfigured: supabaseConfig.isConfigured,
      isAuthenticated: Boolean(session),
      signIn: (args) => runAction(authSignIn, args),
      signUp: (args) => runAction(authSignUp, args),
      signOut: () => runAction(authSignOut),
      clearError: () => setError(null),
    }),
    [session, user, profile, loading, error, runAction]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider.');
  }
  return context;
}
