import { Day } from "@/components/schedules/Day";
import { WeeklyCalendar } from "@/components/schedules/WeeklyCalendar";
import { GlobalIcon } from "@/components/ui/GlobalIcon";
import { GlobalScreen } from "@/components/ui/GlobalScreen";
import { DayItem } from "@/lib/api/schedules";
import { i18n } from "@/lib/localization";
import { useSchedulesModalStore } from "@/stores/SchedulesModalStore";
import { useSettingsStore } from "@/stores/UserPrefs";
import { router } from "expo-router";
import { useEffect } from "react";
import { StyleSheet } from "react-native";
import { List, Divider } from "react-native-paper";

export default function SchedulesModal() {
  const { days, loadSchedules, setSelectedDate, schedulesLoading } =
    useSchedulesModalStore();
  const { mode, educationLevel, group, teacher } = useSettingsStore();
  const reverseMode = mode === "student" ? "teacher" : "student";

  useEffect(() => {
    loadSchedules(reverseMode);
  }, [reverseMode, teacher, group]);

  return (
    <GlobalScreen<DayItem>
      modal
      title={
        mode === "student"
          ? i18n.get("show_teachers_schedule")
          : i18n.get("show_groups_schedule")
      }
      flatListProps={{
        refreshing: schedulesLoading,
        onRefresh: () => loadSchedules(reverseMode),
        data: days,
        renderItem: ({ item, index }) => (
          <Day key={`day-${index}}`} day={item} />
        ),
      }}
      footer={
        <>
          <List.Section>
            {mode === "teacher" && (
              <>
                <List.Item
                  style={styles.hPadded}
                  onPress={() => router.push("/levels")}
                  left={() => <List.Icon icon="school-outline" />}
                  title={i18n.get("settings.educationLevel")}
                  description={educationLevel.name}
                />
                <List.Item
                  style={styles.hPadded}
                  onPress={() => router.push("/groups")}
                  left={() => <List.Icon icon="folder-outline" />}
                  title={i18n.get("settings.group")}
                  description={group.name}
                />
              </>
            )}
            {mode === "student" && (
              <>
                <List.Item
                  style={styles.hPadded}
                  onPress={() => router.push("/teachers")}
                  left={({ color }) => (
                    <GlobalIcon size={28} color={color} icon="school-outline" />
                  )}
                  title={i18n.get("teacher")}
                  description={teacher.name}
                />
              </>
            )}
          </List.Section>
          <Divider />
          <WeeklyCalendar
            onDateSelected={(date) => {
              setSelectedDate(date, reverseMode);
            }}
          />
        </>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  footer: {
    position: "absolute",
    bottom: 0,
  },
  hPadded: {
    paddingHorizontal: 20,
  },
});
