import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import Screen from '../../../src/components/layout/Screen';
import Card from '../../../src/components/ui/Card';
import Button from '../../../src/components/ui/Button';
import Chip from '../../../src/components/ui/Chip';
import ConfidenceBar from '../../../src/components/ui/ConfidenceBar';
import EmptyState from '../../../src/components/ui/EmptyState';
import SectionHeader from '../../../src/components/ui/SectionHeader';
import { BulletList, NumberedList } from '../../../src/components/result/InfoList';
import {
  formatDate,
  getDiseaseForScan,
  getScanById,
} from '../../../src/data/sample';
import { colors, radius, spacing, typography } from '../../../src/theme';

export default function ResultScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const scan = getScanById(id);
  const disease = getDiseaseForScan(scan);

  if (!scan || !disease) {
    return (
      <Screen>
        <EmptyState
          icon="document-outline"
          title="Result not found"
          message="This preview result is no longer available. Browse the sample history instead."
          actionLabel="Back to history"
          onAction={() => router.replace('/history')}
        />
      </Screen>
    );
  }

  const tone = scan.status === 'healthy' ? 'lime' : scan.severity === 'High' ? 'red' : 'amber';

  return (
    <Screen>
      <Card variant="dark" style={styles.hero} padded={false}>
        <LinearGradient
          colors={[colors.forestDeep, colors.forestSoft]}
          style={StyleSheet.absoluteFillObject}
        />
        <View style={styles.heroGlow} />

        <Pressable
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel="Close result"
          style={styles.close}
        >
          <Ionicons name="close" size={19} color={colors.white} />
        </Pressable>

        <View style={styles.heroContent}>
          <Chip label="SAMPLE RESULT" tone="neutral" icon="information-circle-outline" />
          <Text style={styles.crop}>{scan.crop}</Text>
          <Text style={styles.disease}>{scan.disease}</Text>
          <Text style={styles.date}>Scanned {formatDate(scan.date)}</Text>

          <View style={styles.confidenceBox}>
            <ConfidenceBar value={scan.confidence} label="Model confidence" light />
            <Text style={styles.confidenceNote}>
              Score shown from the sample record. Real results come from the inference model.
            </Text>
          </View>

          <View style={styles.heroChips}>
            <Chip label={scan.severity} tone={tone} icon="pulse-outline" />
            <Chip label={scan.status === 'healthy' ? 'No issue' : 'Possible issue'} tone="lime" />
          </View>
        </View>
      </Card>

      <View style={styles.section}>
        <SectionHeader title="What the sample shows" subtitle={disease.cause} />
        <Card>
          <Text style={styles.summary}>{disease.summary}</Text>
        </Card>
      </View>

      <View style={styles.section}>
        <SectionHeader title="Common symptoms" subtitle="What to look for" />
        <Card>
          <BulletList items={disease.symptoms} />
        </Card>
      </View>

      <View style={styles.section}>
        <SectionHeader title="Recommended care" subtitle="Practical next steps" />
        <Card>
          <NumberedList items={disease.treatment} />
        </Card>
      </View>

      <Card variant="soft" style={styles.disclaimer}>
        <View style={styles.disclaimerRow}>
          <Ionicons name="shield-outline" size={20} color={colors.forestMid} />
          <View style={styles.disclaimerCopy}>
            <Text style={styles.disclaimerTitle}>AI-assisted, not a diagnosis</Text>
            <Text style={styles.disclaimerBody}>
              This screen demonstrates result presentation with sample data. Confirm
              serious plant health issues with a local agronomist or extension service.
            </Text>
          </View>
        </View>
      </Card>

      <View style={styles.actions}>
        <Button
          label="Scan another leaf"
          icon="camera-outline"
          fullWidth
          onPress={() => router.replace('/scan')}
        />
        <Button
          label="Back to history"
          variant="secondary"
          fullWidth
          onPress={() => router.replace('/history')}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: { marginBottom: spacing.xxl },
  heroGlow: {
    position: 'absolute',
    top: -80,
    right: -90,
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: colors.lime,
    opacity: 0.12,
  },
  close: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
    zIndex: 2,
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  heroContent: { padding: spacing.xl, paddingTop: spacing.xxl + spacing.md },
  crop: { ...typography.caption, color: colors.lime, marginTop: spacing.lg },
  disease: {
    ...typography.h1,
    color: colors.white,
    fontSize: 32,
    marginTop: 8,
    maxWidth: 280,
  },
  date: { ...typography.bodySmall, color: '#A9BDB1', marginTop: 8 },
  confidenceBox: {
    marginTop: spacing.xl,
    padding: spacing.lg,
    borderRadius: radius.md,
    backgroundColor: 'rgba(255,255,255,0.07)',
  },
  confidenceNote: {
    ...typography.bodySmall,
    color: '#A9BDB1',
    fontSize: 11,
    lineHeight: 17,
    marginTop: 6,
  },
  heroChips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginTop: spacing.lg },
  section: { marginBottom: spacing.xl },
  summary: { ...typography.body, color: colors.text, lineHeight: 24 },
  disclaimer: { marginBottom: spacing.xl },
  disclaimerRow: { flexDirection: 'row', alignItems: 'flex-start' },
  disclaimerCopy: { flex: 1, marginLeft: spacing.md },
  disclaimerTitle: { ...typography.h3, color: colors.ink, fontSize: 15 },
  disclaimerBody: {
    ...typography.bodySmall,
    color: colors.muted,
    marginTop: 5,
    lineHeight: 19,
  },
  actions: { gap: spacing.md, paddingBottom: spacing.xl },
});
