import React, { FC, memo } from "react";
import { WeekItemProps, itemWidth } from "./lib";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { getDate } from "date-fns";
import { Surface, Text } from "react-native-paper";

export const WeekItem: FC<WeekItemProps> = memo(({ date, isToday }) => {
  const day = getDate(date);

  return (
    <View style={{ width: itemWidth, alignItems: "center" }}>
      <Surface style={styles.root} elevation={isToday ? 1 : 0}>
        <Text>{day}</Text>
      </Surface>
    </View>
  );
});

const styles = StyleSheet.create({
  root: {
    width: 40,
    height: 40,
    textAlign: "center",
    marginVertical: 6,
    borderRadius: 10,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  today: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
  },
});
