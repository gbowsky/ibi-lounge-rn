import { create } from "zustand";
import { createSchedulesSlice, SchedulesSlice } from "./api/SchedulesSlice";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";

export const useSchedulesModalStore = create<SchedulesSlice>()(
  persist(
    (...a) => ({
      ...createSchedulesSlice(...a),
    }),
    {
      name: "schedules-modal-store",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export const useSchedulesModalStoreHydrated = () => {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Note: This is just in case you want to take into account manual rehydration.
    // You can remove the following line if you don't need it.
    const unsubHydrate = useSchedulesModalStore.persist.onHydrate(() =>
      setHydrated(false),
    );

    const unsubFinishHydration =
      useSchedulesModalStore.persist.onFinishHydration(() => setHydrated(true));

    setHydrated(useSchedulesModalStore.persist.hasHydrated());

    return () => {
      unsubHydrate();
      unsubFinishHydration();
    };
  }, []);

  return hydrated;
};
