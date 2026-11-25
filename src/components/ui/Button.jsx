import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors, radius, spacing, typography } from '../../theme';

/**
 * Reusable action button. Variants cover light surfaces and dark hero areas.
 */
export default function Button({
  label,
  onPress,
  variant = 'primary',
  icon,
  trailingIcon,
  loading = false,
  disabled = false,
  fullWidth = false,
  style,
  textStyle,
  ...rest
}) {
  const isDarkVariant = variant === 'outlineDark' || variant === 'ghostDark';
  const contentColor =
    variant === 'primary'
      ? colors.forest
      : isDarkVariant
        ? colors.white
        : colors.ink;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.base,
        styles[variant],
        fullWidth && styles.fullWidth,
        pressed && styles.pressed,
        (disabled || loading) && styles.disabled,
        style,
      ]}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color={contentColor} size="small" />
      ) : (
        <>
          {icon ? (
            <Ionicons
              name={icon}
              size={18}
              color={contentColor}
              style={styles.icon}
            />
          ) : null}
          <Text style={[styles.label, { color: contentColor }, textStyle]}>
            {label}
          </Text>
          {trailingIcon ? (
            <Ionicons
              name={trailingIcon}
              size={18}
              color={contentColor}
              style={styles.trailing}
            />
          ) : null}
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 54,
    borderRadius: radius.md,
    paddingHorizontal: spacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullWidth: { width: '100%' },
  primary: {
    backgroundColor: colors.lime,
    ...shadowSoft(),
  },
  secondary: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line,
  },
  outlineDark: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.24)',
  },
  ghostDark: { backgroundColor: 'transparent', paddingHorizontal: spacing.sm },
  ghost: { backgroundColor: 'transparent', paddingHorizontal: spacing.sm },
  pressed: { opacity: 0.78, transform: [{ scale: 0.985 }] },
  disabled: { opacity: 0.5 },
  label: { ...typography.h3, fontSize: 15, textAlign: 'center' },
  icon: { marginRight: 10 },
  trailing: { marginLeft: 10 },
});

function shadowSoft() {
  return {
    shadowColor: colors.forest,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 16,
    elevation: 5,
  };
}
