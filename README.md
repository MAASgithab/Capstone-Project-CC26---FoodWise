# FoodWise - Capstone Project

## Deskripsi Singkat Proyek

**FoodWise** adalah aplikasi web yang dirancang untuk membantu pengguna dalam mengelola dan melacak limbah makanan mereka. Aplikasi ini memungkinkan pengguna untuk:

- Mendaftar dan masuk ke akun mereka dengan sistem autentikasi yang aman
- Mengkategorikan limbah berdasarkan jenis
- Melihat dashboard dengan statistik dan analisis penggunaan limbah
- Membaca panduan tentang pengelolaan limbah makanan yang berkelanjutan

FoodWise dibangun menggunakan **React** dengan **Vite** sebagai build tool, **Tailwind CSS** untuk styling, dan backend API Node.js untuk autentikasi dan manajemen data.

---

## Petunjuk Setup Environment

### Prasyarat (Prerequisites)

Pastikan Anda telah menginstall software berikut:
- **Node.js** (v14 atau lebih baru) - [Download di sini](https://nodejs.org/)
- **npm** (biasanya sudah terinstall bersama Node.js)
- **Git** - [Download di sini](https://git-scm.com/)

### Langkah-Langkah Setup

#### 1. Clone Repository
```bash
git clone <repository-url>
cd "react project/Capstone - FoodWise"
```

#### 2. Install Dependencies Frontend
```bash
# Install dependencies untuk aplikasi React utama
npm install
```

#### 3. Environment Configuration

Pastikan semua backend APIs dapat diakses pada port yang sesuai:
- Auth API: `http://localhost:3001`

---

## Cara Menjalankan Aplikasi

### Jalankan Semua Services (Recommended)

Anda perlu menjalankan aplikasi dalam beberapa terminal yang terpisah:

**Terminal 1 - Jalankan Authentication API:**
```bash
cd server\auth-project\backend
npm start
# API akan berjalan di http://localhost:3001
```

**Terminal 2 - Jalankan Aplikasi React:**
```bash
npm run dev
# Aplikasi akan berjalan di http://localhost:5173
```

### Akses Aplikasi

Setelah semua services berjalan, buka browser Anda dan akses:
```
http://localhost:5173
```

---

## Fitur Aplikasi

- ✅ **Sistem Autentikasi**: Pendaftaran dan login pengguna yang aman
- ✅ **Dashboard**: Melihat statistik dan riwayat limbah makanan
- ✅ **Jurnal Limbah**: Mencatat dan mengkategorikan limbah makanan
- ✅ **Protected Routes**: Halaman dashboard dan jurnal hanya dapat diakses setelah login
- ✅ **Responsive Design**: Desain yang responsif untuk desktop dan mobile
