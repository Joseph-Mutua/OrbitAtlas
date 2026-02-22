import { useRef } from 'react';
import { ThreeViewer } from '@/viewer/ThreeViewer';
import { useReduceMotionSync } from '@/hooks/useReduceMotion';
import { useManifestLoader } from '@/hooks/useManifestLoader';
import { useExplorerStore } from '@/store/explorer-store';
import { CommunityPicker } from '@/components/CommunityPicker';
import { PhasePicker } from '@/components/PhasePicker';
import { LotPicker } from '@/components/LotPicker';
import { PANEL_REGISTRY } from '@/components/panels';
import { PlatMapOverlay } from '@/components/PlatMapOverlay';
import { Button } from '@/components/ui';
import type { ViewerAdapter } from '@/viewer/viewer-adapter';

const PANEL_IDS = ['lotDetails', 'streetTour', 'amenities'] as const;

export function ViewerShell() {
  useReduceMotionSync();
  const { communityId, phaseId, lotId, activePanel, setActivePanel, reduceMotion } =
    useExplorerStore();
  useManifestLoader(communityId);
  const adapterRef = useRef<ViewerAdapter | null>(null);

  const sceneId = phaseId ? `phase-${phaseId}` : null;

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
            <ThreeViewer
              adapterRef={adapterRef}
              sceneId={sceneId}
              lotId={lotId}
              reduceMotion={reduceMotion}
            />
            <div className="absolute bottom-4 left-4 w-56">
              <PlatMapOverlay />
            </div>
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
