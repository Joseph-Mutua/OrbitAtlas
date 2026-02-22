/**
 * Viewer adapter interface — engine-agnostic 3D viewer contract.
 * Allows swapping Verge3D for Three.js/R3F without changing the React shell.
 */

import type { SceneId, LotId } from '@community-explorer/shared';

export interface CameraTarget {
  position: [number, number, number];
  lookAt?: [number, number, number];
  fov?: number;
}

export interface ViewerAdapter {
  loadScene(sceneId: SceneId): Promise<void>;
  setCamera(target: CameraTarget): void;
  highlightLot(lotId: LotId | null): void;
  dispose(): void;
}
