import { supabase } from '../lib/supabase';

const TABLE = 'plant_scans';

function client() {
  if (!supabase) throw new Error('Supabase is not configured.');
  return supabase;
}

function toneFor(row) {
  if (row.status === 'healthy') return 'lime';
  if (row.severity === 'High') return 'red';
  if (row.status === 'pending') return 'neutral';
  return row.severity === 'Mild' ? 'blue' : 'amber';
}

/** Maps a database row to the exact shape used by the existing UI components. */
export function mapScan(row) {
  return {
    id: row.id,
    crop: row.crop || 'Unspecified crop',
    disease:
      row.disease_name ||
      (row.status === 'pending' ? 'Analysis pending' : 'No result recorded'),
    slug: row.disease_slug || '',
    confidence: typeof row.confidence === 'number' ? row.confidence : 0,
    severity: row.severity || (row.status === 'pending' ? 'Pending' : 'Unknown'),
    status: row.status || 'pending',
    date: row.created_at,
    tone: row.tone || toneFor(row),
    imagePath: row.image_path || null,
    provider: row.provider || null,
    modelVersion: row.model_version || null,
    needsReview: Boolean(row.needs_review),
    isPreview: false,
  };
}

export async function listScans() {
  const { data, error } = await client()
    .from(TABLE)
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return (data ?? []).map(mapScan);
}

export async function getScanById(id) {
  const { data, error } = await client()
    .from(TABLE)
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error) throw error;
  return data ? mapScan(data) : null;
}

/**
 * Creates a scan record. Passing no disease fields stores a pending scan only:
 * no AI prediction is invented here.
 */
export async function createScan(scan) {
  const payload = {
    id: scan.id,
    image_path: scan.imagePath || null,
    crop: scan.crop || 'Unspecified crop',
    status: scan.status || 'pending',
    disease_name: scan.diseaseName || null,
    disease_slug: scan.diseaseSlug || null,
    confidence: scan.confidence ?? null,
    severity: scan.severity || null,
    provider: scan.provider || null,
    model_version: scan.modelVersion || null,
    needs_review: Boolean(scan.needsReview),
  };

  const { data, error } = await client()
    .from(TABLE)
    .insert(payload)
    .select('*')
    .single();

  if (error) throw error;
  return mapScan(data);
}

export async function deleteScan(id) {
  const { error } = await client().from(TABLE).delete().eq('id', id);
  if (error) throw error;
}
