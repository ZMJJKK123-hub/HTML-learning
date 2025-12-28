# CSS 第 10 步：布局基础与 Flexbox 入门

配套演示：HTMLlearning/10_css_layout_flexbox.html

## 学习目标
- 了解布局显示模型（display）与其差异：block/inline/inline-block。
- 掌握 position 的常见模式：static/relative/absolute/fixed/sticky。
- 理解 float 用途与局限，知道 clearfix 的必要性与写法。
- 系统掌握 Flexbox：容器与项目属性、常见布局模式与实践建议。
- 能构建导航栏、两栏布局与自适应卡片栅格，完成垂直居中与等高列。

---

## 1. 布局显示模型（display）

- block：独占一行，可设宽高、margin/padding。
- inline：不换行，宽高不生效，margin 仅左右生效。
- inline-block：不换行，但可设宽高，适合小组件。

```css
.block{ display:block }
.inline{ display:inline }
.inline-block{ display:inline-block }
```

实践建议：统一用 `gap` 管理容器内的间距，而不是让子项各自加 `margin`。

---

## 2. 定位（position）

- static：默认定位。
- relative：相对自身偏移，不脱离文档流；常用于作为绝对定位子元素的参照。
- absolute：绝对定位，脱离文档流，以最近的定位祖先为参照（否则以视口）。
- fixed：固定定位，参照视口，一直停留在屏幕同一位置。
- sticky：粘性定位，介于 relative 与 fixed 之间，滚动到阈值后“吸附”。

```css
.parent{ position:relative }
.child{ position:absolute; right:10px; top:10px }
```

---

## 3. 浮动（float）与清除（clearfix）

- 用途：图文环绕、早期列布局。
- 局限：易产生高度塌陷、对齐困难；现代布局优先 Flex/Grid。
- 清除浮动：

```css
.clearfix::after{ content:""; display:block; clear:both }
```

---

## 4. Flex 容器属性（父元素）

- `display: flex` 激活弹性布局。
- `flex-direction`：主轴方向（row/column）。
- `justify-content`：主轴对齐（start/center/space-between/...）。
- `align-items`：交叉轴对齐（stretch/start/center/...）。
- `align-content`：多行交叉轴对齐（当 `flex-wrap: wrap` 时生效）。
- `flex-wrap`：是否换行（nowrap/wrap）。
- `gap`：子项间距（优先推荐）。

```css
.container{ display:flex; flex-direction:row; justify-content:space-between; align-items:center; gap:12px }
```

---

## 5. Flex 项目属性（子元素）

- `flex-grow`：可用空间的放大比例（0/1/2…）。
- `flex-shrink`：不足空间时的缩小比例。
- `flex-basis`：初始主轴尺寸（可视作“理想宽度”）。
- 简写：`flex: grow shrink basis`。
- `order`：视觉顺序（不改变 DOM 顺序）。

```css
.item{ flex: 1 0 220px } /* grow=1 shrink=0 basis=220px */
.item{ order: 2 }
```

---

## 6. 常见布局模式示例

1) 导航栏（两端对齐）
```css
.navbar{ display:flex; justify-content:space-between; align-items:center }
.nav-links{ display:flex; gap:10px }
```

2) 两栏布局（侧边栏 + 主内容）
```css
.layout{ display:flex; gap:16px }
.sidebar{ flex:0 0 240px }
.content{ flex:1 1 auto }
```

3) 自适应卡片栅格
```css
.cards{ display:flex; flex-wrap:wrap; gap:12px }
.card{ flex:1 1 220px }
```

4) 垂直居中与等高列
```css
.center{ display:flex; align-items:center; justify-content:center }
.equal-cols{ display:flex } /* 同一容器内自然等高 */
```

---

## 7. 实战建议与陷阱

- 优先使用 `gap` 代替子元素 `margin`，更可控且无折叠问题。
- 布局伸缩优先使用 `flex-basis/grow/shrink`，避免“神奇宽度”。
- 使用媒体查询做小屏优化，如：
```css
@media (max-width: 640px){ .sidebar{ flex-basis: 180px } }
```
- `order` 仅改变视觉顺序，注意键盘导航与阅读顺序的可访问性影响。

---

## 综合练习

1. 导航栏：左 Logo + 中部链接 + 右操作区，窄屏时链接自动换行。
2. 三栏布局：左 200px，右 260px，中间自适应；小屏降级为上下布局。
3. 卡片列表：每行 3-5 个自适应卡片，统一间距与等高。
4. 完全垂直水平居中的登录面板（含按钮与输入框）。

进阶挑战：将以上布局提炼为可复用的 CSS 类或组件（原子类/设计系统）。

---

## 常见问题（FAQ）

- Q：Flex 与 Grid 如何选择？
  - A：一维布局（行或列）优先 Flex；二维网格优先 Grid。

- Q：`flex: 1` 等同于什么？
  - A：等同于 `flex: 1 1 0%`（多数浏览器实现），表示可以放大和缩小，基准宽度为 0。

- Q：为什么我设置的宽度不生效？
  - A：在 Flex 项目上，`flex-basis` 优先于 `width`；若同时设置，需确认 `flex` 相关属性与方向。

---

## 下一步预告
- 第 11 步：CSS Grid 网格布局与响应式设计（媒体查询与断点策略）。

完成本步后，打开演示页进行交互体验并完成综合练习：HTMLlearning/10_css_layout_flexbox.html
