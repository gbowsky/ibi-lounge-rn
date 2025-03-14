import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { createGradesSlice, GradesSlice } from "./api/GradesSlice";
import { createSchedulesSlice, SchedulesSlice } from "./api/SchedulesSlice";

export const useApiStore = create<GradesSlice & SchedulesSlice>()(
  persist(
    (...a) => ({
      ...createGradesSlice(...a),
      ...createSchedulesSlice(...a),
    }),
    {
      name: "api-store",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export const useApiHydration = () => {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Note: This is just in case you want to take into account manual rehydration.
    // You can remove the following line if you don't need it.
    const unsubHydrate = useApiStore.persist.onHydrate(() =>
      setHydrated(false),
    );

    const unsubFinishHydration = useApiStore.persist.onFinishHydration(() =>
      setHydrated(true),
    );

    setHydrated(useApiStore.persist.hasHydrated());

    return () => {
      unsubHydrate();
      unsubFinishHydration();
    };
  }, []);

  return hydrated;
};
