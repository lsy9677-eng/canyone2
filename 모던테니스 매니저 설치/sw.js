const CACHE_NAME = 'modern-tennis-v3'; // 버전을 v3로 올려서 기존 오류 캐시 삭제
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './ten-192.png',
  './ten-512.png'
];

// 설치 단계: 리소스 캐싱
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

// 활성화 단계: 오래된 캐시 삭제
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// 페치 단계: 네트워크 우선, 실패 시 캐시 사용 (ERR_FAILED 방지)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});