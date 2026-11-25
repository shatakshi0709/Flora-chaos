import { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import Screen from '../../../src/components/layout/Screen';
import Card from '../../../src/components/ui/Card';
import Button from '../../../src/components/ui/Button';
import LeafMark from '../../../src/components/ui/LeafMark';
import SectionHeader from '../../../src/components/ui/SectionHeader';
import { useAuth } from '../../../src/context/AuthContext';
import { useUserScans } from '../../../src/hooks/useUserScans';
import { colors, radius, spacing, typography } from '../../../src/theme';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, profile, isConfigured, signOut } = useAuth();
  const { scans, isPreview } = useUserScans();
  const [signingOut, setSigningOut] = useState(false);

  const displayName =
    profile?.full_name || user?.email?.split('@')[0] || 'Preview gardener';
  const displayEmail = user?.email || 'preview@florachaos.app';

  const scored = scans.filter((scan) => scan.confidence > 0);
  const average = scored.length
    ? `${Math.round(
        scored.reduce((total, scan) => total + scan.confidence, 0) / scored.length * 100
      )}%`
    : '—';
  const stats = [
    { value: String(scans.length), label: 'Scans' },
    { value: String(scans.filter((scan) => scan.status === 'detected').length), label: 'Detections' },
    { value: average, label: 'Avg. score' },
  ];

  function showAbout() {
    Alert.alert(
      'Flora Chaos',
      isConfigured
        ? 'Accounts and scan storage are connected to Supabase. AI disease detection is not connected yet, so saved scans stay pending.'
        : 'This is a UI preview. Accounts, storage and AI detection will be connected to real services in later milestones.'
    );
  }

  async function handleSignOut() {
    setSigningOut(true);
    try {
      await signOut();
      router.replace('/welcome');
    } catch (error) {
      Alert.alert('Could not sign out', error?.message || 'Please try again.');
    } finally {
      setSigningOut(false);
    }
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
            <Text style={styles.name}>{displayName}</Text>
            <Text style={styles.email}>{displayEmail}</Text>
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
            hint={isPreview ? 'Review sample results' : 'Review your saved scans'}
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
        <SectionHeader
          title="Session"
          subtitle={isConfigured ? 'Your Supabase account' : 'Preview controls'}
        />
        {isConfigured ? (
          <Button
            label="Sign out"
            icon="log-out-outline"
            variant="secondary"
            fullWidth
            loading={signingOut}
            onPress={handleSignOut}
          />
        ) : (
          <Button
            label="Exit preview"
            icon="exit-outline"
            variant="secondary"
            fullWidth
            onPress={() => router.replace('/welcome')}
          />
        )}
      </View>

      <Text style={styles.footnote}>
        {isConfigured
          ? 'Your scans are private to your account. No AI diagnosis has been generated.'
          : 'No account is active. Sign-in and sign-up will use Supabase when configured.'}
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
