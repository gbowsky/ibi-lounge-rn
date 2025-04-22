import { StateCreator } from "zustand";
import { SettingsStore, useSettingsStore } from "../UserPrefs";
import { addDays, endOfWeek, startOfWeek } from "date-fns";
import { DayItem, getSchedules } from "@/lib/api/schedules";

export interface SchedulesSlice {
  schedulesLoading: boolean;
  selectedDate: Date;
  setSelectedDate: (d: Date, mode: SettingsStore["mode"]) => void;
  days: DayItem[];
  loadSchedules: (mode: SettingsStore["mode"]) => Promise<DayItem[] | false>;
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
  loadSchedules: async (mode) => {
    set({ schedulesLoading: true });
    const { group, teacher } = useSettingsStore.getState();
    const { selectedDate } = get();

    const data = await getSchedules(
      startOfWeek(selectedDate),
      endOfWeek(addDays(selectedDate, 7)),
      {
        groupId: mode === "student" ? group.id : undefined,
        teacherId: mode === "teacher" ? teacher.id : undefined,
      },
    );

    if (data) {
      set({ days: data, schedulesLoading: false });
    }

    return false;
  },
});
