import { StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing, typography } from '../../theme';

/** Displays a real confidence value. Never invents or rounds up a score. */
export default function ConfidenceBar({ value, label = 'Confidence', light = false }) {
  const safeValue = Math.min(Math.max(Number(value) || 0, 0), 1);
  const percent = Math.round(safeValue * 100);

  return (
    <View style={styles.wrapper}>
      <View style={styles.meta}>
        <Text style={[styles.label, light && styles.lightText]}>{label}</Text>
        <Text style={[styles.value, light && styles.lightText]}>{percent}%</Text>
      </View>
      <View style={[styles.track, light && styles.trackLight]}>
        <View style={[styles.fill, { width: `${percent}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginVertical: spacing.sm },
  meta: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  label: { ...typography.bodySmall, color: colors.muted },
  value: { ...typography.h3, color: colors.forest },
  lightText: { color: colors.white },
  track: {
    height: 9,
    borderRadius: radius.pill,
    backgroundColor: '#E6EBE4',
    overflow: 'hidden',
  },
  trackLight: { backgroundColor: 'rgba(255,255,255,0.18)' },
  fill: { height: '100%', borderRadius: radius.pill, backgroundColor: colors.lime },
});
