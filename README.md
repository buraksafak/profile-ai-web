# Profile Web

Burak Şafak’ın dijital asistanı için tek ekranlı React arayüzü. Backend: `profile-ai` (`POST /api/chat`).

## Çalıştırma

```bash
cp .env.example .env
npm install
npm run dev
```

Uygulama: `http://localhost:5173`

Backend’in `http://localhost:3000` üzerinde çalışması ve CORS’ta `http://localhost:5173` açık olması gerekir (`profile-ai` `.env`: `CORS_ORIGIN=http://localhost:5173,http://localhost:3000`). CORS değişince API sürecini yeniden başlat.

## Fotoğraf

Kendi fotoğrafını `public/burak.jpg` olarak koy. Dosya yoksa baş harfler (BŞ) kullanılır.

## Mimari

`screens → hooks → services → http client`

- Tipler: `src/types`
- Env doğrulama: `src/config/env.ts`
- Hata sınıfları: `src/types/errors.ts`
- Chat: `src/services/chatService.ts`
