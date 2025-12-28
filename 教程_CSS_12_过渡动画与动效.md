# CSS 第 12 步：过渡、变换与动画动效

配套演示：HTMLlearning/12_css_transitions_animations.html

## 学习目标
- 了解过渡（transition）：属性、时长、缓动、延迟与多属性组合。
- 掌握变换（transform）：translate/scale/rotate/skew、transform-origin、3D 基础（perspective、preserve-3d、backface-visibility）。
- 编写关键帧动画（@keyframes）：入场、强调、加载动效；理解 animation 各参数与 play-state 控制。
- 优化性能：只动画 transform/opacity、合理使用 will-change。
- 兼顾可访问性：使用 `prefers-reduced-motion` 尊重用户减少动态偏好；平滑滚动降级。

---

## 1. 过渡（transition）

- 语法：`transition: <property> <duration> <timing-function> <delay>`
- 多属性：用逗号分隔多个过渡项。
- 缓动：`ease|linear|ease-in|ease-out|ease-in-out|cubic-bezier(...)`

```css
.btn{ transition: background-color .25s ease, transform .25s ease }
.card{ transition: box-shadow .3s cubic-bezier(.22,.61,.36,1), transform .3s cubic-bezier(.22,.61,.36,1) }
```

建议：优先对 `transform/opacity` 做过渡——更高性能且避免重排。

---

## 2. 变换（transform）

- 2D：`translate(x,y)`、`scale()`、`rotate()`、`skew()`
- 原点：`transform-origin: center|left top|x y`（%/px）
- 3D：容器 `perspective`，子元素 `transform-style: preserve-3d`；背面隐藏 `backface-visibility: hidden`。

```css
.scene{ perspective: 800px }
.flip{ transform-style: preserve-3d; transition: transform .6s ease }
.flip:hover{ transform: rotateY(180deg) }
.face{ backface-visibility: hidden }
```

---

## 3. 关键帧动画（animation）

- 语法：`animation: <name> <duration> <timing> <delay> <iteration-count> <direction> <fill-mode> <play-state>`
- 常见：
  - 入场（slide/fade/scale）
  - 强调（pulse/bounce）
  - 加载（spin/dots）

```css
@keyframes pulse{ 0%,100%{ transform:scale(1) } 50%{ transform:scale(1.08) } }
.el{ animation: pulse 1.2s ease-in-out infinite }
.el.is-paused{ animation-play-state: paused }
```

可组合：利用 `animation-delay` 实现队列入场（瀑布式出现）。

---

## 4. 性能优化要点

- 仅动画 `transform` 与 `opacity`（合成层友好）。
- 谨慎使用 `will-change`，避免无节制导致内存与栈压力：
  - 仅在即将发生变换前添加，结束后移除；
  - 批量动画或复杂场景才考虑。
- 控制范围与频率：缩小重绘区域、降低动画时长或循环次数。

```css
.badge{ will-change: transform } /* 仅在动画前短时启用 */
```

---

## 5. 可访问性与动效偏好

- 用户可能在系统中启用了“减少动态”设置。
- 使用媒体查询进行适配：禁用动画/过渡、关闭平滑滚动。

```css
html{ scroll-behavior: smooth }
@media (prefers-reduced-motion: reduce){
  *{ animation: none !important; transition: none !important }
  html{ scroll-behavior: auto }
}
```

内容同样应可用：禁用动效后不应影响交互与信息表达。

---

## 综合练习

1) 仅用 `transform/opacity` 为按钮做悬停与按下反馈。  
2) 实现 3D 翻转卡片（hover 旋转，背面展示细节）。  
3) 列表入场动画：使用 `animation-delay` 让子项依次出现。  
4) 增加 `prefers-reduced-motion` 适配，提交前自测。

进阶挑战：尝试封装一组通用动效类（例如 `.fade-in`、`.slide-up`、`.spin`），并在多个组件中复用。

---

## 常见问题（FAQ）

- Q：为什么动画会卡顿？
  - A：检查是否动画了 `width/height/top/left` 等触发布局的属性，改用 `transform`；减少阴影/模糊半径；缩短时长或减少并行动画数量。

- Q：什么时候使用 JS 控制动画？
  - A：当需要状态机、更复杂的时间线或滚动侦听时；简单交互优先 CSS 动效，复杂场景再考虑 JS 或动画库。

- Q：如何暂停/恢复动画？
  - A：使用 `animation-play-state` 或切换类名；对可访问性，提供显式开关。

---

## 下一步预告
- 第 13 步（可选）：CSS 变量与主题系统、层叠与作用域（Cascade/Scope）、BEM 与原子化设计风格对比。

完成本步后，打开演示页并完成练习：HTMLlearning/12_css_transitions_animations.html
