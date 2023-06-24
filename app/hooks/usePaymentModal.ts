import { create } from "zustand";

interface paymentModal {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const usePaymentModalModal = create<paymentModal>((set) => ({
  open: false,
  onOpen: () => set({ open: true }),
  onClose: () => set({ open: false }),
}));

export default usePaymentModalModal;
