import { useSettingsStore } from "@/stores/UserPrefs";
import { router } from "expo-router";
import { StyleSheet, View, Linking, Alert } from "react-native";
import { TextInput, Text, List, Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CalendarAddScreen() {
  const { group } = useSettingsStore();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.texts}>
        <Text variant="displayMedium">Добавление в календарь</Text>
        <Text variant="bodyLarge">
          Тут какой-то текст и ниже несколько кнопок
        </Text>
      </View>

      <View style={styles.buttons}>
        <Button
          mode="contained-tonal"
          onPress={async () => {
            const can = await Linking.canOpenURL(
              "webcal://lounge.utme.space/calendar?group=" + group.id,
            );

            if (can) {
              Linking.openURL(
                "webcal://lounge.utme.space/calendar?group=" + group.id,
              );
            } else {
              Alert.alert(
                "Не поддерживается",
                'Установите приложение "Календарь" в App Store чтобы подписаться на календарь',
              );
            }
          }}
        >
          Подписаться на расписание {group.name}
        </Button>
        <Button
          mode="contained"
          onPress={() => {
            router.back();
          }}
        >
          Закрыть
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
  },
  texts: {
    gap: 12,
  },
  buttons: {
    marginTop: 24,
    gap: 12,
  },
});
