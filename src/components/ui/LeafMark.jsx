import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, View } from 'react-native';
import { colors, radius } from '../../theme';

/** Brand mark used on splash, auth and headers. */
export default function LeafMark({ size = 64, light = false }) {
  return (
    <LinearGradient
      colors={light ? [colors.lime, colors.limeDeep] : [colors.forestSoft, colors.forest]}
      style={[styles.mark, { width: size, height: size, borderRadius: size / 2 }]}
    >
      <View style={styles.inner}>
        <Ionicons
          name="leaf"
          size={size * 0.46}
          color={light ? colors.forest : colors.lime}
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  mark: { alignItems: 'center', justifyContent: 'center' },
  inner: {
    width: '72%',
    height: '72%',
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.10)',
  },
});
