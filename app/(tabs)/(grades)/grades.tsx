import { NoGrades } from "@/components/grades/NoGrades";
import { GlobalScreen } from "@/components/ui/GlobalScreen";
import { GradeItem } from "@/lib/api/grades";
import { i18n } from "@/lib/localization";
import { useApiStore } from "@/stores/ApiStore";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useLayoutEffect, useState } from "react";
import {
  StyleSheet,
  TextInputChangeEventData,
  NativeSyntheticEvent,
  useColorScheme,
} from "react-native";
import { List, Text } from "react-native-paper";

export default function GradesScreen({}) {
  const { grades, loadGrades, gradesLoading, gradesError } = useApiStore();
  const [filteredGrades, setFiltered] = useState(grades);
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
    await loadGrades();
    setFiltered(grades);
  }

  useEffect(() => {
    setFiltered(
      grades.filter((grade) =>
        grade.name.toLowerCase().includes(query.toLowerCase()),
      ),
    );
  }, [query]);

  return (
    <GlobalScreen<GradeItem>
      title={i18n.get("screens.grades")}
      largeTitle
      flatListProps={{
        onRefresh: () => fetchData(),
        refreshing: gradesLoading,
        data: query ? filteredGrades : grades,
        keyExtractor: (_, index) => `grade-${index}`,
        renderItem: ({ item, index }) => (
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
        ),
        ListEmptyComponent: (
          <NoGrades
            loading={gradesLoading}
            code={gradesError}
            onReload={() => loadGrades()}
          />
        ),
      }}
    />
  );
}

const styles = StyleSheet.create({
  grade: {
    flex: 1,
    minWidth: 40,
    textAlign: "right",
  },
});
