# CSS 基础与选择器（第 8 步）

本教程从“如何编写 CSS”到“如何选中页面元素”循序渐进地讲解，配套演示页面：HTMLlearning/08_css_basics.html。

## 学习目标
- 了解 CSS 的三种使用方式：内联、内部、外部。
- 掌握基础选择器：类型、类、ID。
- 熟悉组合与层级选择器：后代、子代、并列、相邻兄弟、通用兄弟。
- 会用属性选择器与常见伪类/伪元素。
- 理解盒模型、常用属性、颜色与单位。
- 理解层叠与优先级，避免滥用 `!important`。

---

## 1. CSS 的三种使用方式

- 内联（inline）：直接写在元素的 `style` 属性中，优先级高，但不可复用，维护成本大。
- 内部（internal）：写在页面 `<style>` 标签中，适合小型页面或演示。
- 外部（external）：写到独立的 `.css` 文件中，通过 `<link rel="stylesheet" href="xxx.css">` 引入，最推荐的工程实践。

示例可见：HTMLlearning/08_css_basics.html 的第 1 部分。

建议：实际项目尽量使用外部样式，配合构建/压缩工具更易维护。

---

## 2. 基础选择器

- 类型选择器（标签选择器）：直接选中指定标签，如 `p { color: #374151 }`
- 类选择器：以 `.` 开头，如 `.highlight { background: #fffbeb }`
- ID 选择器：以 `#` 开头，如 `#unique-title { color: #10b981 }`（页面应唯一）

使用建议：
- 组件化场景优先使用类选择器，易复用且更灵活。
- ID 更适合少量唯一元素（如页面锚点）。

---

## 3. 组合与层级选择器

- 后代选择器（空格）：`.card p` 选 card 中所有 `p`。
- 子代选择器（>）：`.card > h4` 仅选 card 的直接子元素 `h4`。
- 并列选择器（,）：`.chip, .badge` 将同一组规则应用到多个选择器。
- 相邻兄弟（+）：`.title + .desc` 选中紧随其后的兄弟元素。
- 通用兄弟（~）：`.row ~ .row-note` 选中后续所有兄弟元素中的匹配项。

使用建议：
- 优先使用简短且语义明确的选择器，避免过度依赖多层级选择器导致高耦合。

---

## 4. 属性选择器

- 基本用法：`a[target="_blank"] { color: #2563eb }`
- 前缀匹配：`input[placeholder^="请输入"] { background: #eff6ff }`
- 精确匹配：`input[type="email"] { border: 1px solid #60a5fa }`

适用场景：
- 表单样式增强、根据链接属性设定样式、批量控制相同属性的元素。

---

## 5. 伪类与伪元素

- 常见伪类：`:hover`（悬停）、`:focus`（聚焦）、`:active`（按下）、`:nth-child()`（序号）
- 常见伪元素：`::before` / `::after`（内容前/后修饰）、`::selection`（文本选中高亮）

示例：
```css
.link:hover { color: #ef4444 }
.btn:focus { outline: 3px solid rgba(102,126,234,0.35) }
.list li:nth-child(odd) { background: #f9fafb }
.pill::before { content: "• " }
.pill::after { content: " ✓" }
::selection { background: #fde68a }
```

使用建议：
- 交互提示如 hover/focus 有助于可访问性与操作反馈。
- `::before/::after` 常用于添加装饰性内容（不影响真实 DOM 文本）。

---

## 6. 盒模型（Box Model）与常用属性

盒模型组成：内容（content）、内边距（padding）、边框（border）、外边距（margin）。

- `box-sizing: border-box`：更易计算总尺寸（宽高包含 padding+border）。
- 常用属性：`color`、`background`、`font`、`text` 系列、`border`、`margin`、`padding`、`width/height`。

示例（见演示页第 6 部分）：
```css
.box { width: 160px; padding: 12px; border: 3px solid; margin: 10px; box-sizing: border-box }
```

---

## 7. 颜色与单位

- 颜色：`#hex`、`rgb()`、`hsl()`（推荐 HSL 做主题：更易调整色相/饱和度/亮度）。
- 单位：`px`（绝对像素）、`em/rem`（相对字体大小）、`%`（相对父元素）、`vw/vh`（视口宽高）。

建议：
- 字体与间距：多用 `rem` 与 `%`，更易全局缩放与响应式。
- 布局：结合 `flex/grid` 和 `minmax()`/`fr` 单位（后续课程详解）。

---

## 8. 层叠与优先级（Specificity）

优先级规则（从高到低）：
- 内联样式 > ID 选择器 > 类/属性/伪类 > 标签选择器
- 后出现的规则会覆盖同优先级的先出现规则（就近原则）。
- `!important` 能强制提高优先级，但会降低维护性，应谨慎使用。

示例（见演示页第 8 部分）：
```css
.emphasis { color: #ef4444 }
#priority-strong .emphasis { color: #10b981 }
.force { color: #6366f1 !important }
```

实践建议：
- 通过合理的样式结构与类命名控制优先级，不依赖 `!important`。

---

## 9. 综合练习（基于演示页）

1. 新增一个卡片组件：
   - 标题使用类选择器设为品牌色。
   - 描述文字使用后代选择器设为次要色。
2. 新增一个按钮：
   - 悬停（:hover）时略微变暗。
   - 聚焦（:focus）时显示可访问性轮廓。
3. 为列表添加奇偶行背景和前缀/后缀符号：
   - `li:nth-child(odd/even)` 设置不同背景。
   - 用 `::before`/`::after` 添加符号修饰。

---

## 常见问题（FAQ）

- Q：选择器应该如何组织？
  - A：以组件为单位，优先使用类选择器；避免过深的层级选择器，提高样式的可复用性与可维护性。

- Q：`em` 与 `rem` 有何区别？
  - A：`em` 相对当前元素字体大小；`rem` 相对根元素（`html`）字体大小。通常用 `rem` 做全局排版比例更稳定。

- Q：什么时候使用 `!important`？
  - A：尽量避免。当存在第三方样式覆盖且难以改动时，作为最后手段使用，并在代码评审中明确原因。

---

## 下一步预告
- 第 9 步：盒模型进阶与排版（文本与字体细节）。
- 第 10 步：布局基础（display/position/float），以及 Flexbox 入门。
- 第 11 步：Grid 布局与响应式设计（媒体查询）。

完成本步后，请打开演示页面进行交互体验并完成综合练习：HTMLlearning/08_css_basics.html。
