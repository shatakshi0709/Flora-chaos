import { StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors, radius, spacing, typography } from '../../theme';

export function BulletList({ items, tone = 'lime' }) {
  return (
    <View style={styles.list}>
      {items.map((item, index) => (
        <View key={`${item}-${index}`} style={styles.row}>
          <View style={[styles.bullet, tone === 'lime' && styles.bulletLime]}>
            <Ionicons
              name={tone === 'lime' ? 'checkmark' : 'ellipse'}
              size={11}
              color={tone === 'lime' ? colors.forest : colors.muted}
            />
          </View>
          <Text style={styles.item}>{item}</Text>
        </View>
      ))}
    </View>
  );
}

export function NumberedList({ items }) {
  return (
    <View style={styles.list}>
      {items.map((item, index) => (
        <View key={`${item}-${index}`} style={styles.row}>
          <View style={styles.number}>
            <Text style={styles.numberText}>{index + 1}</Text>
          </View>
          <Text style={styles.item}>{item}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  list: { gap: spacing.md },
  row: { flexDirection: 'row', alignItems: 'flex-start' },
  bullet: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#EDF1EC',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
    marginTop: 1,
  },
  bulletLime: { backgroundColor: colors.lime },
  number: {
    width: 24,
    height: 24,
    borderRadius: radius.sm,
    backgroundColor: colors.forest,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  numberText: { ...typography.caption, color: colors.lime, fontSize: 11 },
  item: { ...typography.body, color: colors.text, flex: 1 },
});
