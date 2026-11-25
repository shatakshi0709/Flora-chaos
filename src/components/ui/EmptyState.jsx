import { StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Button from './Button';
import { colors, radius, spacing, typography } from '../../theme';

export default function EmptyState({
  icon = 'leaf-outline',
  title,
  message,
  actionLabel,
  onAction,
}) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.iconWrap}>
        <Ionicons name={icon} size={34} color={colors.forestMid} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      {actionLabel && onAction ? (
        <Button label={actionLabel} onPress={onAction} variant="secondary" />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xxl,
    borderRadius: radius.lg,
    backgroundColor: colors.cream,
  },
  iconWrap: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E9F2DF',
    marginBottom: spacing.lg,
  },
  title: { ...typography.h2, color: colors.ink, textAlign: 'center' },
  message: {
    ...typography.body,
    color: colors.muted,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: spacing.xl,
  },
});
