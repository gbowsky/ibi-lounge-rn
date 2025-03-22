import { useTheme } from "@react-navigation/native";
import { Appbar } from "react-native-paper";

export function SchedulesHeader({}) {
  const nativeTheme = useTheme();

  return (
    <Appbar.Header
      statusBarHeight={0}
      style={{ backgroundColor: nativeTheme.colors.card }}
      mode="small"
    >
      <Appbar.Content title="Расписание" />
    </Appbar.Header>
  );
}
