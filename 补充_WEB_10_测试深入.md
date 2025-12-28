# 补充教程 10：测试深入

## 你将学到
- 组件测试（Testing Library 思路）
- 契约测试（前后端接口契约）
- 可视化回归（截图对比）
- 性能基准（基准测试与性能指标）

---

## 组件测试
- 工具：React/Vue Testing Library + Jest/Vitest。
- 思路：按用户行为编写测试（查询文本/角色），避免依赖内部实现。
```js
import { render, screen, fireEvent } from '@testing-library/react';
import Counter from './Counter';

test('increments', () => {
  render(<Counter />);
  fireEvent.click(screen.getByText('+1'));
  expect(screen.getByText('1')).toBeInTheDocument();
});
```

---

## 契约测试
- 目标：确保前后端接口约定未破坏。
- 工具：Pact（消费者驱动契约）；或用 OpenAPI schema 校验 mock/真实响应。
- 前端可在 CI 中对 mock server 跑测试，后端对 provider 端跑验证。

---

## 可视化回归
- 工具：Playwright、Cypress + Percy/Loki。
- 做法：对关键页面/组件截图，对比基线；布局/样式突变时报警。

---

## 性能基准
- 运行基准：使用 Benchmark.js 或 Node 的 `perf_hooks`；对纯函数或渲染片段做比较。
- 真实页面性能：用 Lighthouse/Playwright Trace，关注 LCP/FID/CLS/TTI/TTFB。

---

## 最小落地建议
1) 为关键组件写 1-2 个 Testing Library 测试。
2) 若有接口 schema，用 OpenAPI 校验响应；或尝试 Pact 契约测试示例。
3) 对首页运行截图回归基线，后续改动时对比。
4) 用 Lighthouse 跑一次性能分数，记录基线。

---

## 进一步阅读
- Testing Library：https://testing-library.com
- Pact：https://pact.io
- Playwright：https://playwright.dev/docs/test-snapshots
- Benchmark.js：https://benchmarkjs.com
