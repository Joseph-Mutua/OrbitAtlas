import { useExplorerStore } from '@/store/explorer-store';
import { Card, CardHeader } from '@/components/ui';

const SAMPLE_AMENITIES = [
  { name: 'Community pool', distance: '0.3 mi' },
  { name: 'Clubhouse', distance: '0.2 mi' },
  { name: 'Walking trail', distance: '0.1 mi' },
  { name: 'Park', distance: '0.5 mi' },
];

export function NearbyAmenitiesPanel() {
  const { lotId } = useExplorerStore();

  if (!lotId) {
    return (
      <div className="p-4 text-sm text-slate-500" role="status">
        Select a lot to see nearby amenities.
      </div>
    );
  }

  return (
    <div className="p-4">
      <Card>
        <CardHeader title="Nearby amenities" subtitle="Distances from selected lot" />
        <ul className="space-y-3 text-sm">
          {SAMPLE_AMENITIES.map((a) => (
            <li key={a.name} className="flex items-center justify-between">
              <span>{a.name}</span>
              <span className="text-slate-500">{a.distance}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
