import { LessonItem } from "@/lib/api/schedules";
import { i18n } from "@/lib/localization";
import { View, StyleSheet } from "react-native";
import { Icon, Text, useTheme } from "react-native-paper";
import * as ContextMenu from "zeego/context-menu";

interface LessonAsideProps {
  additional: LessonItem["additional"];
}

export const LessonAside = (props: LessonAsideProps) => {
  const { additional } = props;
  const theme = useTheme();

  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger>
        <View
          style={
            additional?.url || additional.is_online
              ? { ...styles.root, ...styles.onlineRoot }
              : styles.root
          }
        >
          <View>
            <Text style={styles.lessonSide}>
              {i18n.get("types." + additional.type)}
            </Text>
            <Text style={styles.lessonSide}>
              {additional.is_online
                ? i18n.get("online")
                : `🗺️${additional.classroom}`}
            </Text>
          </View>
          {(additional?.url || additional.is_online) && (
            <View style={styles.onlineIcon}>
              <Icon
                color={theme.colors.secondary}
                size={24}
                source="chevron-right"
              />
            </View>
          )}
        </View>
      </ContextMenu.Trigger>
      <ContextMenu.Content>
        <ContextMenu.Sub>
          <ContextMenu.SubTrigger key="sub-menu-trigger">
            <ContextMenu.ItemTitle>Информация о кабинете</ContextMenu.ItemTitle>
          </ContextMenu.SubTrigger>
          <ContextMenu.SubContent>
            {additional.classroom_details?.address && (
              <ContextMenu.Item key="address">
                <ContextMenu.ItemTitle>
                  {additional.classroom_details.address}
                </ContextMenu.ItemTitle>
              </ContextMenu.Item>
            )}
            {additional.classroom_details?.classroom_number && (
              <ContextMenu.Item disabled key="classroom-number">
                <ContextMenu.ItemTitle>
                  {"Номер кабинета: " +
                    additional.classroom_details.classroom_number +
                    "\nКомпьтерный класс: " +
                    (additional.classroom_details.computer_classroom
                      ? "Да"
                      : "Нет")}
                </ContextMenu.ItemTitle>
              </ContextMenu.Item>
            )}
          </ContextMenu.SubContent>
        </ContextMenu.Sub>
        <ContextMenu.Group></ContextMenu.Group>

        <ContextMenu.Item key="copy-info">
          <ContextMenu.ItemTitle>
            Копировать информацию о паре
          </ContextMenu.ItemTitle>
        </ContextMenu.Item>
        <ContextMenu.Separator />
      </ContextMenu.Content>
    </ContextMenu.Root>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  onlineRoot: {
    marginRight: 4,
  },
  onlineIcon: {
    marginLeft: 4,
  },
  lessonSide: {
    textAlign: "right",
    marginBottom: 6,
  },
});
