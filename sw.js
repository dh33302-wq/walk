// Walk 설치용 껍데기: 설치 조건을 채우기 위한 최소 서비스 워커(저장·가로채기 없음)
self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => {});
