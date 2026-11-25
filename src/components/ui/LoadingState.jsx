import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../../theme';

export default function LoadingState({ label = 'Loading…', light = false }) {
  return (
    <View style={styles.wrapper}>
      <ActivityIndicator color={light ? colors.lime : colors.forestMid} size="large" />
      <Text style={[styles.label, light && styles.light]}>{label}</Text>
    </View>
  );
}

export function SkeletonCard() {
  return (
    <View style={styles.skeleton}>
      <View style={[styles.bar, { width: '30%', height: 10 }]} />
      <View style={[styles.bar, { width: '72%', height: 16, marginTop: 12 }]} />
      <View style={[styles.bar, { width: '50%', height: 10, marginTop: 12 }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxl,
  },
  label: { ...typography.bodySmall, color: colors.muted, marginTop: spacing.md },
  light: { color: '#A9BDB1' },
  skeleton: {
    backgroundColor: colors.cream,
    borderRadius: 20,
    padding: spacing.xl,
    marginBottom: spacing.md,
  },
  bar: { borderRadius: 8, backgroundColor: '#E2E9E1' },
});
