import { Day } from "@/components/schedules/Day";
import { NoLessons } from "@/components/schedules/NoLessons";
import { useApiStore } from "@/stores/ApiStore";
import { useSettingsStore } from "@/stores/UserPrefs";
import { StyleSheet, View } from "react-native";
import { GlobalScreen } from "@/components/ui/GlobalScreen";
import { DayItem } from "@/lib/api/schedules";
import { i18n } from "@/lib/localization";
import { WeeklyCalendar } from "@/components/schedules/WeeklyCalendar";

export default function HomeScreen() {
  const { mode } = useSettingsStore();
  const { days, loadSchedules, setSelectedDate, schedulesLoading } =
    useApiStore();

  return (
    <GlobalScreen<DayItem>
      largeTitle
      title={i18n.get("screens.schedules")}
      footer={
        <WeeklyCalendar
          onDateSelected={(date) => setSelectedDate(date, mode)}
        />
      }
      flatListProps={{
        refreshing: schedulesLoading,
        onRefresh: () => loadSchedules(mode),
        data: days,
        renderItem: ({ item, index }) => (
          <Day key={`day-${index}}`} day={item} />
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
