import { create } from 'zustand';
import type { MoveTransportRequest } from '@/04_types/move/move-transport-request';

// Define the store
type MoveTransportRequestStoreProps = {
  selectedMoveTransportRequest: MoveTransportRequest | null;
  setSelectedMoveTransportRequest: (
    moveTransportRequest: MoveTransportRequest | null,
  ) => void;
};

// Create the store
const useMoveTransportRequestStore = create<MoveTransportRequestStoreProps>(
  set => ({
    selectedMoveTransportRequest: null,
    setSelectedMoveTransportRequest: moveTransportRequest =>
      set({ selectedMoveTransportRequest: moveTransportRequest }),
  }),
);

export default useMoveTransportRequestStore;
