import { create } from "zustand";

interface UserUpdateModalStore {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useUserUpdateModal = create<UserUpdateModalStore>((set) => ({
  open: false,
  onOpen: () => set({ open: true }),
  onClose: () => set({ open: false }),
}));

export default useUserUpdateModal;
