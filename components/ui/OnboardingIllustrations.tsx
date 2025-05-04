import { Dimensions, View } from "react-native";
import { Ticket } from "./illustrations/Ticket";
import { PolygonOnboarding } from "./illustrations/Polygon";

export const OnboardingIllustrations = () => {
  const screenWidth = Dimensions.get("window").width;

  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "nowrap",
        justifyContent: "space-between",
        alignItems: "flex-end",
        flex: 1,
        width: screenWidth,
        marginHorizontal: -20,
        marginBottom: -40,
      }}
    >
      <Ticket />
      <PolygonOnboarding />
    </View>
  );
};
