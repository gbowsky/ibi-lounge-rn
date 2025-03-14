import { LessonItem } from "@/stores/api/SchedulesSlice";
import { View, StyleSheet, Linking } from "react-native";
import { List, Text } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";

import { LessonAside } from "./LessonAside";
import { useTheme } from "@react-navigation/native";
import { isWithinInterval, parse } from "date-fns";
import React, { useEffect, useState } from "react";

interface LessonProps {
  lesson: LessonItem;
  isThisDay: boolean;
}

export const Lesson = (props: LessonProps) => {
  const [isNow, setNow] = useState(false);
  const { lesson, isThisDay } = props;
  const { dark } = useTheme();

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
    // @ts-expect-error: Динамические стили
    <View style={styles.root(dark, isNow)}>
      {dark && (
        <LinearGradient
          colors={isNow ? ["#001730", "#000"] : ["#111111", "#000"]}
          // @ts-expect-error: Динамические стили
          style={styles.background}
        />
      )}
      <List.Item
        background={{ foreground: true }}
        disabled={!lesson.additional.url}
        onPress={() => {
          if (lesson.additional?.url) {
            Linking.openURL(lesson.additional.url);
          }
        }}
        title={
          <View>
            {isNow ? (
              // @ts-expect-error: Динамические стили
              <Text style={styles.nowText}>Сейчас</Text>
            ) : (
              <Text>
                {lesson.time_start} - {lesson.time_end}
              </Text>
            )}
            <Text variant="bodyLarge">{lesson.text}</Text>
          </View>
        }
        description={
          <Text>
            {lesson.additional?.teacher_groups
              ? lesson.additional?.teacher_groups.join(", ")
              : lesson.additional?.teacher_name
                ? lesson.additional?.teacher_name
                : "Неизвестный преподаватель"}
          </Text>
        }
        right={() => <LessonAside additional={lesson.additional} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
  // @ts-expect-error: Динамические стили
  root: (isDark: boolean, isNow: boolean) => {
    const defaults = {
      marginBottom: -6,
      marginHorizontal: 12,
      borderRadius: 12,
    };

    if (isNow) {
      if (isDark) {
        return {
          ...defaults,
          boxShadow:
            "0px -11px 24px 0px rgba(0, 153, 255, 0.12), 0px -2px 2px 0px rgba(0, 77, 255, 0.35)",
        };
      }

      return {
        ...defaults,
        boxShadow:
          "0px -13px 14px 0px rgba(187, 197, 255, 0.22), 0px -6px 10px 0px rgba(229, 238, 255, 0.04), 0px -1px 2px 0px rgba(42, 0, 163, 0.13)",
      };
    }

    if (isDark) {
      return {
        ...defaults,
        boxShadow:
          "0px -13px 14px 0px rgba(255, 255, 255, 0.03), 0px -6px 10px 0px rgba(255, 255, 255, 0.02), 0px -1px 2px 0px rgba(255, 255, 255, 0.11);",
      };
    }

    return {
      ...defaults,
      boxShadow:
        "0px -13px 14px 0px rgba(0, 0, 0, 0.03), 0px -6px 10px 0px rgba(0, 0, 0, 0.02), 0px -1px 2px 0px rgba(0, 0, 0, 0.11)",
    };
  },
});
