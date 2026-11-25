import { useMemo, useState } from 'react';
import { sampleScans } from '../data/sample';

/**
 * Local filtering over preview data. No network request is simulated.
 */
export function useScanLibrary(initialScans = sampleScans) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');

  const scans = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return initialScans.filter((scan) => {
      const matchesQuery =
        !needle ||
        scan.crop.toLowerCase().includes(needle) ||
        scan.disease.toLowerCase().includes(needle);
      const matchesFilter =
        filter === 'all' ||
        (filter === 'detected' && scan.status === 'detected') ||
        (filter === 'healthy' && scan.status === 'healthy');
      return matchesQuery && matchesFilter;
    });
  }, [initialScans, query, filter]);

  return {
    scans,
    query,
    setQuery,
    filter,
    setFilter,
    isEmpty: scans.length === 0,
  };
}
