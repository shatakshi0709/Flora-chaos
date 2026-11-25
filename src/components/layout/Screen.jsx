import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing } from '../../theme';

/** Safe-area aware screen shell with consistent horizontal padding. */
export default function Screen({
  children,
  dark = false,
  scroll = true,
  style,
  contentStyle,
  edges = ['top', 'left', 'right'],
}) {
  const Content = scroll ? ScrollView : View;

  return (
    <SafeAreaView
      style={[styles.safe, dark && styles.safeDark]}
      edges={edges}
    >
      <Content
        style={[styles.base, !scroll && styles.flex, style]}
        contentContainerStyle={scroll ? [styles.content, contentStyle] : undefined}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </Content>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.cream },
  safeDark: { backgroundColor: colors.forest },
  base: { flex: 1 },
  flex: { flexGrow: 1 },
  content: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xxxl,
  },
});
