import { i18n } from "@/lib/localization";
import { useEffect } from "react";
import { Animated, StyleSheet, useAnimatedValue, View } from "react-native";
import { Button, Text } from "react-native-paper";

interface NoLinksProps {
  onReload: VoidFunction;
  loading?: boolean;
  code?: string | null;
}

export const NoLinks = ({ onReload, loading, code }: NoLinksProps) => {
  const anim = useAnimatedValue(0);
  const backAnim = useAnimatedValue(-15);

  useEffect(() => {
    Animated.timing(anim, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [anim]);

  useEffect(() => {
    Animated.spring(backAnim, {
      toValue: 0,
      useNativeDriver: true,
      bounciness: 15,
    }).start();
  }, [backAnim]);

  return (
    <View style={styles.root}>
      <Animated.View
        style={{
          opacity: anim,
          position: "relative",
          transform: [{ translateY: backAnim }, { perspective: 1000 }],
        }}
      >
        <Text style={styles.center} variant="headlineLarge">
          🤔
        </Text>
      </Animated.View>
      <Text style={styles.center} variant="headlineMedium">
        {i18n.get(code ? `no_links.${code}_title` : "no_links.title")}
      </Text>
      <Text style={styles.center}>
        {i18n.get(code ? `no_links.${code}_desc` : "no_links.desc")}
      </Text>
      <Button loading={loading} disabled={loading} onPress={() => onReload()}>
        {i18n.get("no_grades.try_again")}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    padding: 20,
    gap: 12,
  },
  center: {
    textAlign: "center",
  },
});
