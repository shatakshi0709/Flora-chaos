import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { sampleScans } from '../data/sample';
import { supabase } from '../lib/supabase';
import { listScans } from '../services/scans';

// Realtime topics must be unique across every hook instance. Several screens
// mount useUserScans() at once, and supabase.channel() returns an existing
// channel when the topic matches, so a per-hook counter is not sufficient.
let channelCounter = 0;
const channelEpoch = Date.now();

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

  // Fetching is driven by an explicit refresh counter. Realtime events call
  // refresh(), so they re-fetch without tearing down the subscription.
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

    return () => {
      mounted = false;
    };
  }, [live, userId, request]);

  // Subscribe once per mount. The topic uses a module-level counter so two
  // simultaneously mounted hook instances never resolve to the same channel.
  useEffect(() => {
    if (!live || !userId || !supabase) return undefined;

    let active = true;
    const channel = supabase.channel(
      `plant-scans:${userId}:${channelEpoch}:${++channelCounter}`
    );

    channel.on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'plant_scans',
        filter: `user_id=eq.${userId}`,
      },
      () => {
        if (active) refresh();
      }
    );
    channel.subscribe();

    return () => {
      active = false;
      supabase.removeChannel(channel).catch(() => {});
    };
  }, [live, userId, refresh]);

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
