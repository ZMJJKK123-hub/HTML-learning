# 补充教程 15：移动与跨端

## 你将学到
- PWA 深入：离线、更新、推送、后台同步
- 跨端概览：React Native / Flutter / Capacitor
- 移动优化要点

---

## PWA 深入
- 缓存策略：静态资源 Cache First，API 可用 Stale-While-Revalidate。
- 更新提示：Service Worker `updatefound` 后通知用户刷新。
- 离线兜底：提供离线页/提示；失败请求排队，联网后重放。
- Web Push：需服务端生成 VAPID；前端订阅 push，Service Worker 监听 `push`。

---

## 跨端技术概览
- **React Native**：JS/TS + 原生组件；生态成熟，需桥接原生模块。
- **Flutter**：Dart + 自绘引擎；一致性强，体积较大。
- **Capacitor**：Web 技术封装原生容器，适合已有 Web 代码直接打包 App。

---

## 移动优化
- 首屏与包体：按需加载、图片压缩、懒加载；避免大库，使用动态 import。
- 交互：点击 300ms 延迟已被现代浏览器移除，但要保证按钮尺寸与触控区域（至少 44px）。
- 视口与安全区：`<meta name="viewport" content="width=device-width, initial-scale=1">`；适配刘海/圆角用 CSS 安全区变量（`env(safe-area-inset-top)`）。
- 性能：长列表用虚拟化；动画用 transform/opacity；避免主线程重负载（可用 Web Worker）。

---

## 落地建议
1) 为 20 步项目添加 PWA 深化：离线兜底页、更新提示、可选 push 订阅占位。
2) 如需 App 形态，可用 Capacitor 将现有 Web 项目打包，测试基础能力（相机/存储权限）。

---

## 进一步阅读
- PWA 进阶：https://web.dev/progressive-web-apps/
- React Native：https://reactnative.dev
- Flutter：https://flutter.dev
- Capacitor：https://capacitorjs.com
