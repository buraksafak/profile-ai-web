import { motion } from 'motion/react';
import { TypingAnimation } from '@/components/ui/typing-animation';
import { cn } from '@/lib/utils';
import type { UiMessage } from '@/types/chat';

interface MessageBubbleProps {
  message: UiMessage;
  reducedMotion: boolean;
  animateTyping?: boolean;
  onTypingProgress?: () => void;
}

export function MessageBubble({
  message,
  reducedMotion,
  animateTyping = false,
  onTypingProgress,
}: MessageBubbleProps) {
  const isUser = message.role === 'user';
  const shouldType = animateTyping && !isUser && !reducedMotion;

  return (
    <motion.article
      initial={reducedMotion ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: 'easeOut' }}
      className={cn('flex w-full', isUser ? 'justify-end' : 'justify-start')}
    >
      <div
        className={cn(
          'max-w-[88%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap sm:max-w-[78%]',
          isUser
            ? 'rounded-br-md bg-cyan-400 text-slate-950'
            : 'rounded-bl-md border border-cyan-500/25 bg-sky-100/80 text-foreground dark:border-white/10 dark:bg-white/6',
        )}
      >
        {shouldType ? (
          <TypingAnimation
            startOnView={false}
            typeSpeed={24}
            charsPerTick={1}
            delay={80}
            showCursor
            blinkCursor
            cursorStyle="line"
            hideCursorOnComplete
            onProgress={onTypingProgress}
          >
            {message.content}
          </TypingAnimation>
        ) : (
          message.content
        )}
      </div>
    </motion.article>
  );
}
