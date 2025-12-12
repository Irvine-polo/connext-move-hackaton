import { create } from 'zustand';
import type { MoveVehicle } from '@/04_types/move/move-vehicle';

// Define the store
type MoveVehicleStoreProps = {
  selectedMoveVehicle: MoveVehicle | null;
  setSelectedMoveVehicle: (moveVehicle: MoveVehicle | null) => void;
};

// Create the store
const useMoveVehicleStore = create<MoveVehicleStoreProps>(set => ({
  selectedMoveVehicle: null,
  setSelectedMoveVehicle: moveVehicle =>
    set({ selectedMoveVehicle: moveVehicle }),
}));

export default useMoveVehicleStore;
