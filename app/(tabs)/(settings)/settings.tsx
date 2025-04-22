import { GlobalIcon } from "@/components/ui/GlobalIcon";
import { GlobalScreen } from "@/components/ui/GlobalScreen";
import { i18n } from "@/lib/localization";
import { useSettingsStore } from "@/stores/UserPrefs";
import { router } from "expo-router";
import { Platform, StyleSheet, View } from "react-native";
import { Divider, List, Switch, TextInput } from "react-native-paper";

export default function SettingsScreen() {
  const {
    setOnboardingPassed,
    teacher,
    educationLevel,
    group,
    lastName,
    setLastName,
    pin,
    setPin,
    mode,
    setMode,
    blurAndroidEnabled,
    setBlurAndroidEnabled,
  } = useSettingsStore();

  return (
    <GlobalScreen
      largeTitle
      title={i18n.get("screens.settings")}
      scrollViewProps={{
        children: (
          <>
            <List.Section>
              <List.Subheader>
                {i18n.get("settings.dataForSchedule")}
              </List.Subheader>
              <List.Item
                style={styles.hPadded}
                left={({ color }) => (
                  <GlobalIcon color={color} size={28} icon="human-male-board" />
                )}
                right={() => (
                  <Switch
                    value={mode === "teacher"}
                    onValueChange={() =>
                      setMode(mode === "teacher" ? "student" : "teacher")
                    }
                  />
                )}
                title={i18n.get("settings.teacherMode")}
              />
              {mode === "student" && (
                <>
                  <List.Item
                    style={styles.hPadded}
                    onPress={() => router.push("/levels")}
                    left={({ color }) => (
                      <GlobalIcon
                        color={color}
                        size={28}
                        icon="school-outline"
                      />
                    )}
                    title={i18n.get("settings.educationLevel")}
                    description={educationLevel.name}
                  />
                  <List.Item
                    style={styles.hPadded}
                    onPress={() => router.push("/groups")}
                    left={({ color }) => (
                      <GlobalIcon
                        color={color}
                        size={28}
                        icon="folder-outline"
                      />
                    )}
                    title={i18n.get("settings.group")}
                    description={group.name}
                  />
                </>
              )}
              {mode === "teacher" && (
                <>
                  <List.Item
                    style={styles.hPadded}
                    onPress={() => router.push("/teachers")}
                    left={({ color }) => (
                      <GlobalIcon
                        color={color}
                        size={28}
                        icon="school-outline"
                      />
                    )}
                    title={i18n.get("teacher")}
                    description={teacher.name}
                  />
                </>
              )}
            </List.Section>
            <Divider />
            {mode === "student" && (
              <List.Section>
                <List.Subheader>
                  {i18n.get("settings.dataForGrades")}
                </List.Subheader>
                <TextInput
                  style={styles.hInset}
                  mode="outlined"
                  label={i18n.get("settings.lastName")}
                  placeholder={i18n.get("settings.enterLastName")}
                  value={lastName}
                  onChangeText={(lastName) => setLastName(lastName)}
                />
                <View style={styles.vInputInset} />
                <TextInput
                  style={styles.hInset}
                  mode="outlined"
                  label={i18n.get("settings.pin")}
                  placeholder={i18n.get("settings.enterPin")}
                  value={pin}
                  onChangeText={(pin) => setPin(pin)}
                />
              </List.Section>
            )}

            <Divider />
            <List.Section>
              <List.Subheader>{i18n.get("settings.features")}</List.Subheader>
              <List.Item
                style={styles.hPadded}
                left={({ color }) => (
                  <GlobalIcon color={color} size={28} icon="calendar-import" />
                )}
                title={i18n.get("calendar.title")}
                onPress={() => router.push("/calendar-add")}
              />
              {Platform.OS === "android" && (
                <List.Item
                  style={styles.hPadded}
                  left={({ color }) => (
                    <GlobalIcon color={color} size={28} icon="blur" />
                  )}
                  right={() => (
                    <Switch
                      value={blurAndroidEnabled}
                      onValueChange={() =>
                        setBlurAndroidEnabled(!blurAndroidEnabled)
                      }
                    />
                  )}
                  description={i18n.get("settings.blurEffectsDesc")}
                  title={i18n.get("settings.blurEffectsTitle")}
                />
              )}
            </List.Section>

            <Divider />
            <List.Section>
              <List.Subheader>Для разработчиков</List.Subheader>
              <List.Item
                style={styles.hPadded}
                onPress={() => {
                  router.replace("/(setup)");
                  setOnboardingPassed(false);
                }}
                left={({ color }) => (
                  <GlobalIcon color={color} size={28} icon="restart" />
                )}
                title="Пройти первую настройку заново"
              />
            </List.Section>
          </>
        ),
      }}
    />
  );
}

const styles = StyleSheet.create({
  vInset: {
    marginBottom: 20,
  },
  vInputInset: {
    marginBottom: 8,
  },
  hPadded: {
    paddingHorizontal: 20,
  },
  hInset: {
    marginHorizontal: 16,
  },
});
