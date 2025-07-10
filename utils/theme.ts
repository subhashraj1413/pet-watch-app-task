// utils/theme.ts
import {
  MD3DarkTheme,
  MD3LightTheme
} from 'react-native-paper';

// Grab the built-in MD3 typography scale
const baseLightFonts = MD3LightTheme.fonts;
const baseDarkFonts  = MD3DarkTheme.fonts;

export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary:       '#EF5C59',
    secondary:     '#F69A58',
    background:    '#FFFFFF',
    surface:       '#FFFFFF',
    onBackground:  '#1C1C1C',
    onSurface:     '#1C1C1C',
    error:         '#E0B252',
    // any other overrides…
  },

  fonts: {
    ...baseLightFonts,

    // only MD3 tokens—which live in MD3Typescale
    bodyMedium: {
      ...baseLightFonts.bodyMedium,
      fontFamily: 'Lato_400Regular',
    },
    titleMedium: {
      ...baseLightFonts.titleMedium,
      fontFamily: 'Poppins_500Medium',
    },
    labelLarge: {
      ...baseLightFonts.labelLarge,
      fontFamily: 'Poppins_700Bold',
    },

    // you can override more MD3 tokens here if you like…
  },
};

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary:       '#EF5C59',
    secondary:     '#F69A58',
    background:    '#111111',
    surface:       '#0A0A0A',
    onBackground:  '#FFFFFF',
    onSurface:     '#FFFFFF',
    error:         '#E0B252',
  },
  fonts: {
    ...baseDarkFonts,
    bodyMedium: {
      ...baseDarkFonts.bodyMedium,
      fontFamily: 'Lato_400Regular',
    },
    titleMedium: {
      ...baseDarkFonts.titleMedium,
      fontFamily: 'Poppins_500Medium',
    },
    labelLarge: {
      ...baseDarkFonts.labelLarge,
      fontFamily: 'Poppins_700Bold',
    },
  },
};
