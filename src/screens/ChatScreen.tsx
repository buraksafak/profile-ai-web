import { BorderBeam } from '@/components/ui/border-beam';
import { CodeBackground } from '@/components/background/CodeBackground';
import { ChatError } from '@/components/chat/ChatError';
import { ChatHeader } from '@/components/chat/ChatHeader';
import { ChatInput } from '@/components/chat/ChatInput';
import { ChatMessages } from '@/components/chat/ChatMessages';
import { SuggestionChips } from '@/components/chat/SuggestionChips';
import { GlassPanel } from '@/components/layout/GlassPanel';
import { useChat } from '@/hooks/useChat';
import { useHealthStatus } from '@/hooks/useHealthStatus';
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery';
import { useTheme } from '@/hooks/useTheme';

export function ChatScreen() {
  const { messages, isSending, error, sendMessage } = useChat();
  const health = useHealthStatus();
  const reducedMotion = usePrefersReducedMotion();
  const { theme } = useTheme();
  const showSuggestions = messages.length === 0 && !isSending;
  const isDark = theme === 'dark';

  return (
    <main className="relative min-h-dvh overflow-hidden">
      <CodeBackground />

      <div className="relative z-10 mx-auto flex min-h-dvh w-full max-w-3xl items-stretch p-0 sm:items-center sm:p-6 lg:max-w-4xl lg:p-10">
        <div className="relative h-dvh w-full sm:h-[min(860px,calc(100dvh-3.5rem))]">
          <GlassPanel className="h-full rounded-none border-0 sm:rounded-[1.75rem] sm:border">
            <BorderBeam
              size={reducedMotion ? 0 : 140}
              duration={8}
              colorFrom={isDark ? '#67e8f9' : '#0284c7'}
              colorTo={isDark ? '#22d3ee' : '#2563eb'}
              borderWidth={isDark ? 1 : 1.5}
            />
            <ChatHeader health={health} reducedMotion={reducedMotion} />
            <div className="flex min-h-0 flex-1 flex-col">
              <ChatMessages
                messages={messages}
                isSending={isSending}
                reducedMotion={reducedMotion}
              />
            </div>
            <ChatError message={error} />
            {showSuggestions ? (
              <SuggestionChips disabled={isSending} onSelect={(question) => void sendMessage(question)} />
            ) : null}
            <ChatInput disabled={isSending} onSend={(message) => void sendMessage(message)} />
          </GlassPanel>
        </div>
      </div>
    </main>
  );
}
