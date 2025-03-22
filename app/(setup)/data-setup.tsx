import { GlobalIcon } from "@/components/ui/GlobalIcon";
import { i18n } from "@/lib/localization";
import { useApiStore } from "@/stores/ApiStore";
import { useSettingsStore } from "@/stores/UserPrefs";
import { router } from "expo-router";
import { KeyboardAvoidingView, StyleSheet, View } from "react-native";
import { TextInput, Text, List, Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DataSetupScreen() {
  const {
    educationLevel,
    group,
    pin,
    setPin,
    lastName,
    setLastName,
    setOnboardingPassed,
    mode,
    teacher,
  } = useSettingsStore();
  const { loadSchedules, loadGrades } = useApiStore();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.paddedH} variant="displayMedium">
        {i18n.get("setup.step3title")}
      </Text>
      <View style={styles.section}>
        {mode === "student" && (
          <>
            <List.Item
              style={styles.paddedH}
              onPress={() => router.push("/levels")}
              left={({ color }) => (
                <GlobalIcon color={color} size={28} icon="school-outline" />
              )}
              title={i18n.get("educationLevel")}
              description={educationLevel.name}
            />
            <List.Item
              style={styles.paddedH}
              onPress={() => router.push("/groups")}
              left={({ color }) => (
                <GlobalIcon color={color} size={28} icon="folder-outline" />
              )}
              title={i18n.get("yourGroup")}
              description={group.name}
            />
          </>
        )}
        {mode === "teacher" && (
          <List.Item
            style={styles.paddedH}
            onPress={() => router.push("/teachers")}
            left={({ color }) => (
              <GlobalIcon color={color} size={28} icon="school-outline" />
            )}
            title={i18n.get("teacher")}
            description={teacher.name}
          />
        )}
      </View>

      {mode === "student" && (
        <>
          <KeyboardAvoidingView style={styles.inputs}>
            <TextInput
              label={i18n.get("yourLastName")}
              placeholder="Введите фамилию"
              value={lastName}
              onChangeText={(lastName) => setLastName(lastName)}
            />
            <TextInput
              label={i18n.get("yourPin")}
              placeholder="Есть в студаке или договоре с вузом"
              value={pin}
              onChangeText={(pin) => setPin(pin)}
            />
          </KeyboardAvoidingView>
        </>
      )}

      <Button
        style={styles.insetH}
        mode="contained"
        onPress={() => {
          setOnboardingPassed(true);
          loadSchedules(mode);
          if (mode === "student") loadGrades();
          router.replace("/(tabs)/(schedules)");
        }}
      >
        {i18n.get("continue")}
      </Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  paddedH: {
    paddingHorizontal: 20,
  },
  insetH: {
    marginHorizontal: 20,
  },
  section: {
    marginVertical: 16,
  },
  inputs: {
    gap: 16,
    paddingBottom: 48,
    paddingHorizontal: 20,
  },
});
