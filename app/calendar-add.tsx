import { i18n } from "@/lib/localization";
import { useSettingsStore } from "@/stores/UserPrefs";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, View, Linking, Alert, Clipboard } from "react-native";
import { Text, List, Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CalendarAddScreen() {
  const { group } = useSettingsStore();
  const [isWebCal, setWebCal] = useState(false);

  async function canUseWebCal() {
    setWebCal(
      await Linking.canOpenURL(
        "webcal://lounge.utme.space/calendar?group=" + group.id,
      ),
    );
  }

  useEffect(() => {
    // Проверяем поддержку webcal:
    void canUseWebCal();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.texts}>
        <Text variant="displayMedium">{i18n.get("calendar.title")}</Text>
        <Text variant="bodyLarge">
          {isWebCal
            ? i18n.get("calendar.descriptionIntent")
            : i18n.get("calendar.description")}
        </Text>
      </View>

      <View style={styles.buttons}>
        {isWebCal ? (
          <Button
            style={styles.hInset}
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
            {i18n.get("calendar.subscribe")}
            {group.name}
          </Button>
        ) : (
          <List.Item
            style={styles.hPadding}
            onPress={() => {
              void Clipboard.setString(
                `https://lounge.utme.space/calendar?group=${group.id}`,
              );
            }}
            titleNumberOfLines={2}
            title={`https://lounge.utme.space/calendar?group=${group.id}`}
          />
        )}
        <Button
          style={styles.hInset}
          mode="contained"
          onPress={() => {
            router.back();
          }}
        >
          {i18n.get("calendar.close")}
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  hPadding: {
    paddingHorizontal: 4,
  },
  hInset: {
    marginHorizontal: 20,
  },
  texts: {
    gap: 12,
    paddingHorizontal: 20,
  },
  buttons: {
    marginTop: 24,
    gap: 12,
  },
});
