# 📚 Perpustakaan Digital (Boutique Library App)

Sistem Informasi Perpustakaan Digital modern yang mengusung tema **Warm-Elegant** (elegan & hangat). Proyek ini dirancang untuk memberikan pengalaman membaca premium layaknya berada di butik eksklusif, serta menyediakan *Dashboard Admin* yang komprehensif bagi pengelola perpustakaan.

## ✨ Fitur Utama

### 🌐 Halaman Publik & Anggota (User/Member)
- **Desain Butik Elegan**: Antarmuka modern dengan skema warna merah bata (*Terracotta*) dan krem hangat (*Warm Beige*).
- **Katalog Buku Responsif**: Pencarian dan penyaringan (*filter*) buku dengan tampilan kartu yang dinamis (termasuk efek *hover*, rating, dan *glassmorphism*).
- **Perpustakaan Pribadi (My Library)**: Navigasi lengkap menuju Buku Sedang Dibaca, Selesai Dibaca, Daftar Keinginan (*Wishlist*), dan Favorit.
- **Dukungan Dark Mode**: Peralihan instan antara *Light Mode* (tema kertas/krem) dan *Dark Mode* (hitam elegan) tanpa merusak komposisi warna aksen utama.

### ⚙️ Dashboard Admin (Administrator)
- **Tinjauan Statistik**: Panel interaktif (*Area Charts* berbasis data) untuk memantau tren peminjaman dan pendapatan secara *real-time*.
- **Manajemen Buku Terpadu**: CRUD visual (*Tambah, Edit, Hapus*) dengan tampilan sampul buku yang proporsional.
- **Pengelolaan Anggota & Peminjaman**: Pelacakan status anggota (Aktif/Tidak Aktif) dan status peminjaman (Dipinjam/Terlambat/Kembali) secara instan dengan *Badge* warna informatif.
- **Pengaturan Sistem**: Konfigurasi profil perpustakaan, keamanan, hingga aturan durasi peminjaman.
- **Konfirmasi Keamanan (UX)**: Setiap aksi krusial seperti menghapus data atau menyimpan pengaturan dilindungi dengan animasi modal (Pop-up) persetujuan dan notifikasi keberhasilan (*Toast*).

## 🛠️ Tech Stack (Teknologi yang Digunakan)

Proyek ini (saat ini berfokus pada Frontend) dibangun menggunakan ekosistem modern:
- **[React 18](https://react.dev/)**: Library UI utama (menggunakan Hooks modern).
- **[TypeScript](https://www.typescriptlang.org/)**: Static typing untuk kode yang lebih aman dan mudah di-maintain.
- **[Tailwind CSS v4](https://tailwindcss.com/)**: Utility-first CSS untuk styling (*custom dark mode*, *custom variants*, desain responsif).
- **[Vite](https://vitejs.dev/)**: *Build-tool* ultra cepat.
- **[React Router DOM](https://reactrouter.com/)**: Manajemen rute (*Client-side routing*) berjenjang untuk halaman publik, anggota, dan admin.
- **[Lucide React](https://lucide.dev/)**: Ikon SVG yang cantik dan konsisten.
- **[Recharts](https://recharts.org/)**: Rendering grafik (Charts) statistik interaktif di sisi admin.

## 🚀 Cara Menjalankan Secara Lokal (Local Development)

Pastikan Anda sudah menginstal **Node.js** di komputer Anda. Ikuti langkah-langkah berikut untuk menjalankan proyek ini:

1. **Kloning (Clone) Repository**
   ```bash
   git clone https://github.com/USERNAME_ANDA/NAMA_REPO_ANDA.git
   cd NAMA_REPO_ANDA
   ```

2. **Masuk ke folder Frontend**
   ```bash
   cd frontend
   ```

3. **Instal Dependensi**
   ```bash
   npm install
   ```

4. **Jalankan Server Development**
   ```bash
   npm run dev
   ```

5. Buka tautan lokal Anda (biasanya `http://localhost:5173`) di peramban web (*browser*).

---

## 🎨 Cuplikan Tampilan (Screenshots)

* **Halaman Utama (Landing Page)**: ![Landing Page](../src/assets/landing-page.png)
* **Dashboard Admin**: ![Admin Dashboard](../src/assets/admin-panel.png)

---

## 📝 Status Pengembangan
- [x] **Fase 1: Desain Frontend UI/UX (Selesai)**
- [ ] **Fase 2: Integrasi Backend API (Dalam Perencanaan)**
- [ ] **Fase 3: Autentikasi Keamanan (Dalam Perencanaan)**

<br/>
<div align="center">
  Dibuat dengan ❤️ untuk pengalaman literasi digital terbaik.
</div>
