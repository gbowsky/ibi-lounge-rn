import { Day } from "@/components/schedules/Day";
import { NoLessons } from "@/components/schedules/NoLessons";
import { useApiStore } from "@/stores/ApiStore";
import { useSettingsStore } from "@/stores/UserPrefs";
import { StyleSheet, Text, View } from "react-native";
import { GlobalScreen } from "@/components/ui/GlobalScreen";
import { DayItem } from "@/lib/api/schedules";
import { i18n } from "@/lib/localization";
import { WeeklyCalendar } from "@/components/schedules/WeeklyCalendar";
import { useEffect } from "react";
import { useLocales } from "expo-localization";
import { NewsItem } from "@/lib/api/news";
import { UrgentNewsItem } from "@/components/news/UrgentNewsItem";

export default function HomeScreen() {
  const { mode } = useSettingsStore();
  const {
    days,
    loadSchedules,
    setSelectedDate,
    schedulesLoading,
    urgentNews,
    loadNews,
    newsLoading,
  } = useApiStore();

  const locales = useLocales();
  const locale = locales[0].languageCode ?? "en";

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    void loadNews(locale);
    void loadSchedules(mode);
  };

  return (
    <GlobalScreen<DayItem | NewsItem>
      largeTitle
      title={i18n.get("screens.schedules")}
      footer={
        <WeeklyCalendar
          onDateSelected={(date) => setSelectedDate(date, mode)}
        />
      }
      flatListProps={{
        refreshing: schedulesLoading || newsLoading,
        onRefresh: () => loadData(),
        data: [...urgentNews, ...days],
        renderItem: ({ item, index }) =>
          "day" in item ? (
            <Day key={`day-${index}}`} day={item} />
          ) : (
            <UrgentNewsItem item={item} key={`urgent-${index}`} />
          ),
        ListEmptyComponent: (
          <NoLessons
            onReload={() => loadSchedules(mode)}
            loading={schedulesLoading}
          />
        ),
      }}
    />
  );
}

const styles = StyleSheet.create({});
