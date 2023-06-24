import { create } from "zustand";

interface EventsModalStore {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useEventsModal = create<EventsModalStore>((set) => ({
  open: false,
  onOpen: () => set({ open: true }),
  onClose: () => set({ open: false }),
}));

export default useEventsModal;
