import { AppError, NetworkError, TooManyRequestsError, ValidationError } from '@/types/errors';

export function getUserFacingMessage(error: unknown): string {
  if (error instanceof ValidationError) {
    return 'Mesaj 2 ile 1000 karakter arasında olmalı.';
  }

  if (error instanceof TooManyRequestsError) {
    return 'Çok fazla mesaj gönderildi. Lütfen birkaç dakika sonra tekrar dene.';
  }

  if (error instanceof NetworkError) {
    return error.message;
  }

  if (error instanceof AppError) {
    if (error.code === 'GEMINI_NOT_CONFIGURED' || error.code === 'EXTERNAL_SERVICE_ERROR') {
      return 'Asistan şu anda yanıt veremiyor. Lütfen biraz sonra tekrar dene.';
    }

    if (error.isOperational && error.statusCode < 500) {
      return error.message;
    }
  }

  return 'Bir şeyler ters gitti. Lütfen tekrar dene.';
}
