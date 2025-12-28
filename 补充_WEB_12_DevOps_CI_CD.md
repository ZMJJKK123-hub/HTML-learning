# 补充教程 12：DevOps / CI-CD

## 你将学到
- CI 基础：安装依赖、Lint/测试、构建
- CD 基础：自动部署到预览/生产
- 监控与告警的最小实践

---

## CI 流水线最小模板（GitHub Actions）
```yaml
name: ci
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci
      - run: npm run lint
      - run: npm test --if-present
      - run: npm run build
```

---

## CD 思路
- 部署目标：静态站点（Vercel/Netlify/GitHub Pages）或自有服务器。
- 预览环境：对每个 PR 部署预览，便于验收。
- 秘钥管理：使用 CI 的 Secret；不要写入仓库。

---

## 监控与告警
- 错误上报：Sentry 或自建接口；监听 `window.onerror`/`unhandledrejection`。
- 性能：Web Vitals（LCP/FID/CLS/TTFB），CI 中用 Lighthouse CI 或 Playwright Trace。
- 可用性：Ping/心跳检查；前端接口的合成监控（定期跑关键流程脚本）。

---

## 落地建议
1) 为项目添加最小 GitHub Actions CI（lint+test+build）。
2) 选择一个托管（Vercel/Netlify/GitHub Pages）作为 CD 目标，开启预览部署。
3) 添加错误上报与 Web Vitals 上报的占位实现或 SDK。

---

## 进一步阅读
- GitHub Actions 文档：https://docs.github.com/actions
- Lighthouse CI：https://github.com/GoogleChrome/lighthouse-ci
- Sentry 前端：https://docs.sentry.io/platforms/javascript/
