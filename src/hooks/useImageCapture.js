import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

/**
 * Real camera/gallery access. Detection is intentionally not performed here:
 * the selected image is only prepared for a future inference service.
 */
export function useImageCapture() {
  const [image, setImage] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);

  async function pick(source) {
    setBusy(true);
    setError(null);

    try {
      const permission =
        source === 'camera'
          ? await ImagePicker.requestCameraPermissionsAsync()
          : await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        setError(
          source === 'camera'
            ? 'Camera access is needed to take a leaf photo.'
            : 'Photo library access is needed to choose a leaf image.'
        );
        return;
      }

      const options = {
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
        base64: false,
      };

      const result =
        source === 'camera'
          ? await ImagePicker.launchCameraAsync(options)
          : await ImagePicker.launchImageLibraryAsync(options);

      if (!result.canceled && result.assets?.[0]) {
        setImage(result.assets[0]);
      }
    } catch {
      setError('The image picker could not be opened. Please try again.');
    } finally {
      setBusy(false);
    }
  }

  function clear() {
    setImage(null);
    setError(null);
  }

  return { image, setImage, busy, error, pick, clear };
}
