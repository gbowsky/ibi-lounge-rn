import React, {
  FC,
  useState,
  useMemo,
  useCallback,
  memo,
  useRef,
  LegacyRef,
} from "react";
import {
  CalendarProps,
  createWholeWeek,
  formatDate,
  createWholeWeeks,
  itemWidth,
  ScrollEvent,
  createNextTwoWeeks,
  createPreviousTwoWeeks,
  screenWidth,
  createLocalWeek,
} from "./lib";
import { Header } from "./Header";
import { WeekItem } from "./WeekItem";
import { View, FlatList, unstable_batchedUpdates } from "react-native";
import { format } from "date-fns";
import { Text } from "react-native-paper";

export const CalendarComponent: FC<CalendarProps> = memo(
  ({ date, language, onDatePress, selectedColor, showMonth, onWeekSwitch }) => {
    const showHeader = showMonth ?? true;

    // to get current page's month
    const [appearDate, setAppearDate] = useState(date);
    const flatListRef: LegacyRef<any> = useRef<FlatList>();
    const getWholeWeek = useCallback(createWholeWeek, [createWholeWeek]);
    const wholeWeek = useMemo(() => {
      return getWholeWeek(date);
    }, [date, getWholeWeek]);
    const getWholeWeeks = useCallback(createWholeWeeks, [createWholeWeeks]);
    const wholeWeeks = useMemo(() => {
      return getWholeWeeks(date, wholeWeek);
    }, [date, wholeWeek]);

    const [weeks, setWeeks] = useState(wholeWeeks);

    const endReach = useCallback(() => {
      const n = createNextTwoWeeks(weeks.slice(-1)[0], []);
      setWeeks((w) => {
        return [...w, ...n];
      });
    }, [weeks, createNextTwoWeeks, setWeeks]);

    const momentumEnd = useCallback(
      (event: ScrollEvent) => {
        const widthFromStart = event.nativeEvent.contentOffset.x;
        if (widthFromStart < screenWidth) {
          const b = createPreviousTwoWeeks(weeks[0], []);
          unstable_batchedUpdates(() => {
            setWeeks((w) => {
              return [...b, ...w];
            });
            flatListRef.current.scrollToIndex({ animated: false, index: 14 });
          });
        }
        const currentPage =
          widthFromStart / event.nativeEvent.layoutMeasurement.width;
        setAppearDate(weeks[currentPage * 7 + 1]);
        onWeekSwitch && onWeekSwitch(weeks[currentPage * 7 + 1]);
      },
      [
        createPreviousTwoWeeks,
        weeks,
        setWeeks,
        flatListRef,
        setAppearDate,
        onWeekSwitch,
      ],
    );

    const localMonth = useMemo(() => {
      return format(appearDate, "LLLL", { locale: createLocalWeek(language) });
    }, [createLocalWeek, appearDate]);

    return (
      <View>
        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 18 }}>{localMonth}</Text>
        </View>
        <Header language={language} />
        <FlatList
          contentContainerStyle={{ flexGrow: 1 }}
          ref={flatListRef}
          data={weeks}
          extraData={date}
          initialScrollIndex={14}
          horizontal
          pagingEnabled
          bounces
          showsHorizontalScrollIndicator={false}
          onEndReached={endReach}
          onEndReachedThreshold={0.01}
          onMomentumScrollEnd={momentumEnd}
          getItemLayout={(_, index) => ({
            length: itemWidth,
            offset: itemWidth * index,
            index,
          })}
          renderItem={({ item }) => {
            return (
              <WeekItem
                date={item}
                isToday={formatDate(item) === formatDate(date)}
                key={item.toDateString()}
              />
            );
          }}
        />
      </View>
    );
  },
);
