import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import Screen from '../../../src/components/layout/Screen';
import Card from '../../../src/components/ui/Card';
import Button from '../../../src/components/ui/Button';
import Chip from '../../../src/components/ui/Chip';
import SectionHeader from '../../../src/components/ui/SectionHeader';
import LoadingState from '../../../src/components/ui/LoadingState';
import ScanPreview from '../../../src/components/scan/ScanPreview';
import { useAuth } from '../../../src/context/AuthContext';
import { useImageCapture } from '../../../src/hooks/useImageCapture';
import { useUserScans } from '../../../src/hooks/useUserScans';
import { createScan } from '../../../src/services/scans';
import { uploadLeafImage } from '../../../src/services/storage';
import { createId } from '../../../src/lib/id';
import { plantTips } from '../../../src/data/sample';
import { colors, radius, spacing, typography } from '../../../src/theme';

export default function ScanScreen() {
  const router = useRouter();
  const { user, isConfigured } = useAuth();
  const { refresh } = useUserScans();
  const { image, busy, error, pick, clear } = useImageCapture();
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);
  const canSave = isConfigured && Boolean(user);

  async function savePhoto() {
    if (!image || !user || saving) return;

    setSaving(true);
    setSaveError(null);
    try {
      const id = createId();
      const imagePath = await uploadLeafImage({
        userId: user.id,
        imageUri: image.uri,
        scanId: id,
        mimeType: image.mimeType,
        fileSize: image.fileSize,
      });
      const scan = await createScan({ id, imagePath, status: 'pending' });
      await refresh();
      router.push({ pathname: '/result/[id]', params: { id: scan.id } });
    } catch (cause) {
      setSaveError(cause?.message || 'The photo could not be saved. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <Screen>
      <View style={styles.heading}>
        <Text style={styles.eyebrow}>SCAN A LEAF</Text>
        <Text style={styles.title}>{"Let's take a closer look"}</Text>
        <Text style={styles.subtitle}>
          Choose a clear, well-lit photo of a single leaf. Detection will run on a
          real model in a later milestone.
        </Text>
      </View>

      <Card variant="dark" style={styles.captureCard} padded={false}>
        <LinearGradient
          colors={[colors.forestDeep, colors.forest]}
          style={StyleSheet.absoluteFillObject}
        />
        <View style={styles.captureContent}>
          <View style={styles.scanIcon}>
            <Ionicons name="scan" size={30} color={colors.lime} />
          </View>
          <Text style={styles.captureTitle}>Choose an image source</Text>
          <Text style={styles.captureBody}>
            {canSave
              ? 'Your photo will be saved privately to your account. No analysis is run yet.'
              : 'Your photo stays on this device in this preview build.'}
          </Text>

          {busy ? (
            <LoadingState label="Opening image picker…" light />
          ) : (
            <View style={styles.captureActions}>
              <Button
                label="Use camera"
                icon="camera-outline"
                fullWidth
                onPress={() => pick('camera')}
              />
              <Button
                label="Open gallery"
                icon="images-outline"
                variant="outlineDark"
                fullWidth
                onPress={() => pick('gallery')}
              />
            </View>
          )}
        </View>
      </Card>

      {error ? (
        <Card style={[styles.noticeCard, styles.errorCard]}>
          <View style={styles.noticeRow}>
            <Ionicons name="alert-circle-outline" size={20} color={colors.red} />
            <View style={styles.noticeCopy}>
              <Text style={styles.noticeTitle}>Could not open image</Text>
              <Text style={styles.noticeBody}>{error}</Text>
            </View>
          </View>
        </Card>
      ) : null}

      {image ? (
        <Card style={styles.resultCard}>
          <SectionHeader
            title={canSave ? 'Photo ready' : 'Image ready'}
            subtitle={
              canSave
                ? 'Save it to your private scan library'
                : 'No analysis has been run yet'
            }
          />
          <ScanPreview uri={image.uri} />
          <View style={styles.spacer} />
          <Chip
            label={canSave ? 'PENDING ANALYSIS' : 'PREVIEW ONLY'}
            tone="amber"
            icon="information-circle-outline"
          />
          <Text style={styles.resultBody}>
            {canSave
              ? 'Saving creates a pending scan. No disease label or confidence score is generated until an inference service is connected.'
              : 'AI inference is not connected in this UI build. A real classification service will return the disease, confidence and care guidance.'}
          </Text>

          {saveError ? (
            <View style={styles.saveError}>
              <Ionicons name="alert-circle-outline" size={17} color={colors.red} />
              <Text style={styles.saveErrorText}>{saveError}</Text>
            </View>
          ) : null}

          <View style={styles.resultActions}>
            {canSave ? (
              <Button
                label="Save to my scans"
                icon="cloud-upload-outline"
                onPress={savePhoto}
                loading={saving}
              />
            ) : (
              <Button
                label="View a sample result"
                icon="document-text-outline"
                onPress={() =>
                  router.push({ pathname: '/result/[id]', params: { id: 'scan-001' } })
                }
              />
            )}
            <Button label="Clear image" variant="secondary" onPress={clear} />
          </View>
        </Card>
      ) : null}

      <View style={styles.section}>
        <SectionHeader
          title="Before you scan"
          subtitle="Better photos lead to better future analysis"
        />
        {plantTips.slice(0, 2).map((tip) => (
          <Card key={tip.id} variant="soft" style={styles.tipCard}>
            <View style={styles.tipRow}>
              <View style={styles.tipIcon}>
                <Ionicons name="checkmark-outline" size={16} color={colors.forest} />
              </View>
              <View style={styles.tipCopy}>
                <Text style={styles.tipTitle}>{tip.title}</Text>
                <Text style={styles.tipBody}>{tip.body}</Text>
              </View>
            </View>
          </Card>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  heading: { marginBottom: spacing.xl },
  eyebrow: { ...typography.caption, color: colors.forestMid, marginBottom: 8 },
  title: { ...typography.h1, color: colors.ink },
  subtitle: { ...typography.bodySmall, color: colors.muted, marginTop: 8, lineHeight: 20 },
  captureCard: { marginBottom: spacing.lg },
  captureContent: { padding: spacing.xl, alignItems: 'center' },
  scanIcon: {
    width: 62,
    height: 62,
    borderRadius: radius.lg,
    backgroundColor: 'rgba(201,242,122,0.14)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  captureTitle: { ...typography.h2, color: colors.white, textAlign: 'center' },
  captureBody: {
    ...typography.bodySmall,
    color: '#A9BDB1',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: spacing.xl,
    lineHeight: 20,
  },
  captureActions: { width: '100%', gap: spacing.md },
  noticeCard: { marginBottom: spacing.lg },
  errorCard: { borderLeftWidth: 3, borderLeftColor: colors.red },
  noticeRow: { flexDirection: 'row', alignItems: 'flex-start' },
  noticeCopy: { flex: 1, marginLeft: spacing.md },
  noticeTitle: { ...typography.h3, color: colors.ink, fontSize: 15 },
  noticeBody: { ...typography.bodySmall, color: colors.muted, marginTop: 4 },
  resultCard: { marginBottom: spacing.xl },
  spacer: { height: spacing.md },
  resultBody: {
    ...typography.bodySmall,
    color: colors.muted,
    marginTop: spacing.md,
    lineHeight: 20,
  },
  saveError: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginTop: spacing.md,
  },
  saveErrorText: { ...typography.bodySmall, color: colors.red, flex: 1, lineHeight: 18 },
  resultActions: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md, marginTop: spacing.xl },
  section: { marginBottom: spacing.xl },
  tipCard: { marginBottom: spacing.md },
  tipRow: { flexDirection: 'row', alignItems: 'flex-start' },
  tipIcon: {
    width: 32,
    height: 32,
    borderRadius: 12,
    backgroundColor: colors.lime,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  tipCopy: { flex: 1 },
  tipTitle: { ...typography.h3, color: colors.ink, fontSize: 15 },
  tipBody: { ...typography.bodySmall, color: colors.muted, marginTop: 3 },
});
