# CSS 第 11 步：Grid 网格与响应式设计

配套演示：HTMLlearning/11_css_grid_responsive.html

## 学习目标
- 掌握 Grid 容器与轨道（列/行）基础属性：`grid-template-columns/rows`、`gap`、`grid-auto-rows/columns`、`grid-auto-flow`。
- 熟悉轨道尺寸：`fr` 单位、`minmax()`、`repeat()`、`auto-fit` 与 `auto-fill` 的差异与适用场景。
- 会用项目放置：`grid-row`/`grid-column`/`span`、命名线与命名区域（`grid-template-areas`）。
- 理解网格对齐：`justify-content`/`align-content`、`justify-items`/`align-items`、`place-*` 系列。
- 设计响应式断点：媒体查询策略（建议 mobile-first）、常见断点与自适应卡片栅格。
- 实战组合：Grid 搭骨架 + Flex 做内部对齐分布。

---

## 1. Grid 基础（容器属性）

```css
.grid{
  display: grid;
  grid-template-columns: 120px 1fr 2fr; /* 列尺寸 */
  grid-auto-rows: 60px;                 /* 隐式行尺寸 */
  gap: 10px;                            /* 行列间距 */
}
```

关键点：
- `fr` 表示“可用空间份额”，常用于自适应分配宽度。
- `grid-auto-rows/columns` 控制隐式生成的轨道尺寸。
- `grid-auto-flow: row|column|dense` 控制隐式放置流向与密排策略。

---

## 2. 轨道尺寸（fr / minmax / auto-fit|auto-fill）

- `repeat(n, track)`: 重复 n 次轨道定义。
- `minmax(min, max)`: 在范围内自适应（如 `minmax(200px, 1fr)`）。
- `auto-fit`：会“折叠”空轨道，让内容尽可能铺满。
- `auto-fill`：保留空轨道（视觉上可能出现空列）。

```css
.grid{ grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)) }
```

适用建议：大多数自适应卡片栅格，用 `auto-fit + minmax` 最稳妥。

---

## 3. 项目放置（grid-row / grid-column / span）

```css
.a{ grid-column: 1 / span 2 } /* 横跨两列 */
.b{ grid-row: 1 / span 2 }    /* 纵跨两行 */
.c{ grid-column: 3 / 5 }      /* 精确到列线 3-5 */
```

命名线（了解）：
```css
grid-template-columns: [left] 1fr [mid] 2fr [right];
.item{ grid-column: left / right }
```

---

## 4. 命名区域（grid-template-areas）

```css
.layout{
  display:grid;
  grid-template-columns: 200px 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
}
.header{ grid-area: header }
.sidebar{ grid-area: sidebar }
.main{ grid-area: main }
.footer{ grid-area: footer }
```

优势：结构清晰，适合“圣杯布局”“杂志布局”等大框架搭建。

---

## 5. 网格对齐与间距

- 容器级：`justify-content`（主轴） / `align-content`（交叉轴）
- 项目级：`justify-items` / `align-items`（默认对齐）与 `justify-self` / `align-self`（单个覆盖）
- 便捷写法：`place-content`、`place-items`、`place-self`

```css
.grid{ justify-content:center; align-content:center; gap:12px }
```

---

## 6. 响应式设计与断点策略

- 推荐 mobile-first：
  - 先写小屏样式；
  - 用 `@media (min-width: XXXpx)` 逐步增强；
  - 若采用 max-width 也可，但注意覆盖顺序与可维护性。
- 常见断点（可按产品调整）：
  - 420px（超小屏）、640px（小屏）、960px（中屏）、1200px（大屏）。

```css
/* 示例：列数随断点增加 */
.grid{ grid-template-columns: 1fr }
@media (min-width: 640px){ .grid{ grid-template-columns: repeat(2, 1fr) } }
@media (min-width: 960px){ .grid{ grid-template-columns: repeat(3, 1fr) } }
@media (min-width: 1200px){ .grid{ grid-template-columns: repeat(4, 1fr) } }
```

自适应卡片优先：`auto-fit + minmax`，减少对断点的依赖。

---

## 7. Grid 与 Flex 的组合

经验法则：
- 用 Grid 搭页面骨架（二维网格），如 Header/Sidebar/Main。
- 用 Flex 做模块内部的一维分布与对齐（按钮组、标签行、导航条）。

示例：产品卡片 — 外层 Grid 两列（缩略图 + 内容），内容内部用 Flex 排版标签与元信息。

---

## 综合练习

1. 圣杯布局：使用 `grid-template-areas` 实现 Header/Sidebar/Main/Footer。
2. 图库：用 `auto-fit + minmax(200px, 1fr)` 自适应卡片列数。
3. 跨行/跨列：为某个项目设置 `grid-row/column`，制造视觉焦点。
4. 断点策略：按 420/640/960/1200 逐级增强，记录选择与原因。

进阶挑战：尝试定义命名线与子网格（subgrid，需现代浏览器），将复合布局组件化。

---

## 常见问题（FAQ）

- Q：`auto-fit` 与 `auto-fill` 有何区别？
  - A：`auto-fit` 会“折叠”空轨道，使列更紧凑；`auto-fill` 则保留空轨道（可能出现空列占位）。

- Q：什么时候选 Grid，什么时候选 Flex？
  - A：二维布局（需要同时管理行与列）选 Grid；一维布局（单行或单列）选 Flex。

- Q：`fr` 与 `minmax()` 如何搭配？
  - A：常见模式是 `repeat(auto-fit, minmax(200px, 1fr))`，既保证最小宽度，又能填满可用空间。

---

## 下一步预告
- 第 12 步（可选进阶）：过渡与动画、变换与 3D、滚动与粘性效果、prefers-reduced-motion 可访问性。

完成本步后，打开演示页并完成练习：HTMLlearning/11_css_grid_responsive.html
