import { create } from 'zustand';
import { DialogStore } from './types';

export const dialogStore = create<DialogStore>()((set) => ({
  visible: false,
  setVisible: (visible: boolean) => set(() => ({ visible })),
}));
