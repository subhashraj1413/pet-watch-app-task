
import { useColorScheme } from '@/hooks/useColorScheme';
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  ThemeProvider as NavigationThemeProvider,
} from '@react-navigation/native';
import { Slot } from 'expo-router';
import { Provider as PaperProvider } from 'react-native-paper';

import {
  Inter_400Regular,
  useFonts as useInter,
} from '@expo-google-fonts/inter';
import {
  Lato_400Regular,
  useFonts as useLato,
} from '@expo-google-fonts/lato';
import {
  Poppins_500Medium,
  Poppins_700Bold,
  useFonts as usePoppins,
} from '@expo-google-fonts/poppins';
import 'react-native-reanimated';
import { darkTheme, lightTheme } from '../utils/theme';

import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';

export default function RootLayout() {
  const colorScheme = useColorScheme(); 

   // load each font family
  const [latoLoaded] = useLato({ Lato_400Regular });
  const [poppinsLoaded] = usePoppins({ Poppins_500Medium, Poppins_700Bold });
  const [interLoaded] = useInter({ Inter_400Regular });
  const paperTheme  = colorScheme === 'dark' ? darkTheme  : lightTheme;
  const navBase     = colorScheme === 'dark'
    ? NavigationDarkTheme
    : NavigationDefaultTheme;

  // Merge RN Paper colors into React Navigation’s theme
  const navigationTheme = {
    ...navBase,
    colors: {
      ...navBase.colors,
      ...paperTheme.colors,
    },
  };

   const [appIsReady, setAppIsReady] = useState(false);
 
  useEffect(() => {
    async function prepare() {
      try {

      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  if (!appIsReady || !latoLoaded || !poppinsLoaded || !interLoaded) {
    return null;
  }

  return (
    // 1) Provide the navigation theme for headers, tabs, etc.
    <NavigationThemeProvider value={navigationTheme}>
      {/* 2) Provide React-Native-Paper’s theme for all Paper components */}
      <PaperProvider theme={paperTheme}>
        <Slot />
      </PaperProvider>
    </NavigationThemeProvider>
  );
}
