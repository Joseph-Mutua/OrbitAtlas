import { type ReactNode } from 'react';
import { useExplorerStore } from '@/store/explorer-store';

interface CrossfadeProps {
  children: ReactNode;
  className?: string;
}

export function Crossfade({ children, className = '' }: CrossfadeProps) {
  const reduceMotion = useExplorerStore((s) => s.reduceMotion);

  return (
    <div
      className={`transition-opacity duration-300 ${className}`}
      style={{
        transitionDuration: reduceMotion ? '0ms' : undefined,
      }}
    >
      {children}
    </div>
  );
}
