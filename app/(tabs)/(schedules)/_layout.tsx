import { GlobalIcon } from "@/components/ui/GlobalIcon";
import { useSettingsStore } from "@/stores/UserPrefs";
import { router, Stack } from "expo-router";
import { Platform, View } from "react-native";
import * as DropDownMenu from "zeego/dropdown-menu";

function HeaderRight() {
  const { mode } = useSettingsStore();
  return (
    <DropDownMenu.Root>
      <DropDownMenu.Trigger>
        <GlobalIcon size={24} icon="dots-horizontal-circle" />
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
            contentStyle: {
              backgroundColor: "transparent",
            },
            headerLargeTitle: true,
            headerTransparent: Platform.OS === "ios",
            headerBlurEffect:
              Platform.OS === "ios" ? "systemThinMaterial" : undefined,
            title: "Расписание",
            headerLargeStyle: {
              backgroundColor: "transparent",
            },
            headerRight: () => <HeaderRight />,
            headerShadowVisible: false,
          }}
        />
      </Stack>
    </View>
  );
};

export default SchedulesTab;
