# CSS 第 13 步：变量、主题、层叠与工程化

配套演示：HTMLlearning/13_css_variables_theming_cascade.html

## 学习目标
- 建立“设计令牌”（Design Tokens）观念，统一颜色/间距/圆角/阴影/字号。
- 使用 CSS 变量（Custom Properties）驱动主题与组件样式。
- 通过 @layer（层叠层）稳定样式优先级：base/components/utilities。
- 管理特异性：使用 :where() / :is()，减少 !important 依赖。
- 理解 BEM 命名与“容器作用域”组织方式；了解 @scope 的方向。

---

## 1. 设计令牌与 CSS 变量

- 令牌（tokens）是抽象的视觉语义：颜色、间距、字号、圆角、阴影等。
- 将 tokens 定义在 `:root`（或主题容器）下，组件只消费 tokens，不直接写死值。

```css
:root{
  --color-brand:#3b82f6;
  --color-text:#0f172a;
  --radius:12px;
  --shadow:0 6px 20px rgba(17,24,39,.08);
}
.button{ background:var(--color-brand); border-radius:var(--radius) }
```

优势：统一风格、可主题化、可局部覆盖、利于设计协作。

---

## 2. 主题（Theming）

- 常见做法：在 `html[data-theme="dark"]` 下覆盖 tokens 值，不改组件实现。
- 与 JS 配合：用 `data-theme` 切换主题，并在 localStorage 记忆。
- 尊重系统偏好：`prefers-color-scheme` 作为“系统模式”。

```css
html[data-theme="dark"]{ --color-bg:#0b1020; --color-text:#e5e7eb }
@media (prefers-color-scheme: dark){ html[data-theme="system"]{ /* ...暗色值... */ } }
```

---

## 3. 层叠层（@layer）与优先级组织

- 通过 `@layer base, components, utilities;` 声明层次，后面的层优先级更高。
- 建议：
  - base：重置、排版、全局结构；
  - components：组件样式；
  - utilities：原子/工具类（覆盖最强）。

```css
@layer base, components, utilities;
@layer base{ body{ line-height:1.6 } }
@layer components{ .card{ /* 组件样式 */ } }
@layer utilities{ .mt-3{ margin-top:14px } }
```

收益：
- 减少“选择器大战”；
- 降低对 `!important` 的需求；
- 令“工具类覆盖组件、组件覆盖基础”的意图更清晰。

---

## 4. 特异性管理：:where() 与 :is()

- `:where()`：选择器特异性为 0，适合组件外层约束，便于后续覆盖。
- `:is()`：整合多个选择器，保留最右侧选择器特异性，减少重复。

```css
:where(.prose) h1{ font-size:2rem } /* 易于被更具体规则覆盖 */
.nav :is(a, button){ color:inherit }
```

尽量避免深层级、复杂选择器；能用类选择器解决的，就不要用“后代链条”。

---

## 5. 命名与作用域：BEM / Utility / 容器作用域

- BEM：`block__element--modifier`，结构清晰、可读性好（例：`.card__title`, `.badge--ok`）。
- 原子/工具类（utility/atomic）：如 `.mt-3 .flex .items-center`；开发效率高，可组合度强。
- 容器作用域：以父级类限定样式有效范围，如 `.prose h1`、`.dialog .btn`。
- @scope（了解）：原生作用域，支持度逐步推进，现阶段仍以类容器为主。

建议：组件内部采用 BEM，页面快速布局用工具类；注意一致性与可维护性。

---

## 综合练习

1) 将项目视觉要素抽象为 tokens，并在 `:root` 定义；
2) 实现浅/深色主题切换，并记忆到 localStorage；
3) 用 `@layer` 分层组织样式（base/components/utilities）；
4) 在文档区域使用 `:where()` 降低特异性，验证覆盖；
5) 为一个组件编写 BEM 命名与一组可复用工具类，比较哪种更高效。

---

## 常见问题（FAQ）

- Q：`@layer` 与引入顺序的关系？
  - A：层的声明顺序决定优先级；同层内仍按普通 CSS 层叠规则处理（后写覆盖先写）。

- Q：什么时候还需要 `!important`？
  - A：尽量避免；如第三方样式难以覆盖或临时抢救可少量使用，同时记录原因并计划移除。

- Q：CSS 变量与预处理器变量（Sass）区别？
  - A：CSS 变量在运行时可变、可按作用域覆盖；预处理器变量在编译时替换、运行时不可变。

---

## 下一步建议
- 选修：实战小项目整合（把 HTML/表单/布局/主题/动画综合应用），或引入构建工具与 CSS 框架对比（Tailwind/BEM/原子化）。

完成本步后，请打开演示并完成练习：HTMLlearning/13_css_variables_theming_cascade.html
