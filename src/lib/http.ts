import type { ApiErrorBody, ApiErrorPayload, ApiSuccess } from '@/types/api';
import {
  AppError,
  ExternalServiceError,
  NetworkError,
  NotFoundError,
  TooManyRequestsError,
  UnauthorizedError,
  ValidationError,
} from '@/types/errors';
import { env } from '@/config/env';
import { createId } from '@/lib/id';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

export function isApiSuccess<T>(value: unknown): value is ApiSuccess<T> {
  return isRecord(value) && value.success === true && 'data' in value;
}

export function isApiErrorBody(value: unknown): value is ApiErrorBody {
  return (
    isRecord(value) &&
    value.success === false &&
    isRecord(value.error) &&
    typeof value.error.code === 'string' &&
    typeof value.error.message === 'string'
  );
}

export function createRequestId(): string {
  return createId();
}

function mapApiError(status: number, payload: ApiErrorPayload): AppError {
  switch (payload.code) {
    case 'VALIDATION_ERROR':
      return new ValidationError(payload.message, payload.details);
    case 'UNAUTHORIZED':
      return new UnauthorizedError(payload.message);
    case 'NOT_FOUND':
      return new NotFoundError(payload.message);
    case 'RATE_LIMIT_EXCEEDED':
      return new TooManyRequestsError(payload.message);
    case 'EXTERNAL_SERVICE_ERROR':
    case 'GEMINI_NOT_CONFIGURED':
      return new ExternalServiceError(payload.message, payload.details);
    default:
      return new AppError(status, payload.message, payload.code, payload.details);
  }
}

interface RequestOptions extends Omit<RequestInit, 'body'> {
  body?: unknown;
}

export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const requestId = createRequestId();
  const headers = new Headers(options.headers);
  headers.set('x-request-id', requestId);

  if (options.body !== undefined && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  let response: Response;

  try {
    response = await fetch(`${env.VITE_API_URL}${path}`, {
      ...options,
      headers,
      credentials: 'include',
      body: options.body === undefined ? undefined : JSON.stringify(options.body),
    });
  } catch {
    throw new NetworkError('Sunucuya ulaşılamadı. Lütfen bağlantını kontrol et.');
  }

  let json: unknown;

  try {
    json = await response.json();
  } catch {
    throw new AppError(
      response.status,
      'Beklenmeyen bir yanıt alındı.',
      'INVALID_JSON',
    );
  }

  if (isApiErrorBody(json)) {
    throw mapApiError(response.status, json.error);
  }

  if (!isApiSuccess<T>(json)) {
    throw new AppError(
      response.status,
      'Beklenmeyen bir yanıt alındı.',
      'INTERNAL_SERVER_ERROR',
    );
  }

  if (!response.ok) {
    throw new AppError(response.status, 'İstek başarısız oldu.', 'INTERNAL_SERVER_ERROR');
  }

  return json.data;
}
