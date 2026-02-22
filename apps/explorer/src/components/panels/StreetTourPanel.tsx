import { useExplorerStore } from '@/store/explorer-store';
import { useManifest } from '@/hooks/useManifest';
import { Card, CardHeader } from '@/components/ui';

export function StreetTourPanel() {
  const { communityId, phaseId, lotId } = useExplorerStore();
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
  const panoNodes = lot.panoNodeIds ?? [];

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
            {panoNodes.map((id) => (
              <li key={id} className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-sky-500" aria-hidden />
                Node {id}
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
