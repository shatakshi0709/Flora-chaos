import { formatMaxSize, uploadConfig } from '../config/upload';

const extensions = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
};

export function extensionForMimeType(mimeType) {
  return extensions[mimeType] ?? 'jpg';
}

/** Turns raw Storage/network errors into actionable messages for the UI. */
export function describeImageError(error) {
  const message = error?.message || '';

  if (/fetch|network|offline|timeout/i.test(message)) {
    return 'Could not reach the server. Check your connection and try again.';
  }

  if (/row-level security|permission|not authorized/i.test(message)) {
    return 'You do not have permission to save this image. Sign in again and retry.';
  }

  return message || 'The image could not be saved. Please try again.';
}

/** Validates picker metadata before any bytes are sent to Storage. */
export function assertUploadableImage({ mimeType, fileSize }) {
  if (mimeType && !uploadConfig.allowedTypes.includes(mimeType)) {
    throw new Error('Only JPEG, PNG and WebP images can be uploaded.');
  }

  if (typeof fileSize === 'number' && fileSize > uploadConfig.maxBytes) {
    throw new Error(`That image is too large. Choose one under ${formatMaxSize()}.`);
  }
}
