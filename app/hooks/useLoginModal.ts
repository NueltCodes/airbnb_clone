import { create } from "zustand";

interface LoginModalStore {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useLoginModal = create<LoginModalStore>((set) => ({
  open: false,
  onOpen: () => set({ open: true }),
  onClose: () => set({ open: false }),
}));

export default useLoginModal;
