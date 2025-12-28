# 补充教程 11：设计系统与组件库

## 你将学到
- 设计令牌与主题体系
- 组件模式与无障碍要求
- 文档与演示：Storybook

---

## 设计令牌
- 分类：颜色、字号/行高、间距、阴影、圆角、动效、Z 轴。
- 层级：基础 token（颜色值）→ 语义 token（primary/bg/success/error）。
- 多主题：通过 CSS 变量或主题对象切换。

示例（CSS 变量）：
```css
:root { --color-bg: #0f172a; --color-fg: #e2e8f0; }
[data-theme='light'] { --color-bg: #ffffff; --color-fg: #0f172a; }
```

---

## 组件模式
- 输入型组件：可聚焦、键盘操作、错误提示（aria-describedby）。
- 反馈组件：Toast/Modal 需 aria-live、焦点管理与关闭键（Esc）。
- 布局与导航：Tabs/Dropdown/Tooltip 遵守 WAI-ARIA 模式。
- API 设计：受控/非受控两种形态；暴露 onChange/onOpen 等钩子。

---

## 文档与演示（Storybook）
- 价值：组件目录、交互面板、Knobs/Controls、文档说明、无障碍检查。
- 快速开始：`npx storybook@latest init`；为组件添加 stories。

---

## 落地建议（结合第 20 步项目）
1) 抽出主题 token 到单独 CSS 变量文件，增加暗/亮主题。
2) 将 Tabs/Toast 等组件写成可复用接口，并在 Storybook 中演示属性变体。
3) 为表单输入添加 aria 属性与错误描述，检查对比度。

---

## 进一步阅读
- Design Tokens W3C 草案：https://tr.designtokens.org
- ARIA Authoring Practices：https://www.w3.org/WAI/ARIA/apg/
- Storybook 文档：https://storybook.js.org
