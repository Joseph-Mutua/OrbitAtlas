import { useExplorerStore } from '@/store/explorer-store';
import { useManifest } from '@/hooks/useManifest';
import { Card, CardHeader } from '@/components/ui';
import { Button } from '@/components/ui';

export function StreetTourPanel() {
  const { communityId, phaseId, lotId, activePanoNodeId, setActivePanoNode } = useExplorerStore();
  const manifestState = useManifest(communityId);

  if (!communityId || !phaseId || !lotId) {
    return (
      <div className="p-4 text-sm text-slate-500" role="status">
        Select a lot to view street-level tour.
      </div>
    );
  }

  if (manifestState.status !== 'success' || !manifestState.data) return null;

  const phase = manifestState.data.phases?.find((p) => p.id === phaseId);
  const lot = phase?.lots?.find((l) => l.id === lotId);

  if (!lot) return null;

  const panoIds = lot.panoNodeIds ?? [];
  const panoNodes = (manifestState.data.panoNodes ?? []).filter((n) => panoIds.includes(n.id));

  return (
    <div className="p-4">
      <Card>
        <CardHeader
          title="Street-level tour"
          subtitle={`${panoNodes.length} panorama node(s) at this lot`}
        />
        {panoNodes.length === 0 ? (
          <p className="text-sm text-slate-600">No panorama nodes available yet.</p>
        ) : (
          <ul className="space-y-2 text-sm">
            {panoNodes.map((node) => (
              <li key={node.id} className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-2">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      activePanoNodeId === node.id ? 'bg-sky-600' : 'bg-slate-300'
                    }`}
                    aria-hidden
                  />
                  Node {node.id}
                </span>
                <Button
                  variant={activePanoNodeId === node.id ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setActivePanoNode(node.id)}
                  aria-pressed={activePanoNodeId === node.id}
                >
                  {activePanoNodeId === node.id ? 'Viewing' : 'View'}
                </Button>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
