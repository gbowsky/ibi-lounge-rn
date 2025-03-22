import { Tabs } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useSettingsStore } from "@/stores/UserPrefs";
import { BlurView } from "expo-blur";
import { Platform, StyleSheet } from "react-native";
import { i18n } from "@/lib/localization";
import { GlobalIcon } from "@/components/ui/GlobalIcon";

export default function TabLayout() {
  const { mode } = useSettingsStore();

  return (
    <Tabs
      screenOptions={{
        sceneStyle: {
          backgroundColor: "transparent",
        },
        tabBarStyle: {
          position: "absolute",
        },
        tabBarBackground:
          Platform.OS === "ios"
            ? () => {
                return (
                  <BlurView
                    intensity={80}
                    tint="systemThinMaterial"
                    style={StyleSheet.absoluteFill}
                  />
                );
              }
            : undefined,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="(schedules)"
        options={{
          title: i18n.get("screens.schedules"),
          tabBarIcon: ({ color }) => (
            <GlobalIcon size={24} icon="calendar-clock" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(grades)"
        options={{
          href: mode === "teacher" ? null : "/(tabs)/(grades)/grades",
          title: i18n.get("screens.grades"),
          tabBarIcon: ({ color }) => (
            <GlobalIcon size={24} icon="format-list-text" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(settings)"
        options={{
          title: i18n.get("screens.settings"),
          tabBarIcon: ({ color }) => (
            <GlobalIcon size={24} icon="cog-outline" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
