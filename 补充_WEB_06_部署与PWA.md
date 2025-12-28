# 补充教程 06：部署与 PWA

适用：把项目上线并增加离线/安装等体验。

## 你将学到
- 静态站点部署与环境配置
- 基础监控与日志
- PWA 三要素：HTTPS、Manifest、Service Worker
- Web Worker 与 Service Worker 的区别

---

## 部署基础
- 目标：产出 dist，上传到静态托管（Vercel/Netlify/GitHub Pages/自有 Nginx）。
- 环境变量：在构建时注入（.env.production），不要把密钥放前端；区分 dev/staging/prod。
- 缓存与压缩：开启 gzip/br；静态资源长缓存，HTML no-cache（见补充 01）。
- 回滚策略：保留上一版本产物，部署失败可快速切回。

---

## 监控与日志
- 前端错误上报：监听 `window.onerror`、`unhandledrejection`，上报到日志服务。
- 性能指标：LCP/FID/CLS/TTFB，使用 PerformanceObserver 或现成 SDK（如 Web Vitals）。
- 业务埋点：关键操作（注册/下单）发送轻量日志；注意隐私与采样。

---

## PWA 核心
- **HTTPS**：PWA 必须在 HTTPS/localhost。
- **Manifest**：描述名称、图标、启动模式。
```json
{
  "name": "Demo App",
  "short_name": "Demo",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#0f172a",
  "icons": [{ "src": "/icons/192.png", "sizes": "192x192", "type": "image/png" }]
}
```
- **Service Worker**：缓存静态资源、离线兜底、可做离线队列/更新提醒。

更新提示思路：
```js
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then((reg) => {
    reg.addEventListener('updatefound', () => {
      const worker = reg.installing;
      worker?.addEventListener('statechange', () => {
        if (worker.state === 'installed' && navigator.serviceWorker.controller) {
          // 有新版本，提示用户刷新
          showToast('发现新版本，刷新以更新');
        }
      });
    });
  });
}
```

---

## Web Worker vs Service Worker
- **Web Worker**：在后台线程跑计算；不能直接访问 DOM；用于重型计算、解析。
- **Service Worker**：拦截网络请求、缓存、离线、推送；生命周期与页面分离。

---

## 最小落地建议（基于第 20 步项目）
1) 使用 Vite 打包产物，部署到任一静态托管；配置缓存策略。
2) 添加 manifest.json 与图标，注册 Service Worker，实现静态资源离线与更新提示。
3) 加入错误/性能上报最小版：捕获错误并输出到控制台或 mock 上报。
4) 为接口请求添加离线/失败兜底提示（Toast + 重试按钮）。

---

## 进一步阅读
- PWA 概览：https://developer.mozilla.org/docs/Web/Progressive_web_apps
- Web Vitals：https://web.dev/vitals/
- Vercel 部署指南：https://vercel.com/docs
- Netlify 部署指南：https://docs.netlify.com
