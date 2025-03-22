import { LessonItem } from "@/lib/api/schedules";
import { i18n } from "@/lib/localization";
import { StyleSheet, View } from "react-native";
import { Icon, Text } from "react-native-paper";
import { GlobalIcon } from "../ui/GlobalIcon";

type LessonTypeProps = {
  type?: LessonItem["additional"]["type"] | "online";
  classroom?: string;
};

export const LessonType = (props: LessonTypeProps) => {
  const { type, classroom } = props;
  const background = type === "online" || classroom ? "#63519f" : "#775460";
  const foreground = "#ffffff";

  if (type === "unknown") {
    return null;
  }

  return (
    <View style={{ ...styles.root, backgroundColor: background }}>
      <GlobalIcon
        color={foreground}
        size={14}
        icon={type ? i18n.get("icon_types." + type) : "map-marker"}
      />
      <Text style={{ ...styles.text, color: foreground }} variant="bodySmall">
        {type ? i18n.get("types." + type) : classroom}
      </Text>
      {type === "online" && (
        <Icon color={foreground} size={12} source="chevron-right" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 2,
    paddingHorizontal: 4,
    borderRadius: 6,
    gap: 2,
  },
  text: {
    textTransform: "uppercase",
  },
});
