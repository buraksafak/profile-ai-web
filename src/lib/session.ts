import { createId } from '@/lib/id';

const STORAGE_KEY = 'profile-ai.chat.sessionId';

function isValidSessionId(value: string): boolean {
  return value.length >= 8 && value.length <= 80;
}

export function getChatSessionId(): string {
  try {
    const existing = localStorage.getItem(STORAGE_KEY)?.trim() ?? '';
    if (isValidSessionId(existing)) {
      return existing;
    }

    const created = createId();
    localStorage.setItem(STORAGE_KEY, created);
    return created;
  } catch {
    return createId();
  }
}
