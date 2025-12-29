const CACHE_NAME = 'modern-tennis-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/ten-192.png',
  '/ten-512.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});