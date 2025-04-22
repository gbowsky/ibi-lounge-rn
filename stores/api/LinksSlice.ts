import { StateCreator } from "zustand";
import { SectionItem, getLinks } from "@/lib/api/links";

export interface LinksSlice {
  links: SectionItem[];
  linksError: string | null;
  loadLinks: () => Promise<void>;
  setLinks: (links: SectionItem[]) => void;
  linksLoading: boolean;
}

export const createLinksSlice: StateCreator<LinksSlice, [], [], LinksSlice> = (
  set,
) => ({
  linksLoading: false,
  links: [],
  linksError: null,
  loadLinks: async (): Promise<void> => {
    set({ linksLoading: true });

    const data = await getLinks();

    if (!!data) {
      // Ошибка
      if ("code" in data) {
        set({ linksError: data.code, links: [], linksLoading: false });
        return;
      }

      // Обрабатываем, заменяем поле links на data
      let newData: SectionItem[] = [];

      data.forEach(({ title, links }) => {
        newData.push({ title, data: links });
      });

      set({ linksError: null, links: newData, linksLoading: false });
    }
  },
  setLinks: (links) => set({ links }),
});
