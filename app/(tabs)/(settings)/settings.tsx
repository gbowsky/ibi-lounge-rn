import { GlobalIcon } from "@/components/ui/GlobalIcon";
import { GlobalScreen } from "@/components/ui/GlobalScreen";
import { i18n } from "@/lib/localization";
import { useSettingsStore } from "@/stores/UserPrefs";
import { router } from "expo-router";
import { StyleSheet, View } from "react-native";
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
  } = useSettingsStore();

  return (
    <GlobalScreen
      largeTitle
      title={i18n.get("screens.settings")}
      scrollViewProps={{
        children: (
          <>
            <List.Section>
              <List.Subheader>Данные для расписания</List.Subheader>
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
                title="Режим преподавателя"
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
                    title="Уровень образования"
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
                    title="Ваша группа"
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
                <List.Subheader>Данные для оценок</List.Subheader>
                <TextInput
                  style={styles.hInset}
                  mode="outlined"
                  label="Ваша фамилия"
                  placeholder="Введите фамилию"
                  value={lastName}
                  onChangeText={(lastName) => setLastName(lastName)}
                />
                <View style={styles.vInputInset} />
                <TextInput
                  style={styles.hInset}
                  mode="outlined"
                  label="Ваш ПИН"
                  placeholder="Есть в студаке или договоре с вузом"
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
