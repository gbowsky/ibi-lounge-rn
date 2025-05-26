import { makeApiRequestUrl } from "./url";

export interface NewsItem {
  title: string;
  description: string;
  button_text?: string;
  button_url?: string;
  author: string;
  created_at: string;
  updated_at?: string;
  pinned: boolean;
  urgent: boolean;
}

export async function getNews(
  locale: "en" | "ru",
): Promise<NewsItem[] | false> {
  const url = makeApiRequestUrl("news", { lang: locale });
  try {
    const req = await fetch(url);
    const json = await req.json();

    if (!req.ok) {
      console.warn("Something not right in getNews response:", url);
      console.log(json);
      return json;
    }

    return (json as NewsItem[]).reverse();
  } catch (e) {
    console.error("getNews: req error:", e);
    return false;
  }
}
