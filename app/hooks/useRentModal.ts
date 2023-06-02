import { create } from "zustand";

interface RentModalStore {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useRentModal = create<RentModalStore>((set) => ({
  open: false,
  onOpen: () => set({ open: true }),
  onClose: () => set({ open: false }),
}));

export default useRentModal;
