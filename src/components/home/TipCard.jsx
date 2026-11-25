import { StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors, radius, spacing, typography } from '../../theme';

const icons = {
  water: 'water-outline',
  eye: 'eye-outline',
  leaf: 'leaf-outline',
};

const backgrounds = {
  blue: '#E1F1F5',
  lime: '#EAF6D2',
  amber: '#FFF1D6',
};

export default function TipCard({ tip }) {
  return (
    <View style={[styles.card, { backgroundColor: backgrounds[tip.tone] ?? backgrounds.lime }]}>
      <View style={styles.iconWrap}>
        <Ionicons name={icons[tip.icon] ?? 'leaf-outline'} size={20} color={colors.forest} />
      </View>
      <Text style={styles.title} numberOfLines={2}>
        {tip.title}
      </Text>
      <Text style={styles.body} numberOfLines={3}>
        {tip.body}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 168,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginRight: spacing.md,
    minHeight: 158,
  },
  iconWrap: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255,255,255,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  title: { ...typography.h3, color: colors.ink, fontSize: 15 },
  body: { ...typography.bodySmall, color: colors.forestMid, marginTop: 6 },
});
