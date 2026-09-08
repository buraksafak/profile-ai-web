import { useCallback, useRef, useState } from 'react';
import { getUserFacingMessage } from '@/lib/error-messages';
import { chatService } from '@/services/chatService';
import type { UiMessage } from '@/types/chat';

interface UseChatResult {
  messages: UiMessage[];
  isSending: boolean;
  error: string | null;
  sendMessage: (rawMessage: string) => Promise<void>;
  clearError: () => void;
}

function createId(): string {
  return crypto.randomUUID();
}

export function useChat(): UseChatResult {
  const [messages, setMessages] = useState<UiMessage[]>([]);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const sendingRef = useRef(false);

  const clearError = useCallback((): void => {
    setError(null);
  }, []);

  const sendMessage = useCallback(async (rawMessage: string): Promise<void> => {
    if (sendingRef.current) {
      return;
    }

    sendingRef.current = true;
    setError(null);

    const userMessage: UiMessage = {
      id: createId(),
      role: 'user',
      content: rawMessage.trim(),
      createdAt: new Date().toISOString(),
    };

    setMessages((current) => [...current, userMessage]);
    setIsSending(true);

    try {
      const result = await chatService.sendMessage(rawMessage);
      const assistantMessage: UiMessage = {
        id: result.id ?? createId(),
        role: 'assistant',
        content: result.reply,
        createdAt: result.createdAt ?? new Date().toISOString(),
        persisted: result.persisted,
      };

      setMessages((current) => [...current, assistantMessage]);
    } catch (caught) {
      setError(getUserFacingMessage(caught));
    } finally {
      sendingRef.current = false;
      setIsSending(false);
    }
  }, []);

  return {
    messages,
    isSending,
    error,
    sendMessage,
    clearError,
  };
}
