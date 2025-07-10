
import { useRouter } from 'expo-router';
import React from 'react';
import { Appbar, useTheme } from 'react-native-paper';

type Props = {
  title: string;
  darkMode?: boolean;   // optional override
};

export default function ScreenHeader({ title, darkMode }: Props) {
  const router = useRouter();
  const theme = useTheme();
  const isDark = darkMode ?? theme.dark;

  return (
    <Appbar.Header
      style={{
        backgroundColor: isDark ? theme.colors.surface : theme.colors.primary,
      }}
    >
      <Appbar.BackAction color={theme.colors.onPrimary} onPress={() => router.back()} />
      <Appbar.Content
        title={title}
        titleStyle={{ fontSize: 20, fontWeight: '600', color: isDark ? theme.colors.surface : theme.colors.onPrimary }}
      />
    </Appbar.Header>
  );
}
