import { useEffect, useCallback, useRef, useState } from 'react';
import { api } from '@/api/client';

export type AsyncState<T> =
  | { status: 'idle'; data: undefined; error: undefined }
  | { status: 'loading'; data: undefined; error: undefined }
  | { status: 'success'; data: T; error: undefined }
  | { status: 'error'; data: undefined; error: Error };

export function useCommunities() {
  const abortRef = useRef<AbortController | null>(null);
  const [state, setState] = useState<AsyncState<{ id: string; name: string; thumbnailUrl?: string; phaseCount: number; lotCount: number }[]>>({
    status: 'idle',
    data: undefined,
    error: undefined,
  });

  const fetch = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = new AbortController();
    setState({ status: 'loading', data: undefined, error: undefined });

    api
      .getCommunities({ signal: abortRef.current.signal })
      .then((res) => {
        if (res.communities == null) throw new Error('Invalid response');
        setState({ status: 'success', data: res.communities, error: undefined });
      })
      .catch((err) => {
        if (err.name === 'AbortError') return;
        setState({ status: 'error', data: undefined, error: err });
      });
  }, []);

  useEffect(() => {
    fetch();
    return () => abortRef.current?.abort();
  }, [fetch]);

  return { ...state, refetch: fetch };
}

