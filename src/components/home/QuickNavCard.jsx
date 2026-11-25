import { Pressable, StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors, radius, spacing, typography } from '../../theme';

export default function QuickNavCard({ icon, label, hint, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <View style={styles.iconWrap}>
        <Ionicons name={icon} size={22} color={colors.forest} />
      </View>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.hint} numberOfLines={2}>
        {hint}
      </Text>
      <Ionicons
        name="arrow-forward"
        size={16}
        color={colors.forestMid}
        style={styles.arrow}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: 150,
    minHeight: 150,
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  pressed: { opacity: 0.75 },
  iconWrap: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: '#EAF6D2',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  label: { ...typography.h3, color: colors.ink, fontSize: 16 },
  hint: { ...typography.bodySmall, color: colors.muted, marginTop: 4, paddingRight: 12 },
  arrow: { position: 'absolute', top: spacing.lg, right: spacing.lg },
});
