// store/useLocationStore.ts

import { create } from "zustand";

export type Position = {
  lat: number;
  lng: number;
};

interface LocationStore {
  position: Position | null;
  address: string;

  setLocation: (position: Position, address: string) => void;
}

export const useLocationStore = create<LocationStore>((set) => ({
  position: null,
  address: "",

  setLocation: (position, address) =>
    set({
      position,
      address,
    }),
}));
