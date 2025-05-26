import { NoGrades } from "@/components/grades/NoGrades";
import { GlobalScreen } from "@/components/ui/GlobalScreen";
import { NewsItem } from "@/lib/api/news";
import { i18n } from "@/lib/localization";
import { useApiStore } from "@/stores/ApiStore";
import { useLocales } from "expo-localization";
import { useEffect } from "react";
import { StyleSheet } from "react-native";
import { NormalNewsItem } from "@/components/news/NormalNewsItem";
import { UrgentNewsItem } from "@/components/news/UrgentNewsItem";

export default function NewsScreen({}) {
  const { urgentNews, pinnedNews, news, loadNews, newsLoading, newsError } =
    useApiStore();
  const locales = useLocales();
  const locale = locales[0].languageCode ?? "en";

  async function fetchData() {
    await loadNews(locale);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <GlobalScreen<NewsItem>
      title={i18n.get("screens.news")}
      largeTitle
      flatListProps={{
        data: [...urgentNews, ...pinnedNews, ...news],
        onRefresh: () => fetchData(),
        refreshing: newsLoading,
        renderItem: ({ item, index }) =>
          !item.urgent ? (
            <NormalNewsItem item={item} key={`news-${index}`} />
          ) : (
            <UrgentNewsItem item={item} key={`news-${index}`} />
          ),
        ListEmptyComponent: (
          <NoGrades
            loading={newsLoading}
            code="NEWS_EMPTY"
            onReload={() => loadNews(locale)}
          />
        ),
      }}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "transparent",
  },
});
