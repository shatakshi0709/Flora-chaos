import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import Chip from '../ui/Chip';
import { colors, radius, shadow, spacing, typography } from '../../theme';
import { formatDate } from '../../data/sample';

const tones = {
  amber: ['#F7DCA8', '#EFC477'],
  blue: ['#CFE9EF', '#A9D6E0'],
  lime: ['#E3F4C4', '#C9F27A'],
  red: ['#F6CFC7', '#E88A7A'],
};

/** A history/preview row. Pressing opens the stored result screen. */
export default function ScanCard({ scan, compact = false }) {
  const router = useRouter();
  const statusTone = scan.status === 'healthy' ? 'lime' : scan.severity === 'High' ? 'red' : 'amber';

  return (
    <Pressable
      onPress={() => router.push({ pathname: '/result/[id]', params: { id: scan.id } })}
      accessibilityRole="button"
      accessibilityLabel={`View ${scan.disease} result`}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <LinearGradient
        colors={tones[scan.tone] ?? tones.lime}
        style={styles.thumb}
      >
        <Ionicons
          name={scan.status === 'healthy' ? 'leaf' : 'leaf-outline'}
          size={28}
          color={colors.forest}
        />
      </LinearGradient>

      <View style={styles.body}>
        <View style={styles.titleRow}>
          <Text style={styles.title} numberOfLines={1}>
            {scan.disease}
          </Text>
          <Ionicons name="chevron-forward" size={17} color={colors.muted} />
        </View>
        <Text style={styles.meta}>
          {scan.crop} · {formatDate(scan.date)}
        </Text>
        {!compact ? (
          <View style={styles.footer}>
            <Chip label={scan.severity} tone={statusTone} />
            <Text style={styles.confidence}>
              {Math.round(scan.confidence * 100)}% match
            </Text>
          </View>
        ) : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...shadow.card,
  },
  pressed: { opacity: 0.75 },
  thumb: {
    width: 66,
    height: 66,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: { flex: 1, marginLeft: spacing.lg, minWidth: 0 },
  titleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  title: { ...typography.h3, color: colors.ink, flexShrink: 1 },
  meta: { ...typography.bodySmall, color: colors.muted, marginTop: 3 },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
  },
  confidence: { ...typography.bodySmall, color: colors.forestMid },
});
