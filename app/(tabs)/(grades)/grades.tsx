import { i18n } from "@/lib/localization";
import { useApiStore } from "@/stores/ApiStore";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useLayoutEffect, useState } from "react";
import {
  StyleSheet,
  FlatList,
  View,
  TextInputChangeEventData,
  NativeSyntheticEvent,
  useColorScheme,
} from "react-native";
import { Card, List, Text } from "react-native-paper";

export default function GradesScreen({}) {
  const [refreshing, setRefreshing] = useState(false);
  const { grades, loadGrades } = useApiStore();
  const [filteredGrades, setFiltered] = useState(grades);
  const [query, setQuery] = useState("");
  const nav = useNavigation();
  const tabbarHeight = useBottomTabBarHeight();
  const colorScheme = useColorScheme();

  useLayoutEffect(() => {
    nav.setOptions({
      headerSearchBarOptions: {
        barTintColor: colorScheme === "dark" ? "#000" : "#fff",
        tintColor: colorScheme === "dark" ? "#fff" : "#000",
        textColor: colorScheme === "dark" ? "#fff" : "#000",
        hintTextColor: colorScheme === "dark" ? "#fff" : "#000",
        headerIconColor: colorScheme === "dark" ? "#fff" : "#000",
        placeholder: "Поиск по предметам",
        onChangeText: (
          event: NativeSyntheticEvent<TextInputChangeEventData>,
        ) => {
          setQuery(event.nativeEvent.text);
        },
      },
    });
  });

  async function fetchData() {
    setRefreshing(true);
    await loadGrades();
    setFiltered(grades);
    setRefreshing(false);
  }

  useEffect(() => {
    setFiltered(
      grades.filter((grade) =>
        grade.name.toLowerCase().includes(query.toLowerCase()),
      ),
    );
  }, [query]);

  return (
    <View>
      <FlatList
        contentInsetAdjustmentBehavior="automatic"
        onRefresh={() => fetchData()}
        refreshing={refreshing}
        data={query ? filteredGrades : grades}
        keyExtractor={(_, index) => `grade-${index}`}
        renderItem={({ item, index }) => (
          <List.Item
            titleEllipsizeMode="middle"
            key={`grade-${index}`}
            title={item.name}
            description={i18n.get("grade_types." + item.type)}
            right={() => (
              <Text style={styles.grade}>
                {i18n.get("grade." + item.grade)}
              </Text>
            )}
          />
        )}
        ListFooterComponent={<View style={{ height: tabbarHeight }} />}
        ListEmptyComponent={
          <Card>
            <Card.Title title="Ничего нет" />
            <Card.Content>
              <Text>Попробуйте свайпнуть</Text>
            </Card.Content>
          </Card>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  grade: {
    flex: 1,
    minWidth: 40,
    textAlign: "right",
  },
});
