import { env } from '@/config/env';
import { createRequestId } from '@/lib/http';
import { NetworkError } from '@/types/errors';
import type { FullHealthStatus } from '@/types/health';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isFullHealthStatus(value: unknown): value is FullHealthStatus {
  if (!isRecord(value) || (value.status !== 'ok' && value.status !== 'degraded')) {
    return false;
  }

  if (!isRecord(value.server) || !isRecord(value.database)) {
    return false;
  }

  return value.database.status === 'up' || value.database.status === 'down';
}

class HealthService {
  async getStatus(): Promise<FullHealthStatus> {
    let response: Response;

    try {
      response = await fetch(`${env.VITE_API_URL}/api/health`, {
        credentials: 'include',
        headers: { 'x-request-id': createRequestId() },
      });
    } catch {
      throw new NetworkError('Sunucuya ulaşılamadı. Lütfen bağlantını kontrol et.');
    }

    const json: unknown = await response.json();

    if (isRecord(json) && isFullHealthStatus(json.data)) {
      return json.data;
    }

    throw new NetworkError('Sağlık durumu okunamadı.');
  }
}

export const healthService = new HealthService();
