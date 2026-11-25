import { Pressable, StyleSheet, Text, View } from 'react-native';
import Screen from '../../../src/components/layout/Screen';
import Card from '../../../src/components/ui/Card';
import Input from '../../../src/components/ui/Input';
import Chip from '../../../src/components/ui/Chip';
import ScanCard from '../../../src/components/scan/ScanCard';
import EmptyState from '../../../src/components/ui/EmptyState';
import { useScanLibrary } from '../../../src/hooks/useScanLibrary';
import { colors, radius, spacing, typography } from '../../../src/theme';

const filters = [
  { id: 'all', label: 'All scans' },
  { id: 'detected', label: 'Detected' },
  { id: 'healthy', label: 'Healthy' },
];

export default function HistoryScreen() {
  const { scans, query, setQuery, filter, setFilter, isEmpty } = useScanLibrary();

  function reset() {
    setQuery('');
    setFilter('all');
  }

  return (
    <Screen>
      <View style={styles.heading}>
        <Text style={styles.eyebrow}>YOUR LIBRARY</Text>
        <Text style={styles.title}>Scan history</Text>
        <Text style={styles.subtitle}>Browse your recent preview analyses.</Text>
      </View>

      <Card style={styles.searchCard}>
        <Input
          label="Search scans"
          icon="search-outline"
          value={query}
          onChangeText={setQuery}
          placeholder="Try tomato, maize, rust…"
          autoCapitalize="none"
        />
        <View style={styles.filters}>
          {filters.map((item) => {
            const active = filter === item.id;
            return (
              <Pressable
                key={item.id}
                onPress={() => setFilter(item.id)}
                accessibilityRole="button"
                accessibilityLabel={item.label}
                style={[styles.filter, active && styles.filterActive]}
              >
                <Text style={[styles.filterLabel, active && styles.filterLabelActive]}>
                  {item.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </Card>

      <View style={styles.listHeader}>
        <Text style={styles.count}>{scans.length} result{scans.length === 1 ? '' : 's'}</Text>
        <Chip label="SAMPLE DATA" tone="neutral" icon="information-circle-outline" />
      </View>

      {isEmpty ? (
        <EmptyState
          icon="search-outline"
          title="No matching scans"
          message="Try a different crop name or clear the filters to see all preview scans."
          actionLabel="Clear filters"
          onAction={reset}
        />
      ) : (
        scans.map((scan) => <ScanCard key={scan.id} scan={scan} />)
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  heading: { marginBottom: spacing.xl },
  eyebrow: { ...typography.caption, color: colors.forestMid, marginBottom: 8 },
  title: { ...typography.h1, color: colors.ink },
  subtitle: { ...typography.bodySmall, color: colors.muted, marginTop: 8 },
  searchCard: { marginBottom: spacing.lg },
  filters: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  filter: {
    borderRadius: radius.pill,
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: colors.cream,
    borderWidth: 1,
    borderColor: colors.line,
  },
  filterActive: { backgroundColor: colors.forest, borderColor: colors.forest },
  filterLabel: { ...typography.bodySmall, color: colors.muted, fontSize: 12 },
  filterLabelActive: { color: colors.lime },
  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  count: { ...typography.bodySmall, color: colors.muted },
});
