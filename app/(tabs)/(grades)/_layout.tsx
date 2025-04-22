import { i18n } from "@/lib/localization";
import { Stack } from "expo-router";
import { Platform, View } from "react-native";

const GradesTab = () => {
  return (
    <View style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen
          name="grades"
          options={{
            headerShown: true,
            contentStyle: {
              backgroundColor: "transparent",
            },
            headerLargeTitle: true,
            headerTransparent: Platform.OS === "ios",
            headerBlurEffect:
              Platform.OS === "ios" ? "systemThinMaterial" : undefined,
            title: i18n.get("screens.grades"),
            headerLargeStyle: {
              backgroundColor: "transparent",
            },
            headerShadowVisible: false,
          }}
        />
      </Stack>
    </View>
  );
};

export default GradesTab;
