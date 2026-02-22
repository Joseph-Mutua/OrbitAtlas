import { useExplorerStore } from '@/store/explorer-store';
import { useManifest } from '@/hooks/useManifest';

export function PhasePicker() {
  const { communityId, phaseId, setPhase } = useExplorerStore();
  const manifestState = useManifest(communityId);

  if (!communityId) return null;
  if (manifestState.status !== 'success' || !manifestState.data) return null;

  const phases = manifestState.data.phases ?? [];

  if (phases.length === 0) {
    return (
      <div className="p-4 text-sm text-slate-600" role="status">
        No phases in this community.
      </div>
    );
  }

  return (
    <div className="space-y-2 p-4" role="listbox" aria-label="Select phase">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Phase</h3>
      <ul className="flex flex-col gap-1">
        {phases.map((p) => (
          <li key={p.id}>
            <button
              type="button"
              onClick={() => setPhase(p.id)}
              aria-selected={phaseId === p.id}
              role="option"
              className={`w-full rounded-md border px-4 py-2 text-left text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 ${
                phaseId === p.id
                  ? 'border-sky-500 bg-sky-50 text-sky-900'
                  : 'border-slate-200 bg-white hover:bg-slate-50'
              }`}
            >
              {p.name} <span className="text-slate-500">({p.lots?.length ?? 0} lots)</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
