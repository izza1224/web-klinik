# 🏥 Klinik — Website Profil & Home Care

Website profil klinik kesehatan dan layanan **Home Care** yang dibangun dengan HTML, CSS, dan JavaScript murni (tanpa framework). Desain elegan, modern, dan responsif untuk semua perangkat.

![Preview Website](https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80)

---

## ✨ Fitur Utama

- **Sticky Navbar** — Menu navigasi tetap terlihat saat scroll, dengan tombol Chat WhatsApp
- **Hero Section** — Banner layar penuh dengan gradient overlay medis dan statistik klinik
- **Floating Info Bar** — 3 kartu keunggulan yang melayang di atas hero
- **8 Layanan Lengkap** — Grid kartu dengan foto, deskripsi, dan tombol WA otomatis per layanan
- **Profil Perawat** — Tata letak 2 kolom foto + biografi profesional
- **Galeri Sertifikat** — Lightbox interaktif untuk melihat STR, SIPP, dan sertifikat keahlian
- **Testimoni Pasien** — 3 kartu ulasan bintang dari pasien nyata
- **Galeri Klinik** — Foto suasana klinik dengan efek hover overlay
- **Lokasi & Maps** — Google Maps embed interaktif + info jam operasional
- **Floating WA Button** — Tombol WhatsApp melayang di pojok kanan bawah
- **Animasi Smooth** — Fade-up scroll, hover effects, dan transisi halus

---

## 📋 Daftar Layanan

| No | Layanan | Tersedia |
|----|---------|----------|
| 1 | Perawatan Luka | Klinik & Home Care |
| 2 | Khitan Modern | Klinik |
| 3 | Pemasangan Infus | Klinik & Home Care |
| 4 | Pemasangan NGT | Klinik & Home Care |
| 5 | Pemasangan Kateter | Klinik & Home Care |
| 6 | Terapi Bekam | Klinik & Home Care |
| 7 | Terapi Inframerah | Klinik |
| 8 | Cek Lab Mini | Klinik |

---

## 🎨 Desain & Teknologi

- **HTML5** — Struktur semantik SEO-friendly
- **CSS3** — Custom properties, Grid, Flexbox, animasi CSS
- **Vanilla JavaScript** — Intersection Observer, smooth scroll, lightbox
- **Google Fonts** — Playfair Display (judul) + Inter (body)

### Palet Warna
| Nama | Hex | Fungsi |
|------|-----|--------|
| Navy Blue | `#1a56a0` | Warna utama / brand |
| Teal | `#0d9488` | Aksen / badge |
| WA Green | `#25d366` | Tombol WhatsApp |
| White | `#ffffff` | Background utama |

---

## 📁 Struktur File

```
web-klinik/
├── index.html      # Halaman utama (semua section)
├── style.css       # Semua styling & animasi
├── script.js       # Interaksi & efek JavaScript
└── README.md       # Dokumentasi ini
```

---

## 🚀 Cara Menjalankan

### Buka Langsung
1. Download atau clone repo ini
2. Klik dua kali file `index.html`
3. Website terbuka di browser

### Via Local Server (Direkomendasikan)
```bash
# Python
python -m http.server 8080

# Lalu buka: http://localhost:8080
```

---

## ⚙️ Kustomisasi

Edit bagian berikut di `index.html` sesuai data klinik Anda:

```html
<!-- Nomor WhatsApp — ganti di semua link wa.me -->
https://wa.me/6281234567890

<!-- Nama klinik -->
Klinik Sehat Mandiri

<!-- Nama perawat -->
Ns. Sari Dewi, S.Kep

<!-- Alamat -->
Jl. Kesehatan No. 123, Kota Sehat 12345

<!-- Google Maps — ganti src iframe dengan koordinat klinik -->
<iframe src="https://www.google.com/maps/embed?pb=..."></iframe>
```

---

## 📱 Responsif

| Breakpoint | Tampilan |
|------------|----------|
| Desktop ≥ 1024px | Layout penuh 2–4 kolom |
| Tablet 768–1023px | Layout 1–2 kolom |
| Mobile < 768px | Layout 1 kolom + hamburger menu |

---

## 📄 Lisensi

Dibuat khusus untuk **Klinik homecare**. Hak cipta dilindungi © 2024.

---

> 💬 **Kontak:** Untuk pertanyaan layanan, hubungi kami via WhatsApp di nomor yang tertera pada website.
