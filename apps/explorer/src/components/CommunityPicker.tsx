import { useExplorerStore } from '@/store/explorer-store';
import { useCommunities } from '@/hooks/useCommunities';
import { Button } from '@/components/ui';

interface Community {
  id: string;
  name: string;
  thumbnailUrl?: string;
  phaseCount: number;
  lotCount: number;
}

export function CommunityPicker() {
  const { communityId, setCommunity } = useExplorerStore();
  const { status, data, error, refetch } = useCommunities();

  if (status === 'loading') {
    return (
      <div className="flex items-center gap-2 p-4 text-slate-600" role="status" aria-live="polite">
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-sky-500 border-t-transparent" />
        Loading communities…
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="rounded-lg border border-rose-200 bg-rose-50 p-4" role="alert">
        <p className="font-medium text-rose-800">Failed to load communities</p>
        <p className="mt-1 text-sm text-rose-700">{error?.message ?? 'Unknown error'}</p>
        <Button variant="secondary" size="sm" className="mt-3" onClick={refetch}>
          Retry
        </Button>
      </div>
    );
  }

  const communities = data ?? [];

  if (communities.length === 0) {
    return (
      <div className="p-4 text-slate-600" role="status">
        No communities available.
      </div>
    );
  }

  return (
    <div className="space-y-2 p-4" role="listbox" aria-label="Select community">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Community</h3>
      <ul className="flex flex-col gap-1">
        {communities.map((c: Community) => (
          <li key={c.id}>
            <button
              type="button"
              onClick={() => setCommunity(c.id)}
              aria-selected={communityId === c.id}
              role="option"
              className={`w-full rounded-md border px-4 py-3 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 ${
                communityId === c.id
                  ? 'border-sky-500 bg-sky-50 text-sky-900'
                  : 'border-slate-200 bg-white hover:bg-slate-50'
              }`}
            >
              <span className="font-medium">{c.name}</span>
              <span className="ml-2 text-sm text-slate-500">
                {c.phaseCount} phases, {c.lotCount} lots
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
