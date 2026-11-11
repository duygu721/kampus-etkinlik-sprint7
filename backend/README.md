# Backend — Sprint 7

Duygu Sezer · 2416501052

## Kurulum ve çalıştırma

Node.js 20+ gerekir.

```powershell
npm install
Copy-Item .env.example .env
npm run dev
```

API: `http://localhost:3000`; port `.env` içindeki `PORT` ile ayarlanır.

## REST sözleşmesi

| Method | Endpoint | Başarılı | Hata |
| --- | --- | --- | --- |
| GET | `/health` | 200; status, time, student | — |
| GET | `/events` | 200; altı etkinlik | — |
| GET | `/events?category=Atölye` | 200; kategori filtresi | — |
| GET | `/events/:id` | 200; tek etkinlik | 404 `{ "error": { "message": "Event not found" } }` |
| POST | `/events` | 201; yeni etkinlik | 400; title/category/date eksik veya capacity geçersiz |

POST gövdesinde title, category ve date zorunludur. Capacity gönderilirse 1–1000 arası tam sayı olmalıdır. Yeni kayıtların ID'si UUID tabanlıdır. Veriler bellekte tutulur ve sunucu yeniden başlayınca örnek altı kayıt yüklenir. Bilinmeyen adres 404 JSON, bozuk JSON 400 JSON döndürür.

Postman koleksiyonu: `requests/kampus-api.json` (altı istek).

`.env` ve `node_modules` repoya eklenmez; paylaşılabilir ayarlar `.env.example` içindedir.
