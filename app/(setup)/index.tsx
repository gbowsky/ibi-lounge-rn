import { StyleSheet, View } from "react-native";
import { router } from "expo-router";
import { Button, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { i18n } from "@/lib/localization";
import { useSettingsStore } from "@/stores/UserPrefs";

export default function SetupScreen() {
  const { setMode } = useSettingsStore();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.texts}>
        <Text variant="displayLarge">{i18n.get("setup.welcome")}</Text>
        <Text variant="bodyLarge">{i18n.get("setup.description")}</Text>
      </View>
      <View style={styles.aside}>
        <Button
          mode="contained-tonal"
          onPress={() => {
            setMode("teacher");
            router.push("/(setup)/data-setup");
          }}
        >
          {i18n.get("setup.iAmTeacher")}
        </Button>
        <Button
          mode="contained"
          onPress={() => {
            setMode("student");
            router.push("/(setup)/data-setup");
          }}
        >
          {i18n.get("setup.iAmStudent")}
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    gap: 24,
  },
  texts: {
    gap: 12,
  },
  aside: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
});
