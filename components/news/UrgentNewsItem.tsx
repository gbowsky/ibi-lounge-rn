import { NewsItem } from "@/lib/api/news";
import { useTheme } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";
import { GlobalIcon } from "../ui/GlobalIcon";
import { Colors } from "@/constants/Colors";

interface UrgentNewsItemProps {
  item: NewsItem;
}

export const UrgentNewsItem = ({ item }: UrgentNewsItemProps) => {
  const { colors, dark } = useTheme();

  return (
    <Card
      style={{
        ...styles.card,
        backgroundColor: Colors[dark ? "dark" : "light"].urgent,
      }}
      mode="contained"
    >
      <Card.Content>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
          <GlobalIcon icon="triangle-outline" size={12} color={colors.text} />
          <Text variant="bodySmall">{item.title}</Text>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 12,
  },
});
