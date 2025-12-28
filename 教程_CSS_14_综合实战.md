# CSS 第 14 步：综合实战小站

配套演示：HTMLlearning/14_css_capstone_practice.html

## 目标
- 将前 8–13 步的核心点整合到一个页面：tokens/主题、Flex+Grid、表单、动效与可访问性偏好。
- 练习工程化组织：@layer 分层、:where/:is 控制特异性、变量驱动主题。
- 打通交互：按钮状态、表单聚焦/校验态、加载与完成反馈。

---

## 页面结构与要点
- 主题切换：`data-theme` + localStorage，含浅/深/系统模式。
- Hero 模块：栅格排版 + clamp 字体层次；统计卡片使用 tokens。
- 报名表单：聚焦态高亮、下拉选择、复选框；按钮提交模拟。
- 亮点卡片：Grid 自适应，hover 轻微动效；标签用 Flex wrap。
- 反馈：引用样式 + 左边框强调，可拓展为轮播/淡入淡出。
- 动效：淡入（keyframes），在 `prefers-reduced-motion` 下禁用。

---

## 练习任务（建议独立完成）
1) 表单校验：为必填项添加错误态（边框+提示），校验失败时阻止提交。  
2) 卡片动效：为卡片 hover 添加轻微 rotate/tilt，并确保深色模式对比度。  
3) 响应式栅格：亮点卡片在 640px 下 1 列，960px 下 2 列，1200px 以上 3 列。  
4) 按钮加载态：点击后显示 spinner，禁用按钮；完成后恢复。  
5) 反馈轮播：实现淡入淡出或左右滑动；在 `prefers-reduced-motion` 时降级为静态。

可选加分：
- 提炼 tokens：颜色、间距、字号、圆角、阴影全由变量驱动；
- 将表单拆为分步流程，增加进度条；
- 为标签支持键盘导航，保证 focus 可见。

---

## 参考实现提示
- 主题：`html[data-theme="dark"]{ ... }`；按钮切换 + localStorage 记忆。
- 栅格：`grid-template-columns: repeat(auto-fit, minmax(240px, 1fr))`；断点用 media queries。
- 动效：只动画 `transform/opacity`；`@media (prefers-reduced-motion: reduce){ animation: none; transition: none; }`
- 分层：`@layer base, components, utilities;`；工具类（gap/flex/margin）用于快速微调。

---

## FAQ
- Q：为什么要用 tokens？
  - A：统一视觉语言，便于主题与大规模修改；减少硬编码颜色/尺寸。
- Q：如何避免特异性冲突？
  - A：用类 + @layer + :where 降低特异性；少用后代链条，避免 !important。
- Q：prefers-reduced-motion 必须吗？
  - A：是最佳实践，兼顾可访问性；动画可在此条件下禁用或弱化。

---

## 下一步建议
- 在此基础上扩展为完整 landing page，补充导航锚点、FAQ、价格卡、页脚 CTA。
- 引入构建工具或 CSS 框架做对比（如 Tailwind/原子类 vs BEM 组件），观察命名/特异性/维护性的差异。
