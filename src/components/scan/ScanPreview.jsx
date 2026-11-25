import { StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors, radius, spacing, typography } from '../../theme';

/** Shows the locally selected photo. No inference result is implied. */
export default function ScanPreview({ uri }) {
  return (
    <View style={styles.wrapper}>
      <Image source={{ uri }} style={styles.image} contentFit="cover" />
      <View style={styles.badge}>
        <Ionicons name="eye-outline" size={13} color={colors.forest} />
        <Text style={styles.badgeText}>Image ready for analysis</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: radius.lg,
    overflow: 'hidden',
    marginTop: spacing.lg,
    backgroundColor: colors.cream,
  },
  image: { width: '100%', height: 280 },
  badge: {
    position: 'absolute',
    left: spacing.md,
    bottom: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.lime,
    borderRadius: radius.pill,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  badgeText: { ...typography.caption, color: colors.forest, fontSize: 10 },
});
