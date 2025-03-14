import { StoredItem, useSettingsStore } from "@/stores/UserPrefs";
import { router, useNavigation } from "expo-router";
import { useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  useColorScheme,
} from "react-native";
import { Text, Button, List } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function GroupsSelect() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [groups, setGroups] = useState<StoredItem[]>([]);
  const [filtered, setFiltered] = useState<StoredItem[]>([]);
  const { setGroup, educationLevel, group } = useSettingsStore();
  const [query, setQuery] = useState("");
  const nav = useNavigation();
  const colorScheme = useColorScheme();

  useLayoutEffect(() => {
    nav.setOptions({
      headerSearchBarOptions: {
        barTintColor: colorScheme === "dark" ? "#000" : "#fff",
        tintColor: colorScheme === "dark" ? "#fff" : "#000",
        textColor: colorScheme === "dark" ? "#fff" : "#000",
        hintTextColor: colorScheme === "dark" ? "#fff" : "#000",
        headerIconColor: colorScheme === "dark" ? "#fff" : "#000",
        placeholder: "Поиск по группам",
        onChangeText: (
          event: NativeSyntheticEvent<TextInputChangeEventData>,
        ) => {
          setQuery(event.nativeEvent.text);
        },
      },
    });
  });

  async function getGroups(level: string) {
    setLoading(true);
    try {
      console.log("https://lounge.utme.space/groups?level=" + level);
      const response = await fetch(
        "https://lounge.utme.space/groups?level=" + level,
      );

      if (response.ok) {
        const groups = await response.json();
        setGroups(groups);
      }
    } catch (e) {
      setError(JSON.stringify(e));
    }

    setLoading(false);
  }

  useEffect(() => {
    void getGroups(educationLevel.id);
  }, [educationLevel]);

  useEffect(() => {
    if (query) {
      setFiltered(
        groups.filter((group) => {
          return group.name.toLowerCase().includes(query.toLowerCase());
        }),
      );
    }
  }, [query]);

  if (error)
    return (
      <View>
        <Text variant="headlineMedium">Ошибка</Text>
        <Text variant="bodyMedium">Повторите попытку позже</Text>
        <Button mode="text">Повторить запрос</Button>
      </View>
    );

  return (
    <SafeAreaView>
      <FlatList
        contentInsetAdjustmentBehavior="automatic"
        refreshing={loading}
        data={query ? filtered : groups}
        keyExtractor={(item) => `group-${item.id}-${query ? "searching" : ""}`}
        renderItem={({ item }) => {
          return (
            <List.Item
              right={() => item.id === group.id && <List.Icon icon="check" />}
              onPress={() => {
                setGroup(item);
                router.back();
              }}
              key={`group-${item.id}-${query ? "searching" : ""}`}
              title={item.name}
            />
          );
        }}
      />
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  spinner: {
    padding: 24,
  },
});
