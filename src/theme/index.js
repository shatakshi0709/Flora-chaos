/**
 * Flora Chaos design tokens.
 * Keep every screen on these values so the app stays visually consistent.
 */
export const colors = {
  forest: '#0C241A',
  forestDeep: '#071A12',
  forestSoft: '#14402D',
  forestMid: '#20513B',
  lime: '#C9F27A',
  limeDeep: '#A7D95B',
  cream: '#F6F8F3',
  white: '#FFFFFF',
  ink: '#10281D',
  text: '#183027',
  muted: '#6E8478',
  line: '#E4EBE3',
  amber: '#F2C46B',
  red: '#E88A7A',
  blue: '#8FC7D6',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
};

export const radius = {
  sm: 12,
  md: 18,
  lg: 24,
  xl: 32,
  pill: 999,
};

export const typography = {
  display: {
    fontFamily: 'Fraunces_700Bold',
    fontSize: 42,
    lineHeight: 48,
    letterSpacing: -1.2,
  },
  h1: {
    fontFamily: 'Fraunces_600SemiBold',
    fontSize: 30,
    lineHeight: 37,
    letterSpacing: -0.6,
  },
  h2: {
    fontFamily: 'Fraunces_600SemiBold',
    fontSize: 24,
    lineHeight: 31,
    letterSpacing: -0.4,
  },
  h3: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 18,
    lineHeight: 25,
  },
  body: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 15,
    lineHeight: 23,
  },
  bodySmall: {
    fontFamily: 'Manrope_500Medium',
    fontSize: 13,
    lineHeight: 19,
  },
  caption: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 11,
    lineHeight: 15,
    letterSpacing: 0.9,
    textTransform: 'uppercase',
  },
};

export const shadow = {
  card: {
    shadowColor: colors.forest,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 6,
  },
  raised: {
    shadowColor: colors.forest,
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.22,
    shadowRadius: 30,
    elevation: 10,
  },
};

