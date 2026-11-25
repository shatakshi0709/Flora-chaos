import { StyleSheet, View } from 'react-native';
import { colors, radius, shadow, spacing } from '../../theme';

/** Surface container used across dashboard, auth and result screens. */
export default function Card({ children, variant = 'surface', style, padded = true }) {
  return (
    <View
      style={[
        styles.base,
        padded && styles.padded,
        styles[variant],
        variant !== 'flat' && styles.elevated,
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: { borderRadius: radius.lg, overflow: 'hidden' },
  padded: { padding: spacing.xl },
  surface: { backgroundColor: colors.white },
  soft: { backgroundColor: colors.cream, borderWidth: 1, borderColor: colors.line },
  dark: { backgroundColor: colors.forest },
  outline: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.16)',
  },
  flat: { backgroundColor: 'transparent' },
  elevated: shadow.card,
});
