import { useExplorerStore } from '@/store/explorer-store';
import { useManifest } from '@/hooks/useManifest';

export function LotPicker() {
  const { communityId, phaseId, lotId, setLot } = useExplorerStore();
  const manifestState = useManifest(communityId);

  if (!communityId || !phaseId) return null;
  if (manifestState.status !== 'success' || !manifestState.data) return null;

  const phase = manifestState.data.phases?.find((p) => p.id === phaseId);
  const lots = phase?.lots ?? [];

  if (lots.length === 0) {
    return (
      <div className="p-4 text-sm text-slate-600" role="status">
        No lots in this phase.
      </div>
    );
  }

  return (
    <div className="space-y-2 p-4" role="listbox" aria-label="Select lot">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Lot</h3>
      <ul className="flex flex-col gap-1">
        {lots.map((lot) => (
          <li key={lot.id}>
            <button
              type="button"
              onClick={() => setLot(lot.id)}
              aria-selected={lotId === lot.id}
              role="option"
              className={`w-full rounded-md border px-4 py-2 text-left text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 ${
                lotId === lot.id
                  ? 'border-sky-500 bg-sky-50 text-sky-900'
                  : 'border-slate-200 bg-white hover:bg-slate-50'
              }`}
            >
              {lot.address ?? `Lot ${lot.id}`}
              {lot.sqft != null && <span className="ml-2 text-slate-500">{lot.sqft} sqft</span>}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
