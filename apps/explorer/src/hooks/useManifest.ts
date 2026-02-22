import { useEffect, useCallback, useRef, useState } from 'react';
import { api } from '@/api/client';
import type { CommunityManifest } from '@community-explorer/shared';

export type AsyncState<T> =
  | { status: 'idle'; data: undefined; error: undefined }
  | { status: 'loading'; data: undefined; error: undefined }
  | { status: 'success'; data: T; error: undefined }
  | { status: 'error'; data: undefined; error: Error };

export function useManifest(communityId: string | null) {
  const abortRef = useRef<AbortController | null>(null);
  const [state, setState] = useState<AsyncState<CommunityManifest>>({
    status: 'idle',
    data: undefined,
    error: undefined,
  });

  const fetch = useCallback((id: string) => {
    abortRef.current?.abort();
    abortRef.current = new AbortController();
    setState({ status: 'loading', data: undefined, error: undefined });

    api
      .getManifest(id, { signal: abortRef.current.signal })
      .then((res) => {
        if (res.manifest == null) throw new Error('Invalid manifest response');
        setState({ status: 'success', data: res.manifest, error: undefined });
      })
      .catch((err) => {
        if (err.name === 'AbortError') return;
        setState({ status: 'error', data: undefined, error: err });
      });
  }, []);

  useEffect(() => {
    if (communityId) fetch(communityId);
    else setState({ status: 'idle', data: undefined, error: undefined });
    return () => abortRef.current?.abort();
  }, [communityId, fetch]);

  return state;
}
