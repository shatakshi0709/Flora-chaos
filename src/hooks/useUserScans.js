import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { sampleScans } from '../data/sample';
import { supabase } from '../lib/supabase';
import { listScans } from '../services/scans';

/**
 * Returns real, RLS-protected scans for a signed-in user.
 * Without credentials or a session it falls back to the clearly labelled
 * sample data so the existing preview UI keeps working.
 */
export function useUserScans() {
  const { isConfigured, user } = useAuth();
  const live = isConfigured && Boolean(user);
  const userId = user?.id ?? null;

  const [state, setState] = useState({
    key: null,
    scans: [],
    error: null,
    loading: false,
  });
  const [request, setRequest] = useState(0);

  const refresh = useCallback(() => {
    setState((current) => ({ ...current, loading: true, error: null }));
    setRequest((count) => count + 1);
  }, []);

  useEffect(() => {
    if (!live) return undefined;

    let mounted = true;
    listScans()
      .then((scans) => {
        if (!mounted) return;
        setState({ key: userId, scans, error: null, loading: false });
      })
      .catch((cause) => {
        if (!mounted) return;
        setState({
          key: userId,
          scans: [],
          error: cause?.message || 'Could not load scans.',
          loading: false,
        });
      });

    const channel = supabase
      .channel(`plant-scans:${userId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'plant_scans',
          filter: `user_id=eq.${userId}`,
        },
        refresh
      )
      .subscribe();

    return () => {
      mounted = false;
      supabase.removeChannel(channel);
    };
  }, [live, userId, request, refresh]);

  const isCurrent = state.key === userId;
  const scans = live && isCurrent ? state.scans : sampleScans;

  return {
    scans,
    loading: live && (!isCurrent || state.loading),
    error: live && isCurrent ? state.error : null,
    isPreview: !live,
    refresh,
  };
}
