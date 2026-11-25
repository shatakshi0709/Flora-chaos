import { useEffect, useMemo } from 'react';
import { Animated, Platform, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import LeafMark from '../src/components/ui/LeafMark';
import { colors, spacing, typography } from '../src/theme';

/** Branded in-app splash. It is an intro animation, not a fake loading task. */
export default function SplashScreen() {
  const router = useRouter();
  const opacity = useMemo(() => new Animated.Value(0), []);
  const scale = useMemo(() => new Animated.Value(0.82), []);

  useEffect(() => {
    const animation = Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 700,
        useNativeDriver: Platform.OS !== 'web',
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 7,
        tension: 60,
        useNativeDriver: Platform.OS !== 'web',
      }),
    ]);
    animation.start();

    const timer = setTimeout(() => router.replace('/welcome'), 1900);
    return () => {
      animation.stop();
      clearTimeout(timer);
    };
  }, [opacity, scale, router]);

  return (
    <LinearGradient
      colors={[colors.forestDeep, colors.forest, colors.forestSoft]}
      style={styles.fill}
    >
      <Animated.View
        style={[styles.content, { opacity, transform: [{ scale }] }]}
      >
        <LeafMark size={112} />
        <Text style={styles.brand}>Flora Chaos</Text>
        <Text style={styles.tagline}>Grow with confidence.</Text>
        <View style={styles.divider} />
        <Text style={styles.footnote}>AI-assisted plant care companion</Text>
      </Animated.View>
      <View style={styles.bottomGlow} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  content: { alignItems: 'center', paddingHorizontal: spacing.xl },
  brand: {
    ...typography.display,
    color: colors.white,
    marginTop: spacing.xl,
    textAlign: 'center',
  },
  tagline: {
    ...typography.body,
    color: colors.lime,
    marginTop: spacing.sm,
    letterSpacing: 0.4,
  },
  divider: {
    width: 48,
    height: 3,
    borderRadius: 2,
    backgroundColor: colors.lime,
    marginTop: spacing.xl,
    opacity: 0.7,
  },
  footnote: {
    ...typography.caption,
    color: '#9DB6A7',
    marginTop: spacing.lg,
    textAlign: 'center',
  },
  bottomGlow: {
    position: 'absolute',
    bottom: -120,
    width: 360,
    height: 240,
    borderRadius: 180,
    backgroundColor: colors.forestSoft,
    opacity: 0.5,
  },
});
