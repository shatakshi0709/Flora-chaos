import { Pressable, StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors, spacing, typography } from '../../theme';

export default function SectionHeader({
  title,
  subtitle,
  actionLabel,
  onAction,
  light = false,
}) {
  return (
    <View style={styles.row}>
      <View style={styles.copy}>
        <Text style={[styles.title, light && styles.titleLight]}>{title}</Text>
        {subtitle ? (
          <Text style={[styles.subtitle, light && styles.subtitleLight]}>
            {subtitle}
          </Text>
        ) : null}
      </View>
      {actionLabel && onAction ? (
        <Pressable onPress={onAction} accessibilityRole="button" style={styles.action}>
          <Text style={[styles.actionText, light && styles.actionTextLight]}>
            {actionLabel}
          </Text>
          <Ionicons
            name="chevron-forward"
            size={16}
            color={light ? colors.lime : colors.forestMid}
          />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  copy: { flex: 1, paddingRight: spacing.md },
  title: { ...typography.h2, color: colors.ink },
  titleLight: { color: colors.white },
  subtitle: { ...typography.bodySmall, color: colors.muted, marginTop: 4 },
  subtitleLight: { color: '#A9BDB1' },
  action: { flexDirection: 'row', alignItems: 'center', paddingVertical: 6 },
  actionText: { ...typography.bodySmall, color: colors.forestMid, marginRight: 2 },
  actionTextLight: { color: colors.lime },
});
