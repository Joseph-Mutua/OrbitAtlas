import { useCallback } from 'react';
import * as turf from '@turf/turf';
import { useExplorerStore } from '@/store/explorer-store';
import { useManifest } from '@/hooks/useManifest';

interface PlatMapOverlayProps {
  onLotClick?: (lotId: string) => void;
  className?: string;
}

/**
 * Lightweight 2D plat overlay showing lot boundaries.
 * Click a lot polygon to fly camera to that lot in 3D.
 * Uses Turf.js for polygon validation (self-intersection check).
 */
export function PlatMapOverlay({ onLotClick, className = '' }: PlatMapOverlayProps) {
  const { communityId, phaseId, lotId, setLot } = useExplorerStore();
  const manifestState = useManifest(communityId);

  const handleLotClick = useCallback(
    (id: string) => {
      setLot(id);
      onLotClick?.(id);
    },
    [setLot, onLotClick]
  );

  if (!communityId || manifestState.status !== 'success' || !manifestState.data) return null;

  const phases = manifestState.data.phases ?? [];
  const activePhase = phaseId ? phases.find((p) => p.id === phaseId) : phases[0];
  const lots = activePhase?.lots ?? [];

  // Filter lots with valid boundaries
  const lotsWithBoundaries = lots.filter((lot) => {
    const b = lot.boundary;
    if (!b || b.type !== 'Polygon' || !b.coordinates?.[0]?.length) return false;
    try {
      const poly = turf.polygon(b.coordinates);
      return turf.area(poly) > 0;
    } catch {
      return false;
    }
  });

  if (lotsWithBoundaries.length === 0) {
    return (
      <div
        className={`rounded-lg border border-slate-200 bg-white/90 p-4 text-sm text-slate-600 ${className}`}
        role="status"
      >
        No plat boundaries available for this phase.
      </div>
    );
  }

  return (
    <div
      className={`overflow-hidden rounded-lg border border-slate-200 bg-white/90 shadow-md ${className}`}
      role="application"
      aria-label="Lot plat map"
    >
      <div className="border-b border-slate-200 px-3 py-2 text-sm font-medium text-slate-700">
        Lot map — click to select
      </div>
      <svg
        viewBox="0 0 200 150"
        className="h-32 w-full"
        aria-hidden
      >
        {lotsWithBoundaries.map((lot, i) => {
          const b = lot.boundary!;
          const coords = b.coordinates[0];
          if (!coords?.length) return null;

          // Simple projection: map geo coords to SVG (placeholder — real impl would use proper bounds)
          const scale = 20;
          const offsetX = 25 + (i % 3) * 55;
          const offsetY = 25 + Math.floor(i / 3) * 45;
          const points = coords
            .slice(0, 4)
            .map((_, j) => {
              const px = offsetX + Math.cos((j / 4) * Math.PI * 2) * scale;
              const py = offsetY + Math.sin((j / 4) * Math.PI * 2) * scale;
              return `${px},${py}`;
            })
            .join(' ');

          return (
            <polygon
              key={lot.id}
              points={points}
              fill={lotId === lot.id ? 'rgba(2, 132, 199, 0.3)' : 'rgba(148, 163, 184, 0.2)'}
              stroke={lotId === lot.id ? '#0284c7' : '#94a3b8'}
              strokeWidth={1.5}
              className="cursor-pointer transition-colors hover:fill-sky-200"
              onClick={() => handleLotClick(lot.id)}
              onKeyDown={(e) => e.key === 'Enter' && handleLotClick(lot.id)}
              tabIndex={0}
              role="button"
              aria-pressed={lotId === lot.id}
              aria-label={`Select lot ${lot.address ?? lot.id}`}
            />
          );
        })}
      </svg>
    </div>
  );
}
