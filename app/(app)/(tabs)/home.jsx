import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import Screen from '../../../src/components/layout/Screen';
import AppBar from '../../../src/components/layout/AppBar';
import Card from '../../../src/components/ui/Card';
import Button from '../../../src/components/ui/Button';
import SectionHeader from '../../../src/components/ui/SectionHeader';
import Chip from '../../../src/components/ui/Chip';
import ScanCard from '../../../src/components/scan/ScanCard';
import TipCard from '../../../src/components/home/TipCard';
import QuickNavCard from '../../../src/components/home/QuickNavCard';
import { sampleScans, plantTips } from '../../../src/data/sample';
import { colors, spacing, typography } from '../../../src/theme';

export default function HomeScreen() {
  const router = useRouter();
  const recent = sampleScans.slice(0, 3);

  return (
    <Screen>
      <AppBar
        eyebrow="WELCOME BACK"
        title="Good morning, gardener"
        subtitle="Your plants are waiting for a quick check-in."
      />

      <Card variant="dark" style={styles.hero} padded={false}>
        <LinearGradient
          colors={[colors.forestDeep, colors.forestSoft]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFillObject}
        >
          <View style={styles.heroGlow} />
        </LinearGradient>
        <View style={styles.heroContent}>
          <Chip label="AI-ASSISTED SCAN" tone="lime" icon="sparkles-outline" />
          <Text style={styles.heroTitle}>See what your leaves are telling you.</Text>
          <Text style={styles.heroBody}>
            Capture a leaf and review possible issues with clear, practical guidance.
          </Text>
          <Button
            label="Scan a plant"
            icon="camera-outline"
            trailingIcon="arrow-forward"
            onPress={() => router.push('/scan')}
            style={styles.heroButton}
          />
        </View>
      </Card>

      <View style={styles.section}>
        <SectionHeader
          title="Recent scans"
          subtitle="Your latest preview analyses"
          actionLabel="See all"
          onAction={() => router.push('/history')}
        />
        {recent.map((scan) => (
          <ScanCard key={scan.id} scan={scan} compact />
        ))}
      </View>

      <View style={styles.section}>
        <SectionHeader
          title="Plant health tips"
          subtitle="Small habits, healthier leaves"
        />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tipsRow}
        >
          {plantTips.map((tip) => (
            <TipCard key={tip.id} tip={tip} />
          ))}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <SectionHeader title="Quick navigation" subtitle="Jump back in" />
        <View style={styles.quickGrid}>
          <QuickNavCard
            icon="scan-outline"
            label="Scan"
            hint="Open camera or gallery"
            onPress={() => router.push('/scan')}
          />
          <QuickNavCard
            icon="time-outline"
            label="History"
            hint="Review saved scans"
            onPress={() => router.push('/history')}
          />
          <QuickNavCard
            icon="person-outline"
            label="Profile"
            hint="Your preview account"
            onPress={() => router.push('/profile')}
          />
        </View>
      </View>

      <View style={styles.footnote}>
        <Ionicons name="information-circle-outline" size={15} color={colors.muted} />
        <Text style={styles.footnoteText}>
          UI preview — results shown are sample data, not diagnoses.
        </Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: { marginBottom: spacing.xxl },
  heroContent: { padding: spacing.xl },
  heroGlow: {
    position: 'absolute',
    right: -60,
    top: -70,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: colors.lime,
    opacity: 0.12,
  },
  heroTitle: {
    ...typography.h2,
    color: colors.white,
    fontSize: 25,
    lineHeight: 32,
    marginTop: spacing.lg,
    maxWidth: 300,
  },
  heroBody: {
    ...typography.bodySmall,
    color: '#C4D4C9',
    marginTop: spacing.md,
    lineHeight: 20,
    maxWidth: 320,
  },
  heroButton: { alignSelf: 'flex-start', marginTop: spacing.xl, paddingHorizontal: spacing.xl },
  section: { marginBottom: spacing.xxl },
  tipsRow: { paddingRight: spacing.xl },
  quickGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
  footnote: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: spacing.sm,
    marginTop: spacing.md,
  },
  footnoteText: { ...typography.bodySmall, color: colors.muted, fontSize: 12 },
});
