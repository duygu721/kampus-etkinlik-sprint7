# Kampüs Etkinlikleri — Sprint 7 Backend

Duygu Sezer · 2416501052

Frontend Sprint 6 uygulaması `frontend/` içinde korunmuştur. Sprint 7, yanına çalışan Express REST API ekler.

## Backend'i çalıştırma

Node.js 20 veya üstü gerekir.

```sh
cd backend
npm install
Copy-Item .env.example .env
npm run dev
```

Sunucu `http://localhost:3000` adresinde başlar. Ortam değişkeni `PORT` ile port değiştirilebilir.

## API sözleşmesi

| Method | Endpoint | Başarılı yanıt | Hata |
| --- | --- | --- | --- |
| GET | `/health` | 200; `status`, `time`, `student` | — |
| GET | `/events` | 200; 6 etkinlik | — |
| GET | `/events?category=Atölye` | 200; filtrelenmiş dizi | — |
| GET | `/events/:id` | 200; etkinlik | 404 `{ "error": { "message": "Event not found" } }` |
| POST | `/events` | 201; oluşturulan kayıt | 400; `title`, `category` veya `date` eksik/geçersiz |

POST için `title`, `category` ve `date` zorunludur. `capacity` gönderilirse 1–1000 arasında tam sayı olmalıdır. Yeni kayıtlara çakışmayan UUID tabanlı kimlik verilir. Geçersiz JSON gövdesi 400, fazla büyük gövde 413 ve bilinmeyen adres 404 JSON hata yanıtı döndürür.

Etkinlik kayıtları bellek içindedir; sunucu yeniden başladığında altı başlangıç kaydı yüklenir. POST ile eklenen kayıtlar sunucu açık kaldığı sürece listeye eklenir. Veritabanı Sprint 8 kapsamındadır.

Örnek POST gövdesi:

```json
{
  "title": "Git Atölyesi",
  "category": "Atölye",
  "date": "2026-12-01",
  "time": "14:00",
  "location": "Lab 1",
  "capacity": 30,
  "description": "Git temelleri"
}
```

Postman'de `backend/requests/kampus-api.postman_collection.json` koleksiyonunu içe aktar. Altı istek health, liste, event-2, 404, başarılı POST ve eksik alanla 400 yanıtını kapsar.

## Frontend

```sh
cd frontend
npm install
npm run dev
```

Frontend bu sprintte backend'e bağlanmaz; bağlantı sonraki sprinttir. API CORS isteklerine açıktır.

## Depo temizliği

`backend/.env` ve `node_modules` Git'e eklenmez. Paylaşılacak değişkenler `backend/.env.example` içindedir.
