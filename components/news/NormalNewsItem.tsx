import { NewsItem } from "@/lib/api/news";
import { useTheme } from "@react-navigation/native";
import Markdown from "@ronradtke/react-native-markdown-display";
import { format } from "date-fns";
import { Linking, StyleSheet, View } from "react-native";
import { Button, Card, Divider, Text } from "react-native-paper";
import { GlobalIcon } from "../ui/GlobalIcon";
import { i18n } from "@/lib/localization";
import { formatDate } from "@/lib/dates";

interface NormalNewsItemProps {
  item: NewsItem;
}

export const NormalNewsItem = ({ item }: NormalNewsItemProps) => {
  const { colors } = useTheme();

  return (
    <Card style={styles.card} mode="contained">
      <Card.Content>
        <Text variant="titleLarge">{item.title}</Text>
        <View style={{ flexDirection: "row", alignItems: "baseline", gap: 4 }}>
          {item.pinned && (
            <GlobalIcon icon="pin" color={colors.text} size={10} />
          )}
          <Text variant="bodySmall" style={{ marginTop: 6 }}>
            {item.author},{" "}
            {item.pinned && item.updated_at
              ? `${i18n.get("news.updated_at")} ${formatDate(item.updated_at, "dd.MM.yyyy")}`
              : formatDate(item?.created_at, "dd.MM.yyyy")}
          </Text>
        </View>
        <Markdown
          style={{
            body: {
              color: colors.text,
            },
          }}
        >
          {item.description.replaceAll("<br>", "\n")}
        </Markdown>
        {item.button_url && item.button_text && (
          <>
            <View style={{ height: 16 }} />
            <Button
              onPress={async () => {
                const canOpen = await Linking.canOpenURL(item.button_url!);
                if (canOpen) {
                  Linking.openURL(item.button_url!);
                }
              }}
              mode="contained"
              children={item.button_text}
            />
          </>
        )}
      </Card.Content>
      <Divider bold style={{ marginTop: 16, marginHorizontal: 12 }} />
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "transparent",
  },
});
