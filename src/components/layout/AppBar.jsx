import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import LeafMark from '../ui/LeafMark';
import { colors, spacing, typography } from '../../theme';

export default function AppBar({
  eyebrow = 'WELCOME BACK',
  title = 'Good morning',
  subtitle = "Let's check on your plants.",
  showMark = true,
}) {
  const router = useRouter();

  return (
    <View style={styles.row}>
      <View style={styles.copy}>
        <Text style={styles.eyebrow}>{eyebrow}</Text>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      <Pressable
        onPress={() => router.push('/profile')}
        accessibilityRole="button"
        accessibilityLabel="Open profile"
        style={({ pressed }) => [styles.avatar, pressed && styles.pressed]}
      >
        {showMark ? <LeafMark size={38} light /> : <Text style={styles.initials}>FL</Text>}
        <View style={styles.dot} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xl,
  },
  copy: { flex: 1, paddingRight: spacing.md },
  eyebrow: { ...typography.caption, color: colors.forestMid, marginBottom: 6 },
  title: { ...typography.h1, color: colors.ink },
  subtitle: { ...typography.bodySmall, color: colors.muted, marginTop: 4 },
  avatar: { position: 'relative' },
  pressed: { opacity: 0.7 },
  dot: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.lime,
    borderWidth: 2,
    borderColor: colors.cream,
  },
  initials: { ...typography.caption, color: colors.forest },
});
