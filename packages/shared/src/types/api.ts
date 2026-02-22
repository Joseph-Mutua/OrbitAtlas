/**
 * REST API contracts
 */

import type { CommunityManifest } from './manifest.js';

export interface Community {
  id: string;
  name: string;
  thumbnailUrl?: string;
  phaseCount: number;
  lotCount: number;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

export interface CommunitiesResponse {
  communities: Community[];
}

export interface ManifestResponse {
  manifest: CommunityManifest;
}

export interface AssetUploadResponse {
  id: string;
  url: string;
  mimeType: string;
  sizeBytes: number;
}
