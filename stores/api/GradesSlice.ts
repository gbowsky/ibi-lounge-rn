import { StateCreator } from "zustand";
import { useSettingsStore } from "../UserPrefs";

const BASE_URL = "https://lounge.utme.space/grades?";

interface GradeItem {
  name: string;
  type:
    | "subject_report"
    | "subject_report_with_grade"
    | "course_work"
    | "offline_course_work"
    | "exam"
    | "unknown";
  grade:
    | "5"
    | "4"
    | "3"
    | "2"
    | "passed"
    | "absence"
    | "failed"
    | "not_admitted"
    | "unknown";
}

export interface GradesSlice {
  grades: GradeItem[];
  loadGrades: () => Promise<void>;
  setGrades: (grades: GradeItem[]) => void;
}

export const createGradesSlice: StateCreator<
  GradesSlice,
  [],
  [],
  GradesSlice
> = (set) => ({
  grades: [],
  loadGrades: async (): Promise<void> => {
    const { lastName, pin } = useSettingsStore.getState();
    const url = BASE_URL + "last_name=" + lastName + "&pin=" + pin;
    const response = await fetch(url);

    if (response.ok) {
      const json = await response.json();
      console.log(json);
      set({ grades: json });
    }
  },
  setGrades: (grades) => set({ grades }),
});
