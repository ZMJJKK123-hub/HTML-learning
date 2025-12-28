// 最小 Service Worker：离线兜底 + 静态资源缓存
const CACHE = 'fpwa-v1';
const OFFLINE_URL = './offline.html';
const ASSETS = [
  './20_js_final_project.html',
  './offline.html'
];

self.addEventListener('install', (evt) => {
  evt.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(ASSETS))
  );
});

self.addEventListener('activate', (evt) => {
  evt.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))
    ))
  );
});

self.addEventListener('fetch', (evt) => {
  const req = evt.request;
  // 对页面导航请求：网络优先，失败回离线页
  if (req.mode === 'navigate') {
    evt.respondWith(
      fetch(req).catch(() => caches.match(OFFLINE_URL))
    );
    return;
  }
  // 其他静态资源：缓存优先，失败再走网络
  evt.respondWith(
    caches.match(req).then((hit) => hit || fetch(req).then((resp) => {
      // 仅缓存 GET 同源成功响应
      try {
        const copy = resp.clone();
        caches.open(CACHE).then((c) => c.put(req, copy));
      } catch (_) {}
      return resp;
    }).catch(() => caches.match(OFFLINE_URL)))
  );
});
