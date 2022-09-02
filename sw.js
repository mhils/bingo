const CACHE_NAME = "bingo-v2";
const CACHE_URLS = [
  "./",
  "./bootstrap.min.css",
  "./play.html",
  "./textFit.js",
];

// The install handler takes care of precaching the resources we always need.
self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(CACHE_URLS);
    self.skipWaiting();
  })());
});

self.addEventListener('fetch', e => {
  e.respondWith((async () => {
    const r = await caches.match(e.request);
    if (r) {
      return r;
    }
    const response = await fetch(e.request);
    // const cache = await caches.open(CACHE_NAME);
    // cache.put(e.request, response.clone());
    return response;
  })());
});