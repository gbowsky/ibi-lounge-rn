import { Day } from "@/components/schedules/Day";
import { CalendarComponent } from "@/components/schedules/WeekSwiper/Calendar";
import { useApiStore } from "@/stores/ApiStore";
import { useSettingsStore } from "@/stores/UserPrefs";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useState } from "react";
import { StyleSheet, FlatList, View } from "react-native";
import { Surface } from "react-native-paper";

export default function HomeScreen() {
  const tabbar = useBottomTabBarHeight();
  const { mode } = useSettingsStore();
  const { days, loadSchedules, setSelectedDate, schedulesLoading } =
    useApiStore();
  const [footerHeight, setFooterHeight] = useState(0);

  return (
    <View>
      <FlatList
        style={styles.container}
        contentInsetAdjustmentBehavior="automatic"
        refreshing={schedulesLoading}
        onRefresh={() => loadSchedules(mode)}
        data={days}
        renderItem={({ item, index }) => (
          <Day key={`day-${index}}`} day={item} />
        )}
        ListFooterComponent={<View style={{ height: footerHeight + tabbar }} />}
      />
      <Surface
        style={{ ...styles.footer, bottom: tabbar }}
        onLayout={(ev) => {
          setFooterHeight(ev.nativeEvent.layout.height);
        }}
      >
        <CalendarComponent
          date={new Date()}
          onDatePress={console.log}
          onWeekSwitch={(date) => {
            setSelectedDate(date, mode);
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
});
