import { useEffect, useRef } from 'react';
import { useLoadingStore, type LoadReason } from '@/store/loading-store';
import { api } from '@/api/client';

/**
 * Simulates progressive loading for a community manifest.
 * In production, this would drive actual asset loading (models, textures, LODs).
 */
export function useManifestLoader(communityId: string | null) {
  const addItem = useLoadingStore((s) => s.addItem);
  const updateProgress = useLoadingStore((s) => s.updateProgress);
  const removeItem = useLoadingStore((s) => s.removeItem);
  const loadedRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (!communityId) return;

    const id = `manifest-${communityId}`;
    if (loadedRef.current.has(communityId)) return;
    loadedRef.current.add(communityId);

    addItem({ id, label: 'Community data', reason: 'scene' as LoadReason, progress: 0 });

    api
      .getManifest(communityId)
      .then(() => {
        updateProgress(id, 1);
        setTimeout(() => removeItem(id), 300);
      })
      .catch(() => {
        removeItem(id);
        loadedRef.current.delete(communityId);
      });
  }, [communityId, addItem, updateProgress, removeItem]);
}
