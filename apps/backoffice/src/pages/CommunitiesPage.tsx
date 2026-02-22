import { useEffect, useState } from 'react';
import { API_BASE } from '@/api/config';

interface Community {
  id: string;
  name: string;
  phaseCount: number;
  lotCount: number;
}

export function CommunitiesPage() {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${API_BASE}/communities`)
      .then((r) => r.json())
      .then((data) => {
        setCommunities(data.communities ?? []);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-slate-600">Loading…</p>;
  if (error) return <p className="text-rose-600">Error: {error}</p>;

  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold">Communities</h2>
      <ul className="space-y-2">
        {communities.map((c) => (
          <li
            key={c.id}
            className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
          >
            <span className="font-medium">{c.name}</span>
            <span className="ml-2 text-sm text-slate-500">
              {c.phaseCount} phases, {c.lotCount} lots
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
