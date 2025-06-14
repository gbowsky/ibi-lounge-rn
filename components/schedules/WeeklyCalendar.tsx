import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ViewToken,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { addWeeks, startOfWeek, eachDayOfInterval } from "date-fns";
import { useTheme } from "@react-navigation/native";
import { formatDate } from "@/lib/dates";
import { useDebounceValue } from "usehooks-ts";

type CalendarDay = {
  date: Date;
  dayOfWeek: string;
  dayOfMonth: string;
};

type WeeklyCalendarProps = {
  onDateSelected?: (date: Date) => void;
};

const getWeekDays = (date: Date): CalendarDay[] => {
  const start = startOfWeek(date, { weekStartsOn: 1 });
  const end = new Date(start);
  end.setDate(start.getDate() + 5); // Mon to Sat
  return eachDayOfInterval({ start, end }).map((day) => ({
    date: day,
    dayOfWeek: formatDate(day, "EEEEEE"),
    dayOfMonth: formatDate(day, "dd"),
  }));
};

const getDateFromIndex = (index: number): Date => {
  return addWeeks(startOfWeek(new Date(), { weekStartsOn: 1 }), index - 50);
};

export const WeeklyCalendar: React.FC<WeeklyCalendarProps> = ({
  onDateSelected,
}) => {
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(50);
  const [currentDate, setCurrentDate] = useState(getDateFromIndex(50));
  const { width: bouncingWidth } = useWindowDimensions();
  const [width, setDebouncedWidth] = useDebounceValue(bouncingWidth, 500);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    onDateSelected?.(currentDate);
  }, [currentDate]);

  useEffect(() => {
    setDebouncedWidth(bouncingWidth);
    if (!disabled) {
      setDisabled(true);
    }
  }, [bouncingWidth]);

  useEffect(() => {
    setDisabled(false);
  }, [width]);

  const renderWeek = ({ index }: { index: number }) => {
    const date = getDateFromIndex(index);
    const days = getWeekDays(date);
    return (
      <View style={{ ...styles.weekContainer, width }}>
        {days.map((item) => (
          <View
            key={item.date.toString()}
            style={[
              styles.dayBox,
              { backgroundColor: colors.card, width: width / 7 - 8 },
            ]}
          >
            <Text style={[styles.dayOfWeek, { color: colors.text }]}>
              {item.dayOfWeek}
            </Text>
            <Text style={[styles.dayOfMonth, { color: colors.text }]}>
              {item.dayOfMonth}
            </Text>
          </View>
        ))}
      </View>
    );
  };

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0) {
        const index = viewableItems[0].index ?? 0;
        setCurrentIndex(index);
        setCurrentDate(getDateFromIndex(index));
      }
    },
  ).current;

  const scrollToToday = () => {
    flatListRef.current?.scrollToIndex({ index: 50, animated: true });
  };

  const monthLabel = formatDate(currentDate, "LLLL");

  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <View style={{ ...styles.header, width: width }}>
        <Text style={[styles.monthLabel, { color: colors.text }]}>
          {monthLabel}
        </Text>
        <TouchableOpacity onPress={scrollToToday} style={styles.todayButton}>
          <Text style={styles.todayText}>Сегодня</Text>
        </TouchableOpacity>
      </View>

      {disabled && (
        <View style={[styles.dayBox, { opacity: 0 }]}>
          <Text style={[styles.dayOfWeek, { color: colors.text }]}>AB</Text>
          <Text style={[styles.dayOfMonth, { color: colors.text }]}>CD</Text>
        </View>
      )}
      {!disabled && (
        <FlatList
          ref={flatListRef}
          data={Array.from({ length: 100 }, (_, i) => i)}
          keyExtractor={(item) => item.toString()}
          renderItem={renderWeek}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          initialScrollIndex={50}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={{ itemVisiblePercentThreshold: 80 }}
          getItemLayout={(_, index) => ({
            length: width,
            offset: width * index,
            index,
          })}
        />
      )}

      <View style={{ height: 16 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 12,
    alignItems: "center",
    width: "100%",
  },
  header: {
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  monthLabel: {
    fontSize: 18,
    fontWeight: "600",
  },
  todayButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#007AFF",
    borderRadius: 8,
  },
  todayText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
  weekContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  dayBox: {
    marginHorizontal: 4,
    paddingVertical: 8,
    paddingHorizontal: 6,
    borderRadius: 12,
    alignItems: "center",
  },
  dayOfWeek: {
    fontSize: 12,
    color: "#888",
  },
  dayOfMonth: {
    fontSize: 16,
    fontWeight: "600",
  },
});
