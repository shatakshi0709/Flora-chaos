import { StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors, radius, typography } from '../../theme';

const tones = {
  lime: { bg: '#EAF6D2', fg: '#3F671E' },
  amber: { bg: '#FFF1D6', fg: '#8A6118' },
  red: { bg: '#FDE5E0', fg: '#9A4032' },
  blue: { bg: '#E1F1F5', fg: '#2D6775' },
  neutral: { bg: '#EDF1EC', fg: colors.muted },
};

export default function Chip({ label, tone = 'neutral', icon, style }) {
  const palette = tones[tone] ?? tones.neutral;
  return (
    <View style={[styles.chip, { backgroundColor: palette.bg }, style]}>
      {icon ? (
        <Ionicons name={icon} size={13} color={palette.fg} style={styles.icon} />
      ) : null}
      <Text style={[styles.label, { color: palette.fg }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: radius.pill,
    paddingHorizontal: 12,
    paddingVertical: 7,
    alignSelf: 'flex-start',
  },
  icon: { marginRight: 6 },
  label: { ...typography.caption, fontSize: 10 },
});
