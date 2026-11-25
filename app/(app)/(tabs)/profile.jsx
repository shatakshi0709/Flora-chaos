import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import Screen from '../../../src/components/layout/Screen';
import Card from '../../../src/components/ui/Card';
import Button from '../../../src/components/ui/Button';
import LeafMark from '../../../src/components/ui/LeafMark';
import SectionHeader from '../../../src/components/ui/SectionHeader';
import { colors, radius, spacing, typography } from '../../../src/theme';

const stats = [
  { value: '12', label: 'Scans' },
  { value: '3', label: 'Detections' },
  { value: '92%', label: 'Avg. score' },
];

export default function ProfileScreen() {
  const router = useRouter();

  function showAbout() {
    Alert.alert(
      'Flora Chaos',
      'This is a UI preview. Accounts, storage and AI detection will be connected to real services in later milestones.'
    );
  }

  return (
    <Screen>
      <View style={styles.heading}>
        <Text style={styles.eyebrow}>YOUR SPACE</Text>
        <Text style={styles.title}>Profile</Text>
      </View>

      <Card variant="dark" style={styles.identity} padded={false}>
        <LinearGradient
          colors={[colors.forestDeep, colors.forestSoft]}
          style={StyleSheet.absoluteFillObject}
        />
        <View style={styles.identityContent}>
          <LeafMark size={64} light />
          <View style={styles.identityCopy}>
            <Text style={styles.name}>Preview gardener</Text>
            <Text style={styles.email}>preview@florachaos.app</Text>
          </View>
        </View>
        <View style={styles.statsRow}>
          {stats.map((stat) => (
            <View key={stat.label} style={styles.stat}>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>
      </Card>

      <View style={styles.section}>
        <SectionHeader title="Explore" subtitle="Everything in one place" />
        <Card style={styles.menuCard}>
          <MenuRow
            icon="scan-outline"
            label="Scan a leaf"
            hint="Camera or gallery"
            onPress={() => router.push('/scan')}
          />
          <MenuRow
            icon="time-outline"
            label="Scan history"
            hint="Review sample results"
            onPress={() => router.push('/history')}
          />
          <MenuRow
            icon="information-circle-outline"
            label="About this preview"
            hint="What is connected and what is not"
            onPress={showAbout}
          />
        </Card>
      </View>

      <View style={styles.section}>
        <SectionHeader title="Session" subtitle="Preview controls" />
        <Button
          label="Exit preview"
          icon="exit-outline"
          variant="secondary"
          fullWidth
          onPress={() => router.replace('/welcome')}
        />
      </View>

      <Text style={styles.footnote}>
        No account is active. Sign-in and sign-up will use Supabase in a later milestone.
      </Text>
    </Screen>
  );
}

function MenuRow({ icon, label, hint, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
    >
      <View style={styles.rowIcon}>
        <Ionicons name={icon} size={19} color={colors.forest} />
      </View>
      <View style={styles.rowCopy}>
        <Text style={styles.rowLabel}>{label}</Text>
        <Text style={styles.rowHint}>{hint}</Text>
      </View>
      <Ionicons name="chevron-forward" size={17} color={colors.muted} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  heading: { marginBottom: spacing.xl },
  eyebrow: { ...typography.caption, color: colors.forestMid, marginBottom: 8 },
  title: { ...typography.h1, color: colors.ink },
  identity: { marginBottom: spacing.xxl },
  identityContent: { flexDirection: 'row', alignItems: 'center', padding: spacing.xl },
  identityCopy: { marginLeft: spacing.lg, flex: 1 },
  name: { ...typography.h2, color: colors.white },
  email: { ...typography.bodySmall, color: '#A9BDB1', marginTop: 4 },
  statsRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.12)',
    paddingVertical: spacing.lg,
  },
  stat: { flex: 1, alignItems: 'center' },
  statValue: { ...typography.h2, color: colors.lime },
  statLabel: { ...typography.caption, color: '#A9BDB1', fontSize: 9, marginTop: 4 },
  section: { marginBottom: spacing.xxl },
  menuCard: { paddingVertical: spacing.sm },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: spacing.md },
  rowPressed: { opacity: 0.65 },
  rowIcon: {
    width: 42,
    height: 42,
    borderRadius: radius.md,
    backgroundColor: '#EAF6D2',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  rowCopy: { flex: 1 },
  rowLabel: { ...typography.h3, color: colors.ink, fontSize: 15 },
  rowHint: { ...typography.bodySmall, color: colors.muted, fontSize: 12, marginTop: 2 },
  footnote: {
    ...typography.bodySmall,
    color: colors.muted,
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: spacing.md,
  },
});
