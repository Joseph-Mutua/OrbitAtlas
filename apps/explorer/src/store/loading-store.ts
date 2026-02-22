import { create } from 'zustand';

export type LoadReason = 'initial' | 'scene' | 'prefetch' | 'lod';

export interface LoadingItem {
  id: string;
  label: string;
  reason: LoadReason;
  progress: number;
  sizeBytes?: number;
}

export interface LoadingState {
  items: LoadingItem[];
  isActive: boolean;
  addItem: (item: LoadingItem) => void;
  updateProgress: (id: string, progress: number) => void;
  removeItem: (id: string) => void;
  clear: () => void;
}

export const useLoadingStore = create<LoadingState>((set) => ({
  items: [],
  isActive: false,

  addItem: (item) =>
    set((s) => {
      const exists = s.items.some((i) => i.id === item.id);
      if (exists) return s;
      return {
        items: [...s.items, item],
        isActive: true,
      };
    }),

  updateProgress: (id, progress) =>
    set((s) => ({
      items: s.items.map((i) => (i.id === id ? { ...i, progress } : i)),
    })),

  removeItem: (id) =>
    set((s) => {
      const next = s.items.filter((i) => i.id !== id);
      return { items: next, isActive: next.length > 0 };
    }),

  clear: () => set({ items: [], isActive: false }),
}));
