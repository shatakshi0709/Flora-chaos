import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getDiseaseForScan, getScanById as getSampleScan } from '../data/sample';
import { getScanById } from '../services/scans';

/**
 * Loads one scan for the result modal.
 * Sample ids keep working in preview mode; real ids are fetched with the
 * signed-in user's RLS-protected session.
 */
export function useScanResult(id) {
  const { isConfigured, user } = useAuth();
  const sample = getSampleScan(id);
  const shouldFetch = !sample && isConfigured && Boolean(user);

  const [result, setResult] = useState({ key: null, scan: null, error: null });

  useEffect(() => {
    if (!shouldFetch) return undefined;

    let mounted = true;
    getScanById(id)
      .then((scan) => {
        if (!mounted) return;
        setResult({ key: id, scan: scan ?? null, error: null });
      })
      .catch((cause) => {
        if (!mounted) return;
        setResult({
          key: id,
          scan: null,
          error: cause?.message || 'Could not load this scan.',
        });
      });

    return () => {
      mounted = false;
    };
  }, [id, shouldFetch]);

  const isCurrent = result.key === id;
  const scan = sample ?? (isCurrent ? result.scan : null);

  return {
    scan,
    disease: scan ? getDiseaseForScan(scan) : null,
    loading: shouldFetch && !isCurrent,
    error: isCurrent ? result.error : null,
    isPreview: Boolean(sample),
  };
}
