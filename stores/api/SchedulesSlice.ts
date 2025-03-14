import { StateCreator } from "zustand";
import { SettingsStore, useSettingsStore } from "../UserPrefs";
import { addDays, format } from "date-fns";

const BASE_URL = "https://lounge.utme.space/schedules?";

export interface DayItem {
  day: string;
  month: string;
  week_day: string;
  lessons: LessonItem[];
}

export interface LessonItem {
  time_start: string;
  time_end: string;
  text: string;
  additional: Additional;
}

interface Additional {
  is_online: boolean;
  type:
    | "lecture"
    | "practice"
    | "consultation"
    | "subject_report_with_grade"
    | "exam"
    | "subject_report"
    | "course_work_defend"
    | "library_day"
    | "project_work"
    | "meeting";
  url?: string;
  classroom: string;
  teacher_name: string;
  compensation: string;
  teacher_groups: string[];
  classroom_details: ClassRoomDetails;
}

interface ClassRoomDetails {
  address?: string;
  classroom_number?: string;
  computer_classroom: boolean;
  online_classroom: boolean;
}

export interface SchedulesSlice {
  schedulesLoading: boolean;
  selectedDate: Date;
  setSelectedDate: (d: Date, mode: SettingsStore["mode"]) => void;
  days: DayItem[];
  loadSchedules: (mode: SettingsStore["mode"]) => Promise<void>;
}

function formatDate(date: Date) {
  return format(date, "dd.MM.yyyy");
}

export const createSchedulesSlice: StateCreator<
  SchedulesSlice,
  [],
  [],
  SchedulesSlice
> = (set, get) => ({
  schedulesLoading: true,
  selectedDate: new Date(),
  setSelectedDate: (selectedDate, mode) => {
    set({ selectedDate });
    get().loadSchedules(mode);
  },
  days: [],
  loadSchedules: async (mode: "student" | "teacher"): Promise<void> => {
    set({ schedulesLoading: true });
    const { group, teacher } = useSettingsStore.getState();
    const { selectedDate } = get();

    let url = BASE_URL;

    if (mode === "student") {
      url =
        BASE_URL +
        "group=" +
        group.id +
        `&dateStart=${formatDate(selectedDate)}` +
        `&dateEnd=${formatDate(addDays(selectedDate, 7))}`;
    } else {
      url =
        BASE_URL +
        "teacher=" +
        teacher.id +
        `&dateStart=${formatDate(selectedDate)}` +
        `&dateEnd=${formatDate(addDays(selectedDate, 7))}`;
    }

    console.log(url);

    const response = await fetch(url);

    if (response.ok) {
      const json = await response.json();
      console.log(json);
      set({ days: json, schedulesLoading: false });
    }
  },
});
