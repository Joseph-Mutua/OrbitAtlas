import { useEffect } from 'react';
import { useExplorerStore } from '@/store/explorer-store';

export function useReduceMotionSync() {
  const setReduceMotion = useExplorerStore((s) => s.setReduceMotion);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = () => setReduceMotion(mq.matches);
    handler();
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [setReduceMotion]);
}
