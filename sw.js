// 이글 앱 껍데기 저장: 저장본으로 바로 열고, 뒤에서 새 버전을 받음(?v= 로 서버 캐시 우회). 적용은 index.html 의 checkUpd
const C = 'eg-shell-v2', FILES = ['./', 'index.html', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png'];
self.addEventListener('install', e => { self.skipWaiting(); e.waitUntil(caches.open(C).then(c => c.addAll(FILES)).catch(() => {})); });
self.addEventListener('activate', e => e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k.startsWith('eg-shell-') && k !== C).map(k => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== location.origin) return;
  e.respondWith(caches.open(C).then(async c => {
    const key = u.pathname.endsWith('/') ? './' : e.request;
    const hit = await c.match(key, { ignoreSearch: true });
    const net = fetch(u.pathname + '?v=' + Date.now(), { cache: 'no-store' }).then(r => { if (r.ok) c.put(key, r.clone()); return r; }).catch(() => hit);
    return hit || net;
  }));
});
