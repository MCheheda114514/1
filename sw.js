const STORE = 'operation-board-v8';
const CORE = [
  './','./index.html','./error.html','./lock.html','./ops.html','./app.js','./error.js','./lock.js','./style.css','./manifest.webmanifest','./404.html','./robots.txt'
];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(STORE).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.map(key => {
    if (key !== STORE && (key.startsWith('delta-') || key.startsWith('operation-'))) return caches.delete(key);
  }))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const req = event.request;
  if (req.mode === 'navigate') {
    event.respondWith(fetch(req).catch(() => caches.match('./ops.html').then(x => x || caches.match('./index.html'))));
    return;
  }
  event.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => {
    if (!res || res.status !== 200 || res.type === 'opaque') return res;
    const copy = res.clone(); caches.open(STORE).then(c => c.put(req, copy)); return res;
  }).catch(() => caches.match('./index.html'))));
});
