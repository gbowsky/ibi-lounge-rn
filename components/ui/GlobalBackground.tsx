import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";

interface GlobalBackgroundProps {
  colorScheme: "light" | "dark";
}

export const GlobalBackground = (props: GlobalBackgroundProps) => {
  const { colorScheme } = props;
  return (
    <LinearGradient
      style={StyleSheet.absoluteFill}
      colors={
        colorScheme === "dark"
          ? ["#223", "#000", "#000"]
          : ["#ccf", "#fff", "#fff", "#fff"]
      }
    />
  );
};
