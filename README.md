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

## Docker (Ubuntu VPS)

Üretim imajı statik dosyaları nginx ile sunar ve `/api` isteklerini backend’e (`profile-ai`) proxyler. Tarayıcı aynı origin’e gider; CORS gerekmez.

```bash
cp .env.example .env
docker compose up -d --build
```

Varsayılanlar: host `80` → container `80`, backend `http://host.docker.internal:3000` (Ubuntu’da Docker `host-gateway` ile host’taki API).

Backend başka bir container ise:

```bash
API_UPSTREAM=http://profile-ai:3000 docker compose up -d --build
```

Aynı Docker network’ünde olmaları gerekir. Port değiştirmek için `WEB_PORT=8080`.

Kontrol: `http://<sunucu>/healthz` → `ok`. Ubuntu firewall: `sudo ufw allow 80/tcp`.

## Fotoğraf

Kendi fotoğrafını `public/burak.jpg` olarak koy. Dosya yoksa baş harfler (BŞ) kullanılır.

## Mimari

`screens → hooks → services → http client`

- Tipler: `src/types`
- Env doğrulama: `src/config/env.ts`
- Hata sınıfları: `src/types/errors.ts`
- Chat: `src/services/chatService.ts`
