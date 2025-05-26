import { i18n } from "@/lib/localization";
import { Stack } from "expo-router";
import { Platform, View } from "react-native";

const LinksTab = () => {
  return (
    <View style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen
          name="news"
          options={{
            headerShown: true,
            contentStyle: {
              backgroundColor: "transparent",
            },
            headerLargeTitle: true,
            headerTransparent: Platform.OS === "ios",
            headerBlurEffect:
              Platform.OS === "ios" ? "systemThinMaterial" : undefined,
            title: i18n.get("screens.news"),
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

export default LinksTab;
