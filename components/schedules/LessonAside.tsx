import { i18n } from "@/lib/localization";
import { LessonItem } from "@/stores/api/SchedulesSlice";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import * as ContextMenu from "zeego/context-menu";

interface LessonAsideProps {
  additional: LessonItem["additional"];
}

export const LessonAside = (props: LessonAsideProps) => {
  const { additional } = props;

  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger>
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
  lessonSide: {
    textAlign: "right",
    marginBottom: 2,
  },
});
