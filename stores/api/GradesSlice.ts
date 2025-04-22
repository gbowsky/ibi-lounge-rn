import { StateCreator } from "zustand";
import { useSettingsStore } from "../UserPrefs";
import { getGrades, GradeItem } from "@/lib/api/grades";

export interface GradesSlice {
  grades: GradeItem[];
  gradesError: string | null;
  loadGrades: () => Promise<void>;
  setGrades: (grades: GradeItem[]) => void;
  gradesLoading: boolean;
}

export const createGradesSlice: StateCreator<
  GradesSlice,
  [],
  [],
  GradesSlice
> = (set) => ({
  gradesLoading: false,
  grades: [],
  gradesError: null,
  loadGrades: async (): Promise<void> => {
    set({ gradesLoading: true });
    const { lastName, pin } = useSettingsStore.getState();

    const data = await getGrades(pin, lastName);

    if (!!data) {
      // Ошибка
      if ("code" in data) {
        set({ gradesError: data.code, grades: [], gradesLoading: false });
        return;
      }

      set({ gradesError: null, grades: data, gradesLoading: false });
    }
  },
  setGrades: (grades) => set({ grades }),
});
