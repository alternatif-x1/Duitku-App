// ═══════════════════════════════════════════════════════
// DUITKU — Service Worker
// Strategi: Cache-first untuk aset statis, network-first untuk data
// ═══════════════════════════════════════════════════════

const CACHE_NAME = 'duitku-v2';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

// ── INSTALL: cache semua aset penting ──
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[SW] Caching app shell');
      return cache.addAll(ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// ── ACTIVATE: hapus cache lama ──
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => {
            console.log('[SW] Deleting old cache:', key);
            return caches.delete(key);
          })
      )
    ).then(() => self.clients.claim())
  );
});

// ── FETCH: cache-first, fallback ke network ──
self.addEventListener('fetch', event => {
  // Hanya handle request GET
  if (event.request.method !== 'GET') return;

  // Skip request ke domain lain (misal Google Fonts)
  const url = new URL(event.request.url);
  if (url.origin !== location.origin) {
    // Untuk font/CDN: network-first, jika gagal pakai cache
    event.respondWith(
      fetch(event.request)
        .then(response => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // Untuk aset lokal: cache-first
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        // Simpan ke cache
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        return response;
      });
    }).catch(() => {
      // Offline fallback: kembalikan index.html
      return caches.match('./index.html');
    })
  );
});

// ── BACKGROUND SYNC (opsional) ──
self.addEventListener('message', event => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
});
