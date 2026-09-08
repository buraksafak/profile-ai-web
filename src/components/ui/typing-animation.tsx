import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ElementType,
  type HTMLAttributes,
} from 'react';
import { useInView } from 'motion/react';

import { cn } from '@/lib/utils';

type CursorStyle = 'line' | 'block' | 'underscore';
type Phase = 'typing' | 'pause' | 'deleting';

export interface TypingAnimationProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  children?: string;
  words?: string[];
  duration?: number;
  typeSpeed?: number;
  deleteSpeed?: number;
  delay?: number;
  pauseDelay?: number;
  loop?: boolean;
  charsPerTick?: number;
  as?: ElementType;
  startOnView?: boolean;
  showCursor?: boolean;
  blinkCursor?: boolean;
  cursorStyle?: CursorStyle;
  reducedMotion?: boolean;
  hideCursorOnComplete?: boolean;
  onProgress?: () => void;
}

function getCursorChar(cursorStyle: CursorStyle): string {
  switch (cursorStyle) {
    case 'block':
      return '▌';
    case 'underscore':
      return '_';
    case 'line':
    default:
      return '|';
  }
}

export function TypingAnimation({
  children,
  words,
  className,
  duration = 16,
  typeSpeed,
  deleteSpeed,
  delay = 0,
  pauseDelay = 1000,
  loop = false,
  charsPerTick = 1,
  as: Component = 'span',
  startOnView = true,
  showCursor = true,
  blinkCursor = true,
  cursorStyle = 'line',
  reducedMotion = false,
  hideCursorOnComplete = true,
  onProgress,
  ...props
}: TypingAnimationProps) {
  const wordsToAnimate = useMemo(
    () => words ?? (children ? [children] : []),
    [words, children],
  );
  const fullText = wordsToAnimate[0] ?? '';
  const graphemesPerWord = useMemo(
    () => wordsToAnimate.map((word) => Array.from(word)),
    [wordsToAnimate],
  );
  const [displayedText, setDisplayedText] = useState(reducedMotion ? fullText : '');
  const [isComplete, setIsComplete] = useState(reducedMotion);
  const elementRef = useRef<HTMLElement | null>(null);
  const onProgressRef = useRef(onProgress);
  const isInView = useInView(elementRef, { amount: 0.3, once: true });

  useEffect(() => {
    onProgressRef.current = onProgress;
  }, [onProgress]);

  const typingSpeed = typeSpeed ?? duration;
  const deletingSpeed = deleteSpeed ?? Math.max(8, typingSpeed / 2);
  const step = Math.max(1, charsPerTick);
  const shouldStart = reducedMotion ? false : startOnView ? isInView : true;
  const animationSourceKey = useMemo(
    () => (words ? words.join('\u0000') : (children ?? '')),
    [words, children],
  );

  useEffect(() => {
    if (reducedMotion) {
      return;
    }

    setDisplayedText('');
    setIsComplete(false);

    if (!shouldStart || graphemesPerWord.length === 0) {
      return;
    }

    let wordIndex = 0;
    let charIndex = 0;
    let phase: Phase = 'typing';
    let timeoutId = 0;
    const hasMultipleWords = graphemesPerWord.length > 1;

    const schedule = (ms: number, next: () => void): void => {
      timeoutId = window.setTimeout(next, ms);
    };

    const run = (): void => {
      const graphemes = graphemesPerWord[wordIndex] ?? [];

      if (phase === 'typing') {
        if (charIndex < graphemes.length) {
          const nextIndex = Math.min(graphemes.length, charIndex + step);
          charIndex = nextIndex;
          setDisplayedText(graphemes.slice(0, charIndex).join(''));
          onProgressRef.current?.();
          schedule(typingSpeed, run);
          return;
        }

        const isLastWord = wordIndex === graphemesPerWord.length - 1;
        if (hasMultipleWords || loop) {
          if (!isLastWord || loop) {
            phase = 'pause';
            schedule(pauseDelay, run);
            return;
          }
        }

        setIsComplete(true);
        return;
      }

      if (phase === 'pause') {
        phase = 'deleting';
        schedule(deletingSpeed, run);
        return;
      }

      if (charIndex > 0) {
        charIndex = Math.max(0, charIndex - step);
        setDisplayedText(graphemes.slice(0, charIndex).join(''));
        onProgressRef.current?.();
        schedule(deletingSpeed, run);
        return;
      }

      wordIndex = (wordIndex + 1) % graphemesPerWord.length;
      phase = 'typing';
      schedule(typingSpeed, run);
    };

    schedule(delay, run);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [
    animationSourceKey,
    delay,
    deletingSpeed,
    fullText,
    graphemesPerWord,
    loop,
    pauseDelay,
    reducedMotion,
    shouldStart,
    step,
    typingSpeed,
  ]);

  const shouldShowCursor = showCursor && !reducedMotion && (!hideCursorOnComplete || !isComplete);

  return (
    <Component
      ref={elementRef}
      className={cn(Component === 'span' && 'inline', className)}
      aria-label={fullText || undefined}
      {...props}
    >
      {reducedMotion ? fullText : displayedText}
      {shouldShowCursor ? (
        <span
          aria-hidden="true"
          className={cn('inline-block text-cyan-600 dark:text-cyan-300', blinkCursor && 'animate-blink-cursor')}
        >
          {cursorStyle === 'line' ? (
            <span className="ml-0.5 inline-block h-[0.85em] w-[2px] translate-y-[0.12em] bg-cyan-600 dark:bg-cyan-300" />
          ) : (
            getCursorChar(cursorStyle)
          )}
        </span>
      ) : null}
    </Component>
  );
}
