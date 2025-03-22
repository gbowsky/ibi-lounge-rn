import { List, Text } from "react-native-paper";
import { Lesson } from "./Lesson";
import { StyleSheet, View } from "react-native";
import { isToday, parse } from "date-fns";
import { DayItem } from "@/lib/api/schedules";

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
      <Text style={styles.title} variant="titleMedium">
        {day.week_day}, {day.day}.{day.month}
      </Text>
      <View>
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
  title: {
    marginHorizontal: 15,
    fontWeight: 800,
    marginBottom: 12,
  },
});
