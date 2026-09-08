import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
}

export function GlassPanel({ children, className }: GlassPanelProps) {
  return (
    <section
      className={cn(
        'relative flex h-full min-h-0 w-full flex-col overflow-hidden rounded-[1.75rem] border border-cyan-500/35 bg-[#e8f1f6]/80 shadow-[0_0_80px_rgba(14,116,144,0.14)] backdrop-blur-2xl dark:border-cyan-200/15 dark:bg-slate-950/55 dark:shadow-[0_0_80px_rgba(34,211,238,0.08)]',
        className,
      )}
    >
      {children}
    </section>
  );
}
