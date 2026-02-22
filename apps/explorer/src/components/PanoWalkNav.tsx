import type { PanoNode, PanoNodeId } from '@community-explorer/shared';
import { Button } from '@/components/ui';

export interface PanoWalkNavProps {
  /** Current panorama node. */
  currentNode: PanoNode;
  /** All available pano nodes (to resolve neighbor IDs). */
  nodes: PanoNode[];
  /** Callback when user selects a neighboring node. */
  onSelectNode: (node: PanoNode) => void;
  /** Optional class name for the container. */
  className?: string;
}

export function PanoWalkNav({ currentNode, nodes, onSelectNode, className = '' }: PanoWalkNavProps) {
  const neighborIds = currentNode.neighbors ?? [];
  const neighbors = neighborIds
    .map((id) => nodes.find((n) => n.id === id))
    .filter((n): n is PanoNode => n != null);

  if (neighbors.length === 0) return null;

  return (
    <div
      className={`absolute bottom-4 right-4 flex flex-col gap-2 rounded-lg bg-white/90 px-3 py-2 shadow-md backdrop-blur-sm ${className}`}
      role="navigation"
      aria-label="Walk to nearby street view"
    >
      <span className="text-xs font-medium text-slate-600">Walk to</span>
      <div className="flex flex-wrap gap-2">
        {neighbors.map((node) => (
          <Button
            key={node.id}
            variant="secondary"
            size="sm"
            onClick={() => onSelectNode(node)}
            aria-label={`Go to panorama ${node.id}`}
          >
            <span className="inline-flex items-center gap-1.5" aria-hidden>
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
              Node {node.id}
            </span>
          </Button>
        ))}
      </div>
    </div>
  );
}
