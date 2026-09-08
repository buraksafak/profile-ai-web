import { apiRequest } from '@/lib/http';
import { chatMessageSchema } from '@/lib/schemas';
import { ValidationError } from '@/types/errors';
import type { ChatResponseDto } from '@/types/chat';

class ChatService {
  async sendMessage(rawMessage: string): Promise<ChatResponseDto> {
    const parsed = chatMessageSchema.safeParse({ message: rawMessage });

    if (!parsed.success) {
      throw new ValidationError('Invalid request', parsed.error.issues);
    }

    return apiRequest<ChatResponseDto>('/api/chat', {
      method: 'POST',
      body: parsed.data,
    });
  }
}

export const chatService = new ChatService();
