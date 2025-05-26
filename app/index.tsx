import { StyleSheet, View } from "react-native";

import { useEffect } from "react";
import { useHydration, useSettingsStore } from "@/stores/UserPrefs";
import { router } from "expo-router";
import { ActivityIndicator, Text } from "react-native-paper";
import { useApiHydration, useApiStore } from "@/stores/ApiStore";

const LoaderScreenView = () => {
  const { onboardingPassed, lastName, pin, mode } = useSettingsStore();
  const { loadGrades, loadSchedules } = useApiStore();
  const hydrated = useHydration();
  const apiHydrated = useApiHydration();

  const initStore = async () => {
    if (!onboardingPassed) {
      router.replace("/(setup)");
      return;
    }

    if (lastName && pin) {
      void loadGrades();
    }

    void loadSchedules(mode);

    router.replace("/(tabs)/(schedules)");
  };

  useEffect(() => {
    if (hydrated && apiHydrated) {
      initStore();
    }
  }, [hydrated, apiHydrated]);

  return (
    <View style={styles.centered}>
      <ActivityIndicator size="large" />
      <Text variant="bodyMedium" style={styles.textCenter}>
        Подгружаем ваши настройки{"\n"}и сведения из МБИ...
      </Text>
    </View>
  );
};

export default LoaderScreenView;

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textCenter: {
    marginTop: 16,
    textAlign: "center",
  },
});
