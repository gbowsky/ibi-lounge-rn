import { i18n } from "@/lib/localization";
import { useSettingsStore } from "@/stores/UserPrefs";
import { router } from "expo-router";
import { StyleSheet, SafeAreaView, View, Platform } from "react-native";
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
    <SafeAreaView>
      <List.Section>
        <List.Subheader>Данные для расписания</List.Subheader>
        <List.Item
          style={styles.hPadded}
          left={() => <List.Icon icon="human-male-board" />}
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
              left={() => <List.Icon icon="school-outline" />}
              title="Уровень образования"
              description={educationLevel.name}
            />
            <List.Item
              style={styles.hPadded}
              onPress={() => router.push("/groups")}
              left={() => <List.Icon icon="folder-outline" />}
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
              left={() => <List.Icon icon="school-outline" />}
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
        <List.Subheader>Фишки</List.Subheader>
        {["macos", "ios"].includes(Platform.OS) && (
          <List.Item
            style={styles.hPadded}
            left={() => <List.Icon icon="calendar-import" />}
            title="Добавить расписание в календарь"
            onPress={() => router.push("/calendar-add")}
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
          left={() => <List.Icon icon="restart" />}
          title="Пройти первую настройку заново"
        />
      </List.Section>
    </SafeAreaView>
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
