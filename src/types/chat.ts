export interface ChatRequestBody {
  message: string;
}

export interface ChatResponseDto {
  id: string | null;
  reply: string;
  model: string;
  responseTimeMs: number;
  persisted: boolean;
  createdAt: string | null;
}

export type ChatRole = 'user' | 'assistant';

export interface UiMessage {
  id: string;
  role: ChatRole;
  content: string;
  createdAt: string;
  persisted?: boolean;
}
