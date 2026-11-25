import { formatMaxSize, uploadConfig } from '../config/upload';

const extensions = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
};

export function extensionForMimeType(mimeType) {
  return extensions[mimeType] ?? 'jpg';
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
