import { StoredItem, useSettingsStore } from "@/stores/UserPrefs";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Text, Button, ActivityIndicator, List } from "react-native-paper";

export default function LevelsSelect() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [levels, setLevels] = useState<StoredItem[]>([]);
  const { setEducationLevel } = useSettingsStore();

  async function getLevels() {
    setLoading(true);
    try {
      const response = await fetch("https://lounge.utme.space/levels");

      if (response.ok) {
        const levels = await response.json();
        setLevels(levels);
      }
    } catch (e) {
      setError(JSON.stringify(e));
    }

    setLoading(false);
  }

  useEffect(() => {
    void getLevels();
  }, []);

  if (error)
    return (
      <View>
        <Text variant="headlineMedium">Ошибка</Text>
        <Text variant="bodyMedium">Повторите попытку позже</Text>
        <Button mode="text">Повторить запрос</Button>
      </View>
    );

  return (
    <View>
      {loading ? (
        <ActivityIndicator size="large" style={style.spinner} />
      ) : (
        <FlatList
          data={levels}
          renderItem={({ item }) => (
            <List.Item
              onPress={() => {
                setEducationLevel(item);
                router.back();
              }}
              key={`level-${item.id}`}
              title={item.name}
            />
          )}
        />
      )}
    </View>
  );
}

const style = StyleSheet.create({
  spinner: {
    padding: 24,
  },
});
