import { View, StyleSheet, Linking, Pressable, Dimensions } from "react-native";
import { Divider, Text, useTheme } from "react-native-paper";

import { isWithinInterval, parse } from "date-fns";
import React, { useEffect, useState } from "react";
import { LessonType } from "./LessonType";
import { useSettingsStore } from "@/stores/UserPrefs";

import { i18n } from "@/lib/localization";
import { LessonItem } from "@/lib/api/schedules";
const PRIORITY_MAP = {
  lecture: "#769CDF",
  practice: "#769CDF",
  consultation: "#FFDE3F",
  subject_report_with_grade: "#FFDE3F",
  exam: "#FF5449",
  subject_report: "#FFDE3F",
  course_work_defend: "#FF5449",
  library_day: "#769CDF",
  project_work: "#769CDF",
  meeting: "#FFDE3F",
  unknown: "#FFDE3F",
};

interface LessonProps {
  lesson: LessonItem;
  isThisDay: boolean;
}

export const Lesson = (props: LessonProps) => {
  const [isNow, setNow] = useState(false);
  const { mode } = useSettingsStore();
  const { lesson, isThisDay } = props;
  const { dark, colors } = useTheme();
  const windowWidth = Dimensions.get("window").width;

  function checkIfLessonIsNow() {
    const start = parse(lesson.time_start, "HH:mm", new Date());
    const end = parse(lesson.time_end, "HH:mm", new Date());
    const result =
      isThisDay &&
      isWithinInterval(new Date(), {
        start,
        end,
      });

    if (isNow !== result) {
      setNow(isThisDay && result);
    }
  }

  useEffect(() => {
    checkIfLessonIsNow();

    if (isThisDay) {
      const currentCheckerInterval = setInterval(
        () => checkIfLessonIsNow(),
        3000,
      );

      return () => clearInterval(currentCheckerInterval);
    }
  }, [lesson, isThisDay]);

  return (
    <View>
      <Pressable
        onPress={() => {
          if (lesson.additional?.url) {
            Linking.openURL(lesson.additional.url);
          }
        }}
      >
        <View style={styles.newRoot}>
          <View
            style={{
              backgroundColor: PRIORITY_MAP[lesson.additional.type],
              width: 4,
              borderRadius: 4,
              marginRight: 8,
              boxShadow: isNow
                ? `0 6px 12px 0 ${PRIORITY_MAP[lesson.additional.type]}AA,
                0 -6px 12px 0 ${PRIORITY_MAP[lesson.additional.type]}AA,
                4px 0 24px 0 ${PRIORITY_MAP[lesson.additional.type]}`
                : "none",
            }}
          />
          <View
            style={{
              ...styles.left,
              maxWidth: windowWidth - 82,
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "baseline", gap: 4 }}
            >
              {lesson.additional.type && (
                <LessonType type={lesson.additional.type} />
              )}
              {lesson.additional?.is_online || lesson.additional?.url ? (
                <LessonType type="online" />
              ) : (
                <LessonType classroom={lesson.additional.classroom} />
              )}
            </View>
            <View
              style={{
                flexShrink: 1,
              }}
            >
              <Text variant="bodyMedium" style={{ fontWeight: 500 }}>
                {lesson.text}{" "}
                <Text style={{ color: colors.secondary }} variant="bodyMedium">
                  {lesson.additional?.teacher_groups
                    ? lesson.additional?.teacher_groups.join(", ")
                    : lesson.additional?.teacher_name
                      ? lesson.additional?.teacher_name
                      : "schedules.unknown_teacher"}
                </Text>
                {lesson.additional?.compensation && (
                  <Text variant="bodyMedium">
                    {i18n.get("schedules.compensation_for")}{" "}
                    {lesson.additional.compensation}
                  </Text>
                )}
              </Text>
            </View>
          </View>
          <View>
            <View>
              {isNow ? (
                <Text variant="bodyMedium" style={styles.nowText}>
                  {i18n.get("scheules.lesson_now")}
                </Text>
              ) : (
                <>
                  <Text variant="bodyMedium" style={{ textAlign: "right" }}>
                    {lesson.time_start}
                  </Text>
                  <Text
                    variant="bodyMedium"
                    style={{ color: colors.secondary, textAlign: "right" }}
                  >
                    {lesson.time_end}
                  </Text>
                </>
              )}
            </View>
          </View>
        </View>
      </Pressable>
      <Divider style={styles.divider} />
    </View>
  );
};

const styles = StyleSheet.create({
  divider: {
    marginHorizontal: 16,
    marginLeft: 28,
  },
  background: {
    borderRadius: 12,
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
  nowText: {
    color: "#5B98E1",
    fontWeight: 600,
  },
  newRoot: {
    flexDirection: "row",
    marginHorizontal: 15,
    paddingVertical: 12,
  },
  left: {
    flexGrow: 1,
  },
});
