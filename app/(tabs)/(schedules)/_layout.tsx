import { useSettingsStore } from "@/stores/UserPrefs";
import { router, Stack } from "expo-router";
import { Platform, View } from "react-native";
import { IconButton } from "react-native-paper";
import * as DropDownMenu from "zeego/dropdown-menu";

function HeaderRight() {
  const { mode } = useSettingsStore();
  return (
    <DropDownMenu.Root>
      <DropDownMenu.Trigger>
        <IconButton icon="dots-horizontal-circle" />
      </DropDownMenu.Trigger>
      <DropDownMenu.Content>
        <DropDownMenu.Item
          key="show-schedules-modal"
          onSelect={() => router.push("/schedules-modal")}
        >
          <DropDownMenu.ItemTitle>
            {mode === "student"
              ? "Просмотреть расписание преподавателей"
              : "Просмотреть расписание групп"}
          </DropDownMenu.ItemTitle>
        </DropDownMenu.Item>
        <DropDownMenu.Separator />
      </DropDownMenu.Content>
    </DropDownMenu.Root>
  );
}

const SchedulesTab = () => {
  return (
    <View style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: true,
            headerLargeTitle: true,
            headerTransparent: Platform.OS === "ios",
            headerBlurEffect: Platform.OS === "ios" ? "prominent" : undefined,
            headerTitle: "Расписание",
            headerLargeStyle: {
              backgroundColor: "transparent",
            },
            headerRight: () => <HeaderRight />,
          }}
        />
      </Stack>
    </View>
  );
};

export default SchedulesTab;
