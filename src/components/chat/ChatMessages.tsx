import { useCallback, useEffect, useRef } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageBubble } from '@/components/chat/MessageBubble';
import { TypingIndicator } from '@/components/chat/TypingIndicator';
import { TypingAnimation } from '@/components/ui/typing-animation';
import type { UiMessage } from '@/types/chat';

const WELCOME_MESSAGE =
  "Merhaba. Burak'ın dijital asistanıyım. Kariyeri, yetkinlikleri veya iletişim hakkında sorabilirsin.";

interface ChatMessagesProps {
  messages: UiMessage[];
  isSending: boolean;
  reducedMotion: boolean;
}

export function ChatMessages({ messages, isSending, reducedMotion }: ChatMessagesProps) {
  const endRef = useRef<HTMLDivElement>(null);
  const latestMessage = messages.at(-1);

  const scrollToEnd = useCallback(
    (smooth: boolean): void => {
      endRef.current?.scrollIntoView({
        behavior: smooth && !reducedMotion ? 'smooth' : 'auto',
        block: 'end',
      });
    },
    [reducedMotion],
  );

  useEffect(() => {
    scrollToEnd(true);
  }, [messages, isSending, scrollToEnd]);

  if (messages.length === 0 && !isSending) {
    return (
      <div className="flex min-h-0 flex-1 flex-col items-center justify-center px-6 text-center">
        <TypingAnimation
          as="p"
          className="max-w-md text-sm leading-relaxed tracking-normal text-muted-foreground sm:text-base"
          typeSpeed={22}
          charsPerTick={1}
          delay={140}
          startOnView={false}
          reducedMotion={reducedMotion}
          showCursor
          blinkCursor
          hideCursorOnComplete={false}
        >
          {WELCOME_MESSAGE}
        </TypingAnimation>
      </div>
    );
  }

  return (
    <ScrollArea className="h-full min-h-0 flex-1">
      <div className="flex flex-col gap-3 px-4 py-4 sm:px-6">
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
            reducedMotion={reducedMotion}
            animateTyping={message.id === latestMessage?.id && latestMessage.role === 'assistant'}
            onTypingProgress={() => scrollToEnd(false)}
          />
        ))}
        {isSending ? <TypingIndicator reducedMotion={reducedMotion} /> : null}
        <div ref={endRef} />
      </div>
    </ScrollArea>
  );
}
