import { StateCreator } from "zustand";
import { getNews, NewsItem } from "@/lib/api/news";

export interface NewsSlice {
  news: NewsItem[];
  urgentNews: NewsItem[];
  pinnedNews: NewsItem[];
  newsError: string | null;
  loadNews: (languageCode: string) => Promise<void>;
  setNews: (links: NewsItem[]) => void;
  newsLoading: boolean;
}

export const createNewsSlice: StateCreator<NewsSlice, [], [], NewsSlice> = (
  set,
) => ({
  newsLoading: false,
  news: [],
  newsError: null,
  urgentNews: [],
  pinnedNews: [],
  loadNews: async (languageCode) => {
    set({ newsLoading: true });
    const locale = ["ru", "en"].includes(languageCode)
      ? (languageCode as "en" | "ru")
      : "en";

    const data = await getNews(locale);

    if (!!data) {
      // Ошибка
      if ("code" in data) {
        set({ newsError: "UNKNOWN_ERROR", news: [], newsLoading: false });
        return;
      }

      const urgentNews = data.filter((news) => news.urgent);
      const pinnedNews = data.filter((news) => news.pinned && !news.urgent);
      const news = data.filter((news) => !news.urgent && !news.pinned);

      set({
        newsError: null,
        news,
        urgentNews,
        pinnedNews,
        newsLoading: false,
      });
    }
  },
  setNews: (news) => set({ news }),
});
