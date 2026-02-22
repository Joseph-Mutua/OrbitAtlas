import { useEffect, useRef } from 'react';
import { ThreeViewer } from '@/viewer/ThreeViewer';
import { PanoramaViewer } from '@/viewer/PanoramaViewer';
import { useReduceMotionSync } from '@/hooks/useReduceMotion';
import { useManifestLoader } from '@/hooks/useManifestLoader';
import { useManifest } from '@/hooks/useManifest';
import { useExplorerStore } from '@/store/explorer-store';
import { CommunityPicker } from '@/components/CommunityPicker';
import { PhasePicker } from '@/components/PhasePicker';
import { LotPicker } from '@/components/LotPicker';
import { PANEL_REGISTRY } from '@/components/panels';
import { PlatMapOverlay } from '@/components/PlatMapOverlay';
import { PanoWalkNav } from '@/components/PanoWalkNav';
import { Button } from '@/components/ui';
import type { ViewerAdapter } from '@/viewer/viewer-adapter';

const PANEL_IDS = ['lotDetails', 'streetTour', 'amenities'] as const;

export function ViewerShell() {
  useReduceMotionSync();
  const {
    communityId,
    phaseId,
    lotId,
    activePanel,
    activePanoNodeId,
    setActivePanel,
    setActivePanoNode,
    reduceMotion,
  } = useExplorerStore();
  useManifestLoader(communityId);
  const manifestState = useManifest(communityId);
  const adapterRef = useRef<ViewerAdapter | null>(null);

  const sceneId = phaseId ? `phase-${phaseId}` : null;
  const manifest = manifestState.status === 'success' ? manifestState.data : null;
  const phase = manifest?.phases?.find((p) => p.id === phaseId);
  const lot = phase?.lots?.find((l) => l.id === lotId);
  const lotPanoIds = lot?.panoNodeIds ?? [];
  const panoNodes = manifest?.panoNodes ?? [];
  const lotPanoNodes = lotPanoIds
    .map((id) => panoNodes.find((n) => n.id === id))
    .filter(Boolean) as NonNullable<typeof panoNodes>[number][];
  const currentPanoNode = activePanoNodeId
    ? panoNodes.find((n) => n.id === activePanoNodeId)
    : null;

  // When Street Tour is active and lot has pano nodes, set first node if none selected
  useEffect(() => {
    if (activePanel !== 'streetTour' || lotPanoNodes.length === 0) return;
    if (!activePanoNodeId || !lotPanoIds.includes(activePanoNodeId)) {
      setActivePanoNode(lotPanoIds[0] ?? null);
    }
  }, [activePanel, lotPanoIds, lotPanoNodes.length, activePanoNodeId, setActivePanoNode]);

  const isStreetTour = activePanel === 'streetTour' && currentPanoNode;

  const ActivePanelComponent = activePanel ? PANEL_REGISTRY[activePanel]?.component : null;

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden">
      <header className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 py-3">
        <h1 className="font-display text-xl font-semibold text-slate-900">Community Explorer</h1>
        <nav className="flex gap-2" aria-label="Panel tabs">
          {PANEL_IDS.map((id) => {
            const reg = PANEL_REGISTRY[id];
            if (!reg) return null;
            return (
              <Button
                key={id}
                variant={activePanel === id ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setActivePanel(activePanel === id ? null : id)}
                aria-pressed={activePanel === id}
              >
                {reg.label}
              </Button>
            );
          })}
        </nav>
      </header>

      <div className="flex flex-1 min-h-0">
        <aside className="flex w-64 shrink-0 flex-col overflow-y-auto border-r border-slate-200 bg-slate-50">
          <CommunityPicker />
          <PhasePicker />
          <LotPicker />
        </aside>

        <main id="main-content" className="relative flex flex-1 min-w-0" tabIndex={-1}>
          <div className="relative flex-1 min-w-0">
            {isStreetTour ? (
              <PanoramaViewer url={currentPanoNode.url} />
            ) : (
              <ThreeViewer
                adapterRef={adapterRef}
                sceneId={sceneId}
                lotId={lotId}
                reduceMotion={reduceMotion}
              />
            )}
            {!isStreetTour && (
              <div className="absolute bottom-4 left-4 w-56">
                <PlatMapOverlay />
              </div>
            )}
            {isStreetTour && currentPanoNode && (
              <PanoWalkNav
                currentNode={currentPanoNode}
                nodes={panoNodes}
                onSelectNode={(node) => setActivePanoNode(node.id)}
              />
            )}
          </div>

          {activePanel && ActivePanelComponent && (
            <aside
              className="flex w-80 shrink-0 flex-col overflow-y-auto border-l border-slate-200 bg-white shadow-lg"
              aria-label={`${PANEL_REGISTRY[activePanel]?.label ?? activePanel} panel`}
            >
              <ActivePanelComponent />
            </aside>
          )}
        </main>
      </div>
    </div>
  );
}
