import { StateCreator } from "zustand";
import { useSettingsStore } from "../UserPrefs";
import { getGrades, GradeItem } from "@/lib/api/grades";

export interface GradesSlice {
  grades: GradeItem[];
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
  loadGrades: async (): Promise<void> => {
    set({ gradesLoading: true });
    const { lastName, pin } = useSettingsStore.getState();

    const data = await getGrades(pin, lastName);

    if (data) {
      set({ grades: data, gradesLoading: false });
    }
  },
  setGrades: (grades) => set({ grades }),
});
