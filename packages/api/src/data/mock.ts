import type { CommunityManifest } from '@community-explorer/shared';

export const MOCK_COMMUNITIES: Array<{
  id: string;
  name: string;
  thumbnailUrl?: string;
  phaseCount: number;
  lotCount: number;
}> = [
  {
    id: 'pleasant-grove',
    name: 'Mattamy Homes at Pleasant Grove',
    thumbnailUrl: undefined,
    phaseCount: 2,
    lotCount: 24,
  },
  {
    id: 'sunset-ridge',
    name: 'Sunset Ridge',
    thumbnailUrl: undefined,
    phaseCount: 1,
    lotCount: 12,
  },
];

export const MOCK_MANIFESTS: Record<string, CommunityManifest> = {
  'pleasant-grove': {
    version: '1.0.0',
    communityId: 'pleasant-grove',
    communityName: 'Mattamy Homes at Pleasant Grove',
    updatedAt: new Date().toISOString(),
    phases: [
      {
        id: 'phase-1',
        name: 'Phase 1',
        lots: [
          {
            id: 'lot-1-1',
            address: '100 Pleasant Grove Dr',
            sqft: 2200,
            price: 385000,
            status: 'available',
            panoNodeIds: ['pano-1-1', 'pano-1-2'],
            boundary: {
              type: 'Polygon',
              coordinates: [
                [
                  [-122.4, 37.8],
                  [-122.39, 37.8],
                  [-122.39, 37.79],
                  [-122.4, 37.79],
                  [-122.4, 37.8],
                ],
              ],
            },
          },
          {
            id: 'lot-1-2',
            address: '102 Pleasant Grove Dr',
            sqft: 2400,
            price: 410000,
            status: 'available',
            panoNodeIds: ['pano-1-2', 'pano-1-3'],
            boundary: {
              type: 'Polygon',
              coordinates: [
                [
                  [-122.39, 37.8],
                  [-122.38, 37.8],
                  [-122.38, 37.79],
                  [-122.39, 37.79],
                  [-122.39, 37.8],
                ],
              ],
            },
          },
          { id: 'lot-1-3', address: '104 Pleasant Grove Dr', sqft: 2600, price: 445000, status: 'sold' },
        ],
      },
      {
        id: 'phase-2',
        name: 'Phase 2',
        lots: [
          { id: 'lot-2-1', address: '200 Pleasant Grove Dr', sqft: 2300, price: 395000, status: 'available' },
          { id: 'lot-2-2', address: '202 Pleasant Grove Dr', sqft: 2500, price: 430000, status: 'reserved' },
        ],
      },
    ],
    panoNodes: [
      {
        id: 'pano-1-1',
        position: [0, 0, 0],
        url: 'https://pannellum.org/images/alma.jpg',
        neighbors: ['pano-1-2'],
        lotId: 'lot-1-1',
      },
      {
        id: 'pano-1-2',
        position: [10, 0, 5],
        url: 'https://pannellum.org/images/alma.jpg',
        neighbors: ['pano-1-1', 'pano-1-3'],
        lotId: 'lot-1-1',
      },
      {
        id: 'pano-1-3',
        position: [20, 0, 5],
        url: 'https://pannellum.org/images/alma.jpg',
        neighbors: ['pano-1-2'],
        lotId: 'lot-1-2',
      },
    ],
    scenes: [
      {
        id: 'phase-1',
        phaseId: 'phase-1',
        phaseName: 'Phase 1',
        assets: [],
        thumbnailUrl: undefined,
      },
      {
        id: 'phase-2',
        phaseId: 'phase-2',
        phaseName: 'Phase 2',
        assets: [],
        thumbnailUrl: undefined,
      },
    ],
  },
  'sunset-ridge': {
    version: '1.0.0',
    communityId: 'sunset-ridge',
    communityName: 'Sunset Ridge',
    updatedAt: new Date().toISOString(),
    phases: [
      {
        id: 'phase-1',
        name: 'Phase 1',
        lots: [
          { id: 'lot-1', address: '10 Sunset Blvd', sqft: 2000, price: 350000, status: 'available', panoNodeIds: ['pano-s1'] },
          { id: 'lot-2', address: '12 Sunset Blvd', sqft: 2200, price: 375000, status: 'available', panoNodeIds: ['pano-s1', 'pano-s2'] },
        ],
      },
    ],
    panoNodes: [
      { id: 'pano-s1', position: [0, 0, 0], url: 'https://pannellum.org/images/alma.jpg', neighbors: ['pano-s2'], lotId: 'lot-1' },
      { id: 'pano-s2', position: [8, 0, 4], url: 'https://pannellum.org/images/alma.jpg', neighbors: ['pano-s1'], lotId: 'lot-2' },
    ],
    scenes: [
      {
        id: 'phase-1',
        phaseId: 'phase-1',
        phaseName: 'Phase 1',
        assets: [],
        thumbnailUrl: undefined,
      },
    ],
  },
};
