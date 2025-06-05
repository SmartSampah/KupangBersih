self.addEventListener('install', function(e) {
  e.waitUntil(caches.open('sampah-store').then(function(cache) {
    return cache.addAll(['index.html','dashboard-petugas.html','dashboard-admin.html','manifest.json']);
  }));
});
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});