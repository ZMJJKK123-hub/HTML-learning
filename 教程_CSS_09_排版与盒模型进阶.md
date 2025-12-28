# CSS 第 9 步：排版与盒模型进阶

配套演示：HTMLlearning/09_css_typography_box_model.html

## 学习目标
- 掌握字体族选择、字号体系（px/em/rem）与响应式字体 `clamp()`。
- 调整行高（line-height）、字重（font-weight）、字距（letter-spacing）、对齐（text-align）。
- 理解文本装饰与换行控制（underline、white-space、overflow-wrap）。
- 熟悉 display：block/inline/inline-block 的差异与适用场景。
- 了解 margin 折叠现象与常见的 BFC 解决方案（overflow、flow-root）。
- 提升视觉层级：边框、圆角、阴影、聚焦轮廓。

---

## 1. 字体与字号体系

- 字体族（font-family）：serif（衬线）、sans-serif（无衬线）、monospace（等宽）。
- 字号单位：
  - px：绝对像素，简单直接但不随根字体变化。
  - em：相对当前元素字体大小，受父元素影响，易级联放大/缩小。
  - rem：相对根元素（html），推荐用于全局排版的尺度控制。
- 响应式字号：`clamp(min, preferred, max)`，根据视口宽度平滑缩放。

示例：
```css
html { font-size: 16px }
.title { font-size: clamp(1.25rem, 2.5vw + .5rem, 2rem) }
```

实践建议：
- 以 `rem` 作为排版基准；
- 标题层级（H1/H2/H3）使用 `clamp()` 实现自适应；
- 等宽字体（monospace）用于代码展示与等列对齐。

---

## 2. 行高、字重、字距与对齐

- 行高：标题建议 1.2-1.4，正文建议 1.6-1.8。
- 字重：400（常规）、500/600（中/半粗）、700（加粗）。
- 字距：`letter-spacing` 在全大写或标题中增加可读性。
- 对齐：`left/center/right/justify`；两端对齐需注意中英文断行体验。

```css
.lh-tight { line-height: 1.2 }
.lh-relaxed { line-height: 1.8 }
.weight-600 { font-weight: 600 }
.spacing { letter-spacing: .04em }
.align-justify { text-align: justify }
```

---

## 3. 文本装饰与换行控制

- 文本装饰：`text-decoration`、`text-underline-offset` 调整下划线样式与位置。
- 换行与溢出：
  - `white-space: nowrap` 禁止换行。
  - `overflow-wrap: break-word` 在长单词内断开，防止布局溢出。

```css
.decoration a{ text-decoration: underline; text-underline-offset: 3px }
.nowrap{ white-space: nowrap }
.break-words{ overflow-wrap: break-word }
```

---

## 4. display：block / inline / inline-block

- block：独占一行，可设置宽高、margin/padding（如 div、p、h1）。
- inline：不换行，宽高不可直接生效，margin 仅左右有效（如 span、a）。
- inline-block：不换行，但可设置宽高（适合小组件、标签）。

```css
.block{ display:block }
.inline{ display:inline }
.inline-block{ display:inline-block }
```

---

## 5. margin 折叠（Margin Collapsing）

相邻块级元素的上下外边距会发生折叠，呈现为取较大者（而非累加）。

典型解决方案：创建 BFC（块级格式化上下文）：
- `overflow: auto|hidden`；
- `display: flow-root`（现代、语义明确）；
- 其他如 `float`、`position` 也可触发 BFC（不作为首选）。

```css
.parent{ overflow:auto } /* 创建 BFC */
.flow-root{ display: flow-root }
```

---

## 6. 边框、圆角、阴影与聚焦轮廓

- `border`：强调分隔与边界。
- `border-radius`：柔化方形（使用 999px 可做胶囊按钮）。
- `box-shadow`：提升层级与视觉悬浮感。
- `outline`：用于可访问性（键盘导航聚焦高亮），不占据布局空间。

```css
.box{ border:1px solid #e5e7eb; border-radius:8px; box-shadow:0 10px 25px rgba(0,0,0,.08) }
.box:focus{ outline:3px solid rgba(37,99,235,.35) }
```

---

## 综合练习

1. 长文排版：设置合适的 `line-height` 与 `text-align: justify`，并优化中英文混排。
2. 标题体系：为 H1/H2/H3 设计 `clamp()` 的响应式字号比例。
3. 信息卡片：用 `inline-block` 实现标签行内布局，hover 时增加阴影与位移。
4. BFC 实践：创建一个父容器阻止子元素的 margin 折叠，记录你选择的方式和原因。

进阶挑战：尝试把字体、字号、行高、色彩等抽象为 CSS 变量（design tokens），在多处复用。

---

## 常见问题（FAQ）

- Q：`em` 与 `rem` 的选择？
  - A：排版基准用 `rem` 更稳定；局部相对缩放（如按钮内图标随字体变化）可用 `em`。

- Q：什么时候使用 `inline-block`？
  - A：当需要在一行内排列但又能设置宽高/内外边距时；复杂布局更推荐 Flex/Grid（下一步将介绍）。

- Q：margin 折叠是“bug”吗？
  - A：不是，是规范设计。理解它后可以利用其特性，也要知道如何通过 BFC 控制它。

---

## 下一步预告
- 第 10 步：布局基础（position/float 简述）与 Flexbox 入门（主轴/交叉轴、对齐/换行、常见布局模式）。
- 第 11 步：CSS Grid 网格布局与响应式设计（媒体查询）。

完成本步后，打开演示页进行交互体验并完成综合练习：HTMLlearning/09_css_typography_box_model.html
