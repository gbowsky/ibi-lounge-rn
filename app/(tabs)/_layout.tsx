import { Tabs } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useSettingsStore } from "@/stores/UserPrefs";
import { BlurView } from "expo-blur";
import { Platform, StyleSheet } from "react-native";

export default function TabLayout() {
  const { mode } = useSettingsStore();

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          position: "absolute",
        },
        tabBarBackground:
          Platform.OS === "ios"
            ? () => {
                return (
                  <BlurView
                    intensity={100}
                    tint="systemChromeMaterial"
                    style={StyleSheet.absoluteFill}
                  />
                );
              }
            : undefined,
      }}
    >
      <Tabs.Screen
        name="(schedules)"
        options={{
          title: "Главная",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              size={24}
              name="calendar-clock"
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="(grades)"
        options={{
          href: mode === "teacher" ? null : "/(tabs)/(grades)/grades",
          title: "Оценки",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              size={24}
              name="format-list-text"
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Настройки",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              size={24}
              name="cog-outline"
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
