import { create } from 'zustand';
import type { CommunityId, PhaseId, LotId, PanoNodeId } from '@community-explorer/shared';

export interface ExplorerState {
  communityId: CommunityId | null;
  phaseId: PhaseId | null;
  lotId: LotId | null;
  activePanel: string | null;
  /** Current Street View panorama node when street tour is active. */
  activePanoNodeId: PanoNodeId | null;
  reduceMotion: boolean;
  setCommunity: (id: CommunityId | null) => void;
  setPhase: (id: PhaseId | null) => void;
  setLot: (id: LotId | null) => void;
  setActivePanel: (id: string | null) => void;
  setActivePanoNode: (id: PanoNodeId | null) => void;
  setReduceMotion: (enabled: boolean) => void;
}

export const useExplorerStore = create<ExplorerState>((set) => ({
  communityId: null,
  phaseId: null,
  lotId: null,
  activePanel: null,
  activePanoNodeId: null,
  reduceMotion: false,

  setCommunity: (id) => set({ communityId: id, phaseId: null, lotId: null, activePanoNodeId: null }),
  setPhase: (id) => set({ phaseId: id, lotId: null, activePanoNodeId: null }),
  setLot: (id) => set({ lotId: id, activePanoNodeId: null }),
  setActivePanel: (id) =>
    set({
      activePanel: id,
      ...(id !== 'streetTour' && { activePanoNodeId: null }),
    }),
  setActivePanoNode: (id) => set({ activePanoNodeId: id }),
  setReduceMotion: (enabled) => set({ reduceMotion: enabled }),
}));
