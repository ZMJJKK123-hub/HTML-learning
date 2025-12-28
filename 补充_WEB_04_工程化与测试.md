# 补充教程 04：工程化与测试

适用：前端项目的工具链入门，含包管理、构建、代码质量与测试。

## 你将学到
- 包管理与脚本：npm/pnpm，常用脚本约定
- 构建工具概念：Vite/Webpack 角色与产物
- 代码质量：Lint/Format，渐进式 TypeScript
- 测试：单元测试（Vitest/Jest）、端到端测试（Playwright）

---

## 包管理与脚本
- 建议使用 pnpm（硬链接省空间）；常用脚本：`dev`、`build`、`lint`、`test`、`preview`。
- 最小 package.json 示例：
```json
{
  "name": "demo",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint .",
    "format": "prettier --write .",
    "test": "vitest"
  }
}
```

---

## 构建工具要点
- **Vite**：开发用原生 ESM + 预构建，构建阶段走 Rollup，适合中小型与现代浏览器。
- **Webpack**：插件/loader 体系成熟，需更多配置，适合复杂兼容性要求。
- 关注产物：分包（chunk）、指纹（hash）、代码分割、懒加载；产出 dist 目录部署。

---

## 代码质量
- **ESLint**：语法/风格规则，集成 Prettier 时关闭冲突规则（plugin:prettier/recommended）。
- **Prettier**：统一格式，避免风格争议。
- **TypeScript 渐进式**：
  - 在 JS 中添加 JSDoc/类型注释（`// @ts-check`）。
  - 逐步将文件改为 .ts；开启 `strict` 时可分阶段放宽（先关闭再逐步打开）。
- **提交前检查**：使用 lint-staged + husky 触发 `npm test`/`npm run lint`。

---

## 测试
- **单元测试（Vitest/Jest）**：
  - 适合纯函数、工具、组件逻辑；模拟 DOM 可用 jsdom。
  - 结构：`src/foo.test.ts`；断言库内置（expect）。
- **端到端测试（Playwright）**：
  - 启动本地服务后执行；适合关键用户流程（登录、提交、导航）。
  - 断言可见性、可点击性，截屏对比。

Vitest 示例：
```ts
import { sum } from './sum';
import { describe, it, expect } from 'vitest';

describe('sum', () => {
  it('adds numbers', () => {
    expect(sum(1, 2)).toBe(3);
  });
});
```

Playwright 片段：
```ts
import { test, expect } from '@playwright/test';

test('form submit', async ({ page }) => {
  await page.goto('http://localhost:4173');
  await page.fill('#name', 'Alice');
  await page.click('button[type="submit"]');
  await expect(page.getByText('提交成功')).toBeVisible();
});
```

---

## 最小落地建议（结合第 20 步项目）
1) 新建 package.json，使用 pnpm 安装：`pnpm add -D vite eslint prettier typescript vitest @playwright/test`。
2) 加入基础 ESLint/Prettier 配置；格式化命令串入脚本。
3) 在 JS 文件顶部加 `// @ts-check`，修正显式类型问题；核心函数迁移为 .ts。
4) 添加 1-2 个 Vitest 测试覆盖工具函数或数据处理；为关键流程写 1 个 Playwright 测试。

---

## 进一步阅读
- Vite 文档：https://vitejs.dev
- ESLint + Prettier 配置示例：https://eslint.org/docs/latest/use/integrations
- Vitest：https://vitest.dev
- Playwright：https://playwright.dev
