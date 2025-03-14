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
            headerLargeTitle: true,
            headerTransparent: Platform.OS === "ios",
            headerBlurEffect: Platform.OS === "ios" ? "prominent" : undefined,
            headerTitle: "Оценки",
            headerLargeStyle: {
              backgroundColor: "transparent",
            },
          }}
        />
      </Stack>
    </View>
  );
};

export default GradesTab;
