import { StoredItem, useSettingsStore } from "@/stores/UserPrefs";
import { router, useNavigation } from "expo-router";
import { useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Platform,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  useColorScheme,
} from "react-native";
import {
  Text,
  Button,
  ActivityIndicator,
  List,
  TextInput,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TeachersSelect() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [teachers, setTeachers] = useState<StoredItem[]>([]);
  const [filtered, setFiltered] = useState<StoredItem[]>([]);
  const [query, setQuery] = useState("");
  const { teacher, setTeacher } = useSettingsStore();
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
        placeholder: "Поиск по преподавателям",
        onChangeText: (
          event: NativeSyntheticEvent<TextInputChangeEventData>,
        ) => {
          setQuery(event.nativeEvent.text);
        },
      },
    });
  });

  async function getTeachers() {
    setLoading(true);
    try {
      const response = await fetch("https://lounge.utme.space/teachers");

      if (response.ok) {
        const teachers = await response.json();
        setTeachers(teachers);
      }
    } catch (e) {
      setError(JSON.stringify(e));
    }

    setLoading(false);
  }

  useEffect(() => {
    void getTeachers();
  }, []);

  useEffect(() => {
    if (query) {
      setFiltered(
        teachers.filter((teacher) =>
          teacher.name.toLowerCase().includes(query.toLowerCase()),
        ),
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
    <SafeAreaView style={style.list} edges={{ top: "off" }}>
      {loading ? (
        <ActivityIndicator size="large" style={style.spinner} />
      ) : (
        <>
          <TextInput
            autoFocus
            autoCorrect={false}
            autoCapitalize="none"
            left={<TextInput.Icon icon="text-search" />}
            mode="outlined"
            placeholder="Поиск по группам"
            value={query}
            onChangeText={(query) => setQuery(query)}
          />
          <FlatList
            data={query ? filtered : teachers}
            renderItem={({ item }) => (
              <List.Item
                right={() =>
                  item.id === teacher.id && <List.Icon icon="check" />
                }
                onPress={() => {
                  setTeacher(item);
                  router.back();
                }}
                key={`group-${item.id}`}
                title={item.name}
              />
            )}
          />
        </>
      )}
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  spinner: {
    padding: 24,
  },
  list: {
    marginBottom: Platform.OS === "ios" ? 48 + 32 : 0,
  },
});
