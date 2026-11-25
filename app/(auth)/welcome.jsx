import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import Screen from '../../src/components/layout/Screen';
import Button from '../../src/components/ui/Button';
import LeafMark from '../../src/components/ui/LeafMark';
import { colors, radius, spacing, typography } from '../../src/theme';

const highlights = [
  { icon: 'scan-outline', label: 'Scan a leaf' },
  { icon: 'pulse-outline', label: 'Understand symptoms' },
  { icon: 'flower-outline', label: 'Care with confidence' },
];

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <Screen dark scroll={false}>
      <LinearGradient
        colors={[colors.forestDeep, colors.forest, colors.forestSoft]}
        style={StyleSheet.absoluteFillObject}
      >
        <View style={styles.orbOne} />
        <View style={styles.orbTwo} />
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.top}>
          <LeafMark size={58} />
          <Text style={styles.brand}>Flora Chaos</Text>
        </View>

        <View style={styles.hero}>
          <Text style={styles.eyebrow}>PLANT HEALTH COMPANION</Text>
          <Text style={styles.title}>
            A healthier garden{'\n'}
            <Text style={styles.titleAccent}>starts with a closer look.</Text>
          </Text>
          <Text style={styles.subtitle}>
            Photograph a leaf, review the findings, and follow clear care guidance —
            all in one calm, focused space.
          </Text>

          <View style={styles.highlights}>
            {highlights.map((item) => (
              <View key={item.label} style={styles.highlight}>
                <Ionicons name={item.icon} size={15} color={colors.lime} />
                <Text style={styles.highlightText}>{item.label}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.actions}>
          <Button
            label="Get started"
            icon="arrow-forward"
            trailingIcon="leaf-outline"
            fullWidth
            onPress={() => router.push('/signup')}
          />
          <Button
            label="I already have an account"
            variant="outlineDark"
            fullWidth
            onPress={() => router.push('/login')}
          />
          <Button
            label="Explore the UI preview"
            variant="ghostDark"
            fullWidth
            onPress={() => router.replace('/home')}
          />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { flex: 1, justifyContent: 'space-between', paddingVertical: spacing.xl },
  top: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  brand: { ...typography.h2, color: colors.white },
  hero: { marginTop: spacing.xl },
  eyebrow: { ...typography.caption, color: colors.lime, marginBottom: spacing.md },
  title: { ...typography.display, color: colors.white, fontSize: 38, lineHeight: 45 },
  titleAccent: { color: colors.lime },
  subtitle: {
    ...typography.body,
    color: '#C4D4C9',
    marginTop: spacing.lg,
    lineHeight: 23,
  },
  highlights: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginTop: spacing.xl },
  highlight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: radius.pill,
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  highlightText: { ...typography.bodySmall, color: '#DDE8DB', fontSize: 12 },
  actions: { gap: spacing.md, marginTop: spacing.xl },
  orbOne: {
    position: 'absolute',
    top: -90,
    right: -110,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: colors.forestSoft,
    opacity: 0.7,
  },
  orbTwo: {
    position: 'absolute',
    bottom: 130,
    left: -140,
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: colors.forestMid,
    opacity: 0.25,
  },
});
