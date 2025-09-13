import { create } from "zustand";

type AlertOptions = {
  title?: string;
  description?: string;
  onConfirm?: () => void;
  loading?: boolean;
};

type AlertState = {
  isOpen: boolean;
  title?: string;
  description?: string;
  loading: boolean;
  onConfirm?: () => void;
  open: (opts: AlertOptions) => void;
  close: () => void;
  setLoading: (v: boolean) => void;
};

export const useAlertStore = create<AlertState>((set) => ({
  isOpen: false,
  title: undefined,
  description: undefined,
  loading: false,
  onConfirm: undefined,
  open: (opts) =>
    set(() => ({
      isOpen: true,
      title: opts.title,
      description: opts.description,
      onConfirm: opts.onConfirm,
      loading: !!opts.loading,
    })),
  close: () =>
    set(() => ({
      isOpen: false,
      title: undefined,
      description: undefined,
      onConfirm: undefined,
      loading: false,
    })),
  setLoading: (v: boolean) => set(() => ({ loading: v })),
}));
export default useAlertStore;
