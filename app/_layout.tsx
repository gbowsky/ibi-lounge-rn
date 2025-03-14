import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { PaperProvider } from "react-native-paper";

import { useColorScheme } from "@/hooks/useColorScheme";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { i18n } from "@/lib/localization";
import { getLocales } from "expo-localization";
import { setDefaultOptions } from "date-fns";
import { useSettingsStore } from "@/stores/UserPrefs";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
i18n.locale = getLocales()[0]?.languageCode ?? "en";
setDefaultOptions({ weekStartsOn: 1 });

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const { mode } = useSettingsStore();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <PaperProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(setup)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
          <Stack.Screen
            name="levels"
            options={{
              presentation: "modal",
              headerTitle: "Выбор уровня образования",
            }}
          />
          <Stack.Screen
            name="groups"
            options={{
              presentation: "modal",
              headerTitle: "Выбор группы",
            }}
          />
          <Stack.Screen
            name="teachers"
            options={{
              presentation: "modal",
              headerTitle: "Выбор преподаватель",
            }}
          />
          <Stack.Screen
            name="calendar-add"
            options={{
              presentation: "modal",
              headerShown: false,
              headerTitle: "Добавление в календарь",
            }}
          />
          <Stack.Screen
            name="schedules-modal"
            options={{
              headerShown: true,
              presentation: "modal",
              headerTitle:
                mode === "student"
                  ? "Расписание преподавателей"
                  : "Расписание групп",
            }}
          />
        </Stack>
        <StatusBar style="auto" />
      </PaperProvider>
    </ThemeProvider>
  );
}
