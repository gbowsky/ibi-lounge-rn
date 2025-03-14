import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { useApiStore } from "./ApiStore";

export interface StoredItem {
  name: string;
  id: string;
}

export interface SettingsStore {
  group: StoredItem;
  teacher: StoredItem;
  educationLevel: StoredItem;
  onboardingPassed: boolean;
  lastName: string;
  pin: string;
  mode: "student" | "teacher";

  setOnboardingPassed: (hasPassed: boolean) => void;
  setGroup: (newGrp: StoredItem) => void;
  setTeacher: (newTeacher: StoredItem) => void;
  setEducationLevel: (newLvl: StoredItem) => void;
  setLastName: (lastName: string) => void;
  setPin: (pin: string) => void;
  setMode: (mode: SettingsStore["mode"]) => void;
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set, get) => ({
      teacher: { name: "Любой", id: "0" },
      group: { name: "113-ПИвЭ", id: "2352" },
      educationLevel: { name: "бакалавриат", id: "1" },
      onboardingPassed: false,
      lastName: "",
      pin: "",
      mode: "student",

      setOnboardingPassed: (hasPassed) => set({ onboardingPassed: hasPassed }),
      setGroup: (newGrp) => {
        set({ group: newGrp });
        if (get().mode === "student")
          useApiStore.getState().loadSchedules(get().mode);
      },
      setTeacher: (newTeacher) => {
        set({ teacher: newTeacher });
        if (get().mode === "teacher")
          useApiStore.getState().loadSchedules(get().mode);
      },
      setEducationLevel: (newLevel) => set({ educationLevel: newLevel }),
      setLastName: (lastName) => set({ lastName }),
      setPin: (pin) => set({ pin }),
      setMode: (mode) => {
        set({ mode });
        useApiStore.getState().loadSchedules(mode);
      },
    }),
    {
      name: "user-prefs",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export const useHydration = () => {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Note: This is just in case you want to take into account manual rehydration.
    // You can remove the following line if you don't need it.
    const unsubHydrate = useSettingsStore.persist.onHydrate(() =>
      setHydrated(false),
    );

    const unsubFinishHydration = useSettingsStore.persist.onFinishHydration(
      () => setHydrated(true),
    );

    setHydrated(useSettingsStore.persist.hasHydrated());

    return () => {
      unsubHydrate();
      unsubFinishHydration();
    };
  }, []);

  return hydrated;
};
