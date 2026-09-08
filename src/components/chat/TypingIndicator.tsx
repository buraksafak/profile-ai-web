import { motion } from 'motion/react';

interface TypingIndicatorProps {
  reducedMotion: boolean;
}

export function TypingIndicator({ reducedMotion }: TypingIndicatorProps) {
  return (
    <div className="flex justify-start" aria-live="polite" aria-label="Asistan yazıyor">
      <div className="flex items-center gap-1 rounded-2xl rounded-bl-md border border-cyan-500/25 bg-sky-100/80 px-3 py-2.5 dark:border-white/10 dark:bg-white/6">
        {[0, 1, 2].map((index) => (
          <motion.span
            key={index}
            className="size-1.5 rounded-full bg-cyan-600/80 dark:bg-cyan-200/80"
            animate={reducedMotion ? { opacity: 0.6 } : { y: [0, -3, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 0.7, repeat: Infinity, delay: index * 0.12 }}
          />
        ))}
      </div>
    </div>
  );
}
