/**
 * Image upload constraints for leaf photos.
 *
 * These values must stay in sync with the `leaf-images` bucket policy in
 * supabase/migrations/0001_supabase_backend.sql.
 */
export const uploadConfig = {
  bucket: 'leaf-images',
  maxBytes: 10 * 1024 * 1024,
  allowedTypes: ['image/jpeg', 'image/png', 'image/webp'],
  quality: 0.8,
};

export function formatMaxSize() {
  return `${Math.round(uploadConfig.maxBytes / (1024 * 1024))} MB`;
}
