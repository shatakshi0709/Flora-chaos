import { Platform } from 'react-native';
import { File } from 'expo-file-system';
import { uploadConfig } from '../config/upload';
import { supabase } from '../lib/supabase';

export const LEAF_BUCKET = uploadConfig.bucket;

function client() {
  if (!supabase) throw new Error('Supabase is not configured.');
  return supabase;
}

async function readAsUploadBody(uri) {
  if (Platform.OS !== 'web') {
    try {
      return await new File(uri).arrayBuffer();
    } catch {
      // Fall back to fetch for content:// URIs returned by some pickers.
    }
  }

  const response = await fetch(uri);
  if (!response.ok) throw new Error('The selected image could not be read.');
  return Platform.OS === 'web' ? response.blob() : response.arrayBuffer();
}

/**
 * Uploads a leaf photo to a private bucket. Objects are always stored under
 * the signed-in user's id so the storage RLS policy can restrict access.
 */
export async function uploadLeafImage({ userId, imageUri, scanId }) {
  if (!userId) throw new Error('You must be signed in to save an image.');
  const path = `${userId}/${scanId}.jpg`;
  const body = await readAsUploadBody(imageUri);

  const { error } = await client()
    .storage.from(LEAF_BUCKET)
    .upload(path, body, {
      contentType: 'image/jpeg',
      upsert: false,
    });

  if (error) throw error;
  return path;
}

export async function getSignedImageUrl(path, expiresIn = 3600) {
  const { data, error } = await client()
    .storage.from(LEAF_BUCKET)
    .createSignedUrl(path, expiresIn);

  if (error) throw error;
  return data.signedUrl;
}
