import { DayItem } from "@/stores/api/SchedulesSlice";
import { List, Text } from "react-native-paper";
import { Lesson } from "./Lesson";
import { StyleSheet, View } from "react-native";
import { isToday, parse } from "date-fns";
import { useApiStore } from "@/stores/ApiStore";

interface DayProps {
  day: DayItem;
}

export const Day = (props: DayProps) => {
  const { day } = props;

  const isThisDay = isToday(
    parse(`${day.day}.${day.month}`, `d.MM`, new Date()),
  );

  return (
    <List.Section>
      <List.Subheader>
        <Text variant="titleLarge">
          {day.week_day}, {day.day}.{day.month}
        </Text>
      </List.Subheader>
      <View style={styles.lessons}>
        {day.lessons.map((lesson, index) => (
          <Lesson
            isThisDay={isThisDay}
            lesson={lesson}
            key={`lesson-${index}-${isThisDay ? "todays" : ""}`}
          />
        ))}
      </View>
    </List.Section>
  );
};

const styles = StyleSheet.create({
  lessons: {
    gap: -12,
  },
});
