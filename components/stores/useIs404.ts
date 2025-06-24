import { create } from "zustand";

type store = {
  is404: boolean;
  setIs404: (v:boolean) => void;
};

export const useIs404Store = create<store>((set) => ({
  is404: false,
  setIs404: (v) => set({ is404: v }),
}));
