# 🚀 Panduan Deploy Duitku ke Netlify

## Struktur Folder
```
duitku-pwa/
├── index.html       ← app utama
├── manifest.json    ← metadata PWA
├── sw.js            ← service worker (offline)
└── icons/
    ├── icon-192.png
    └── icon-512.png
```

---

## Langkah 1 — Upload ke GitHub

1. Buka https://github.com/new
2. Buat repo baru, nama: `duitku-pwa`
3. Centang "Add a README file"
4. Klik **Create repository**
5. Upload semua file (drag & drop atau lewat tombol "Add file > Upload files")
6. Commit changes

---

## Langkah 2 — Deploy ke Netlify

1. Buka https://netlify.com dan login
2. Klik **"Add new site" > "Import an existing project"**
3. Pilih **GitHub**, authorize, pilih repo `duitku-pwa`
4. Build settings biarkan kosong semua (bukan project Node.js)
5. Klik **Deploy site**
6. Tunggu ~30 detik → dapat URL seperti `https://duitku-abc123.netlify.app`

---

## Langkah 3 — Install di POCO F6 (Chrome)

1. Buka URL Netlify di **Chrome** di POCO F6
2. Tunggu halaman load penuh
3. Chrome akan muncul banner **"Tambahkan ke layar utama"** di bagian bawah
   - Jika tidak muncul otomatis: ketuk ikon **⋮ (titik tiga)** di kanan atas
   - Pilih **"Install app"** atau **"Tambahkan ke layar utama"**
4. Ketuk **Install** / **Tambah**
5. Ikon Duitku akan muncul di home screen! ✅

---

## Tips POCO F6 (Android 14 / HyperOS)

- Pastikan pakai **Chrome** (bukan Mi Browser)
- Jika ada notif "Install Duitku" di dalam app sendiri → ketuk tombol ↓ di pojok kanan atas
- App akan berjalan **fullscreen tanpa address bar**, persis seperti APK native
- Data tersimpan di localStorage HP — **tidak akan hilang** meski offline

---

## Update App

Setiap kali kamu edit `index.html` dan push ke GitHub,  
Netlify otomatis rebuild dalam ~30 detik. Buka app → refresh sekali → versi terbaru aktif.
