// v3.3.2 Service Worker —— 强制接管 + 新缓存
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(caches.open('linpet-v3_3_2').then(c => c.addAll(['./','./index.html','./manifest.webmanifest'])));
});
self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(r => r || fetch(event.request).then(resp => {
      const copy = resp.clone();
      caches.open('linpet-v3_3_2').then(c => c.put(event.request, copy));
      return resp;
    }).catch(() => caches.match('./')))
  );
});
