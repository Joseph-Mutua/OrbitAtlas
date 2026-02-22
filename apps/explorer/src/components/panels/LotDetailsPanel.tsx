import { useExplorerStore } from '@/store/explorer-store';
import { useManifest } from '@/hooks/useManifest';
import { Card, CardHeader } from '@/components/ui';
import { formatNumber, formatCurrency } from '@/utils/safeFormat';

export function LotDetailsPanel() {
  const { communityId, phaseId, lotId } = useExplorerStore();
  const manifestState = useManifest(communityId);

  if (!communityId || !phaseId || !lotId) {
    return (
      <div className="p-4 text-sm text-slate-500" role="status">
        Select a lot to view details.
      </div>
    );
  }

  if (manifestState.status !== 'success' || !manifestState.data) return null;

  const phase = manifestState.data.phases?.find((p) => p.id === phaseId);
  const lot = phase?.lots?.find((l) => l.id === lotId);

  if (!lot) return null;

  return (
    <div className="p-4">
      <Card>
        <CardHeader title={lot.address ?? `Lot ${lot.id}`} subtitle={`Phase: ${phase?.name ?? ''}`} />
        <dl className="space-y-2 text-sm">
          {lot.sqft != null && (
            <>
              <dt className="font-medium text-slate-500">Square footage</dt>
              <dd>{formatNumber(lot.sqft)} sqft</dd>
            </>
          )}
          {lot.price != null && (
            <>
              <dt className="font-medium text-slate-500">Price</dt>
              <dd>{formatCurrency(lot.price)}</dd>
            </>
          )}
          {lot.status != null && (
            <>
              <dt className="font-medium text-slate-500">Status</dt>
              <dd className="capitalize">{lot.status}</dd>
            </>
          )}
        </dl>
      </Card>
    </div>
  );
}
