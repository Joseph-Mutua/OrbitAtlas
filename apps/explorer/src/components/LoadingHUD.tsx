import { useLoadingStore } from '@/store/loading-store';

const REASON_LABELS: Record<string, string> = {
  initial: 'Loading shell',
  scene: 'Loading scene',
  prefetch: 'Prefetching',
  lod: 'Upgrading quality',
};

export function LoadingHUD() {
  const { items, isActive } = useLoadingStore();

  if (!isActive || items.length === 0) return null;

  return (
    <div
      className="fixed bottom-4 right-4 z-50 flex max-w-sm flex-col gap-2 rounded-lg border border-slate-200 bg-white p-4 shadow-lg"
      role="status"
      aria-live="polite"
      aria-label="Loading assets"
    >
      <p className="text-sm font-medium text-slate-700">Loading…</p>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id} className="flex flex-col gap-1">
            <div className="flex justify-between text-xs text-slate-600">
              <span>{item.label}</span>
              <span>{REASON_LABELS[item.reason] ?? item.reason}</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full bg-sky-500 transition-all duration-300"
                style={{ width: `${Math.round(item.progress * 100)}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
