# 🧩 IdentiKit – Frontend User Management App

Frontend aplikasi untuk manajemen data pengguna menggunakan **Next.js**, **TypeScript**, dan **Tailwind CSS**, terhubung dengan backend REST API ([IdentiKit Backend](https://github.com/bagoesrex/identikit-server)).

---

## ✨ Fitur Utama

- ✅ Menampilkan daftar user (desktop dan mobile view)
- ✅ Tambah, ubah, dan hapus user dengan validasi
- ✅ Komunikasi dengan API backend melalui Axios
- ✅ Desain UI responsif dengan Tailwind CSS
- ✅ Arsitektur modular dan clean

---

## 📋 Requirements

- Node.js ≥ 18
- (Jalankan [IdentiKit Backend](https://github.com/bagoesrex/identikit-server) terlebih dahulu) di `http://localhost:5000`

---

## ⚙️ Setup & Instalasi

1. **Clone repository:**

```bash
git clone https://github.com/bagoesrex/identikit-client.git
cd identikit-client
```

2. **Install dependencies:**

```bash
npm install
```

3. **Salin konfigurasi environment:**

```bash
cp .env.local.example .env.local
```

Sesuaikan nilai `NEXT_PUBLIC_API_URL` di file `.env.local`:

```bash
NEXT_PUBLIC_API_URL=http://localhost:5000/api
# Sesuaikan dengan Back-end
```

4. **Jalankan server lokal**

```bash
npm run dev
```

Server akan berjalan di: `http://localhost:3000`
