import { create } from "zustand";

type AlertStore = {
  isOpen: boolean;
  openAlert: () => void;
  closeAlert: () => void;
};

export const useAlertStore = create<AlertStore>((set) => ({
  isOpen: false,
  openAlert: () => set({ isOpen: true }),
  closeAlert: () => set({ isOpen: false }),
}));
