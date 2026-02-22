import { type ReactNode } from 'react';
import { useExplorerStore } from '@/store/explorer-store';

interface SlidePanelProps {
  isOpen: boolean;
  children: ReactNode;
  className?: string;
}

export function SlidePanel({ isOpen, children, className = '' }: SlidePanelProps) {
  const reduceMotion = useExplorerStore((s) => s.reduceMotion);

  return (
    <div
      className={`transform transition-transform duration-300 ease-out ${className}`}
      style={{
        transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
        transitionDuration: reduceMotion ? '0ms' : undefined,
      }}
    >
      {children}
    </div>
  );
}
