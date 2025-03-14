import { Day } from "@/components/schedules/Day";
import { CalendarComponent } from "@/components/schedules/WeekSwiper/Calendar";
import { i18n } from "@/lib/localization";
import { useSchedulesModalStore } from "@/stores/SchedulesModalStore";
import { useSettingsStore } from "@/stores/UserPrefs";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, FlatList, View } from "react-native";
import { List, Divider, Surface } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SchedulesModal() {
  const { days, loadSchedules, setSelectedDate, schedulesLoading } =
    useSchedulesModalStore();
  const { mode, educationLevel, group, teacher } = useSettingsStore();
  const [footerHeight, setFooterHeight] = useState(0);
  const reverseMode = mode === "student" ? "teacher" : "student";
  const { bottom } = useSafeAreaInsets();

  useEffect(() => {
    loadSchedules(reverseMode);
  }, [reverseMode, teacher, group]);

  return (
    <View style={styles.container}>
      <FlatList
        contentInsetAdjustmentBehavior="automatic"
        refreshing={schedulesLoading}
        onRefresh={() => loadSchedules(reverseMode)}
        data={days}
        renderItem={({ item, index }) => (
          <Day key={`day-${index}}`} day={item} />
        )}
        ListFooterComponent={<View style={{ height: footerHeight }} />}
      />
      <Surface
        style={{ ...styles.footer, paddingBottom: bottom }}
        onLayout={(ev) => {
          setFooterHeight(ev.nativeEvent.layout.height);
        }}
      >
        <List.Section>
          {mode === "teacher" && (
            <>
              <List.Item
                style={styles.hPadded}
                onPress={() => router.push("/levels")}
                left={() => <List.Icon icon="school-outline" />}
                title="Уровень образования"
                description={educationLevel.name}
              />
              <List.Item
                style={styles.hPadded}
                onPress={() => router.push("/groups")}
                left={() => <List.Icon icon="folder-outline" />}
                title="Ваша группа"
                description={group.name}
              />
            </>
          )}
          {mode === "student" && (
            <>
              <List.Item
                style={styles.hPadded}
                onPress={() => router.push("/teachers")}
                left={() => <List.Icon icon="school-outline" />}
                title={i18n.get("teacher")}
                description={teacher.name}
              />
            </>
          )}
        </List.Section>
        <Divider />
        <CalendarComponent
          date={new Date()}
          onDatePress={console.log}
          onWeekSwitch={(date) => {
            setSelectedDate(date, reverseMode);
          }}
        />
      </Surface>
    </View>
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
