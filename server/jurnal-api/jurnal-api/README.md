# Jurnal FoodWise API

REST API untuk sistem jurnal pengelolaan sisa makanan. User mencatat aktivitas harian (masak/makan), metode pengolahan sisa makanan (kompos, bokashi, eco-enzyme), dan mendapatkan **15 poin** untuk setiap jurnal yang di-submit.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: SQLite (via Sequelize ORM)
- **Authentication**: JWT (JSON Web Token)
- **Password Hashing**: bcryptjs
- **Validation**: express-validator

## Instalasi & Menjalankan

### 1. Install Dependencies

```bash
npm install
```

### 2. Konfigurasi Environment

Salin file `.env.example` menjadi `.env`, lalu sesuaikan jika perlu:

```bash
cp .env.example .env
```

Isi default `.env`:

```
PORT=3000
JWT_SECRET=foodwise_jwt_secret_2026
JWT_EXPIRES_IN=7d
```

### 3. Jalankan Server

```bash
# Development (auto-restart saat ada perubahan)
npm run dev

# Production
npm start
```

Server akan berjalan di `http://localhost:3000`. Database SQLite akan otomatis dibuat saat server pertama kali dijalankan.

### 4. Seed Data Kategori

Buka terminal baru (biarkan server tetap berjalan), lalu jalankan:

```bash
npm run seed
```

Ini akan mengisi tabel `categories` dengan 3 data: **Kompos**, **Bokashi**, **Eco-enzyme**.

---

## Struktur Project

```
jurnal-api/
├── config/
│   └── database.js           # Konfigurasi Sequelize + SQLite
├── controllers/
│   ├── authController.js      # Register, Login, Profile
│   ├── journalController.js   # CRUD Jurnal
│   ├── categoryController.js  # List Kategori
│   └── dashboardController.js # Summary Dashboard
├── middleware/
│   ├── auth.js                # JWT Authentication
│   └── validate.js            # Request Validation
├── models/
│   ├── index.js               # Model Associations
│   ├── User.js
│   ├── Journal.js
│   └── Category.js
├── routes/
│   ├── auth.js
│   ├── journals.js
│   ├── categories.js
│   └── dashboard.js
├── seeders/
│   └── categorySeeder.js
├── .env.example
├── package.json
├── server.js                  # Entry point
└── README.md
```

---

## API Documentation

Base URL: `http://localhost:3000`

> **Catatan:** Semua endpoint kecuali Register & Login memerlukan header `Authorization: Bearer <token>`.

---

### Authentication

#### Register

```
POST /api/auth/register
```

**Request Body:**

```json
{
  "name": "Budi Santoso",
  "email": "budi@example.com",
  "password": "password123"
}
```

**Response (201):**

```json
{
  "success": true,
  "message": "Registrasi berhasil.",
  "data": {
    "user": {
      "id": 1,
      "name": "Budi Santoso",
      "email": "budi@example.com",
      "total_points": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

#### Login

```
POST /api/auth/login
```

**Request Body:**

```json
{
  "email": "budi@example.com",
  "password": "password123"
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "Login berhasil.",
  "data": {
    "user": {
      "id": 1,
      "name": "Budi Santoso",
      "email": "budi@example.com",
      "total_points": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

#### Get Profile

```
GET /api/auth/me
```

**Headers:** `Authorization: Bearer <token>`

---

### Journals

#### Submit Jurnal Baru (+15 Poin)

```
POST /api/journals
```

**Headers:** `Authorization: Bearer <token>`

**Request Body:**

```json
{
  "activity": "masak",
  "has_leftover": true,
  "category_id": 2,
  "finished_at": "19:30",
  "waste_weight": 50,
  "weight_unit": "kg"
}
```

| Field | Tipe | Keterangan |
|-------|------|------------|
| `activity` | string | `"masak"` atau `"makan"` |
| `has_leftover` | boolean | `true` jika ada sisa makanan |
| `category_id` | integer | ID kategori (1=Kompos, 2=Bokashi, 3=Eco-enzyme). Wajib jika `has_leftover: true` |
| `finished_at` | string | Waktu selesai makan, format `"HH:MM"` (opsional) |
| `waste_weight` | float | Berat sampah. Wajib jika `has_leftover: true` |
| `weight_unit` | string | `"gr"` atau `"kg"`. Wajib jika `has_leftover: true` |

**Response (201):**

```json
{
  "success": true,
  "message": "Jurnal berhasil disimpan! +15 poin",
  "data": {
    "id": 1,
    "activity": "masak",
    "has_leftover": true,
    "waste_weight": 50,
    "weight_unit": "kg",
    "waste_weight_kg": 50,
    "finished_at": "19:30",
    "points_earned": 15,
    "category": {
      "id": 2,
      "name": "Kompos"
    }
  }
}
```

#### List Semua Jurnal (Paginated)

```
GET /api/journals?page=1&limit=10
```

#### Detail Jurnal

```
GET /api/journals/:id
```

#### Update Jurnal

```
PUT /api/journals/:id
```

#### Hapus Jurnal

```
DELETE /api/journals/:id
```

> Menghapus jurnal akan mengurangi poin user sesuai `points_earned` jurnal tersebut.

---

### Dashboard

#### Summary

```
GET /api/dashboard/summary
```

**Headers:** `Authorization: Bearer <token>`

**Response (200):**

```json
{
  "success": true,
  "data": {
    "total_points": 87,
    "total_waste_kg": 64,
    "categories": [
      {
        "id": 1,
        "name": "Kompos",
        "total_weight_kg": 50,
        "journal_count": 2
      },
      {
        "id": 2,
        "name": "Bokashi",
        "total_weight_kg": 3,
        "journal_count": 1
      },
      {
        "id": 3,
        "name": "Eco-enzyme",
        "total_weight_kg": 11,
        "journal_count": 1
      }
    ]
  }
}
```

---

### Categories

#### List Semua Kategori

```
GET /api/categories
```

**Response (200):**

```json
{
  "success": true,
  "data": [
    { "id": 1, "name": "Kompos", "description": "Pengolahan sisa makanan menjadi kompos..." },
    { "id": 2, "name": "Bokashi", "description": "Fermentasi sisa makanan menggunakan..." },
    { "id": 3, "name": "Eco-enzyme", "description": "Cairan serbaguna dari fermentasi..." }
  ]
}
```

---

## Catatan Penting

- Setiap jurnal yang di-submit memberikan **+15 poin** kepada user.
- Berat sampah otomatis dinormalisasi ke **kilogram** (jika user input dalam gram, akan dibagi 1000).
- Total sampah terkumpul di dashboard merupakan penjumlahan berat dari semua kategori.
- Jika `has_leftover: false`, maka field `category_id`, `waste_weight`, dan `weight_unit` tidak diperlukan (jurnal tetap tercatat dan mendapat poin).
