import { create } from 'zustand';
import type { CommunityId, PhaseId, LotId } from '@community-explorer/shared';

export interface ExplorerState {
  communityId: CommunityId | null;
  phaseId: PhaseId | null;
  lotId: LotId | null;
  activePanel: string | null;
  reduceMotion: boolean;
  setCommunity: (id: CommunityId | null) => void;
  setPhase: (id: PhaseId | null) => void;
  setLot: (id: LotId | null) => void;
  setActivePanel: (id: string | null) => void;
  setReduceMotion: (enabled: boolean) => void;
}

export const useExplorerStore = create<ExplorerState>((set) => ({
  communityId: null,
  phaseId: null,
  lotId: null,
  activePanel: null,
  reduceMotion: false,

  setCommunity: (id) => set({ communityId: id, phaseId: null, lotId: null }),
  setPhase: (id) => set({ phaseId: id, lotId: null }),
  setLot: (id) => set({ lotId: id }),
  setActivePanel: (id) => set({ activePanel: id }),
  setReduceMotion: (enabled) => set({ reduceMotion: enabled }),
}));
