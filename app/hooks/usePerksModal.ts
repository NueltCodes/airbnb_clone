import { create } from "zustand";

interface PerksModalStore {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const usePerksModal = create<PerksModalStore>((set) => ({
  open: false,
  onOpen: () => set({ open: true }),
  onClose: () => set({ open: false }),
}));

export default usePerksModal;
