# 补充教程 01：网络与性能

适用：快速了解前端常用的网络与性能策略，便于在小项目中落地。

## 你将学到
- 缓存策略：Cache-Control/ETag、版本指纹与缓存失效
- 传输优化：HTTP/2 与 HTTP/3、压缩、CDN
- 服务体验：预加载/预取、延迟与带宽调试
- 离线与降级：Service Worker（概念）、断网提示

---

## 核心概念
- **强缓存**：`Cache-Control: max-age=31536000, immutable`，命中即不访问服务器。
- **协商缓存**：`ETag/If-None-Match` 或 `Last-Modified/If-Modified-Since`，命中返回 304。
- **指纹与版本**：文件名加 hash（如 `app.3f2a1.js`）+ 长缓存；新版上线换 hash 即可失效旧版。
- **压缩**：`Content-Encoding: gzip/br`，前端打包时也要开启。
- **HTTP/2/3**：多路复用减少队头阻塞；HTTP/3 基于 QUIC 更抗丢包。
- **CDN**：就近分发静态资源；注意缓存配置和回源策略。
- **预加载与预取**：
  - `rel="preload"`：当前页关键资源提前加载。
  - `rel="prefetch"`：下一跳页面可能用到的资源，低优先级预取。
- **性能监测**：DevTools Performance/Network、Lighthouse；核心关注 FCP/LCP/CLS/TTI。

---

## 实操清单（无工具版）
1) 给静态资源加指纹文件名（构建或手动命名）。
2) HTML 中对关键 CSS/字体使用 `<link rel="preload">`，对次级路由用 `prefetch`。
3) 服务端配置：
   - 长缓存资源：`Cache-Control: public, max-age=31536000, immutable`
   - HTML：`Cache-Control: no-cache`（让 HTML 及时获取新入口）
   - 协商缓存：开启 `ETag` 或 `Last-Modified`
4) 启用 gzip/br 压缩。
5) DevTools Network 里勾选 "Disable cache" 做功能调试；用 Throttling 测低网速体验。

---

## 代码片段（HTML preload/prefetch）
```html
<!-- 关键 CSS/字体提前加载 -->
<link rel="preload" href="/assets/main.css" as="style">
<link rel="preload" href="/assets/Inter.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/main.css">

<!-- 下一页的脚本低优先级预取 -->
<link rel="prefetch" href="/assets/next-page.js" as="script">
```

---

## Service Worker（概念 + 最小示例）
> 仅在 HTTPS / localhost 可用，用于离线缓存与请求拦截。

```js
// sw.js（示例：缓存静态资源）
const CACHE = 'v1';
const ASSETS = [ '/', '/index.html', '/assets/main.css', '/assets/main.js' ];

self.addEventListener('install', evt => {
  evt.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
});

self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(hit => hit || fetch(evt.request))
  );
});
```

注册（页面脚本）：
```js
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').catch(console.error);
}
```

---

## 调试与验证
- DevTools Network：看 `Size`/`Time`，命中缓存会标记 `(from disk cache)`/`(from memory cache)`。
- Lighthouse：关注 LCP、CLS、TTI，查看 “Opportunities” 中的缓存、压缩建议。
- Performance 面板：检查长任务（>50ms），将重型逻辑分批或用 idle/Worker（参考第 19 步）。

---

## 小练习
- 给 20 步项目中的静态资源（CSS/JS/字体）加 preload/prefetch；模拟 3G 下查看 LCP 变化。
- 为静态资源添加文件指纹（手动重命名即可），并设置 HTML 不缓存、静态资源长缓存的配置示例。
- 为项目添加最小 Service Worker，断网后验证静态资源是否可加载；为 API 请求返回离线提示。

---

## 进一步阅读
- HTTP 缓存规范：https://developer.mozilla.org/docs/Web/HTTP/Caching
- Lighthouse 指标解释：https://web.dev/lighthouse-performance/
- Service Worker 概览：https://developer.mozilla.org/docs/Web/API/Service_Worker_API
