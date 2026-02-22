/**
 * Manifest schema for community 3D assets.
 * Drives dynamic loading, LODs, and dependencies.
 */

export type CommunityId = string;
export type PhaseId = string;
export type LotId = string;
export type SceneId = string;
export type AssetId = string;

export interface AssetRef {
  id: AssetId;
  url: string;
  type: 'model' | 'texture' | 'pano';
  sizeBytes?: number;
  mimeType?: string;
}

export interface LODLevel {
  url: string;
  maxDistance: number;
  sizeBytes?: number;
}

export interface SceneAsset {
  id: AssetId;
  type: 'model' | 'texture' | 'pano';
  url: string;
  lods?: LODLevel[];
  sizeBytes?: number;
  dependencies?: AssetId[];
}

export interface LotBoundary {
  type: 'Polygon';
  coordinates: [number, number][][];
}

export interface LotInfo {
  id: LotId;
  address?: string;
  sqft?: number;
  price?: number;
  status?: 'available' | 'sold' | 'reserved';
  boundary?: LotBoundary;
  panoNodeIds?: string[];
}

export interface PhaseInfo {
  id: PhaseId;
  name: string;
  lots: LotInfo[];
}

export interface CommunityManifest {
  version: string;
  communityId: CommunityId;
  communityName: string;
  updatedAt: string; // ISO 8601
  scenes: {
    id: SceneId;
    phaseId: PhaseId;
    phaseName: string;
    assets: SceneAsset[];
    thumbnailUrl?: string;
  }[];
  phases: PhaseInfo[];
  metadata?: Record<string, unknown>;
}
