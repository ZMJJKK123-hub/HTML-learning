# 补充教程 03：可访问性与国际化

适用：让页面对更多用户可用，并为多语言/多地区做准备。

## 你将学到
- 可访问性：语义、键盘可达性、颜色对比、ARIA、动态提示
- 国际化：文案抽取、日期/数字格式、RTL 适配、字体与排版

---

## 可访问性核心要点
- **语义优先**：用 button/a/label/form，而非 div 充当按钮；标题层级顺序合理。
- **键盘可达**：确保 Tab 可聚焦；自定义控件加 `tabindex="0"` 并处理 Enter/Space；隐藏时移除可聚焦性。
- **颜色对比**：正文/图标对比 ≥ 4.5:1；用 DevTools/插件检查；提供 hover/active 的可见状态。
- **ARIA**：
  - 仅在语义不足时补充；例如 Tabs：`role="tablist"`、`role="tab"`、`role="tabpanel"`，通过 `aria-controls/aria-labelledby` 关联。
  - Toast/状态提示用 `aria-live="polite" aria-atomic="true"`。
- **焦点管理**：弹窗/侧栏打开时将焦点移入，关闭后归还触发点；可用 `focus()` 和保存 lastFocused。

键盘示例（Tabs 切换）：
```js
tabList.addEventListener('keydown', (e) => {
  const current = document.activeElement;
  const tabs = [...tabList.querySelectorAll('[role="tab"]')];
  const idx = tabs.indexOf(current);
  if (idx < 0) return;
  if (e.key === 'ArrowRight') tabs[(idx + 1) % tabs.length].focus();
  if (e.key === 'ArrowLeft') tabs[(idx - 1 + tabs.length) % tabs.length].focus();
});
```

---

## 国际化核心要点
- **文案抽取**：不要硬编码 UI 文案，使用文案表（JSON）按 locale 读取。
- **日期/数字格式**：使用 `Intl.DateTimeFormat`、`Intl.NumberFormat`，避免手写；货币/百分比要用 locale。
- **方向与排版**：RTL 语言设置 `dir="rtl"`；使用逻辑属性（margin-inline-start）替代 left/right；字体需包含目标字符集。
- **动态切换**：保存当前语言到 localStorage；切换时刷新文案与 `lang`/`dir`。

国际化示例：
```js
const messages = {
  'en': { hello: 'Hello', submit: 'Submit' },
  'zh': { hello: '你好', submit: '提交' }
};
let locale = localStorage.getItem('locale') || 'en';
const t = (key) => messages[locale][key] || key;

document.documentElement.lang = locale;
document.querySelector('#hello').textContent = t('hello');
```

日期/数字：
```js
const fmtDate = new Intl.DateTimeFormat(locale, { dateStyle: 'medium' });
const fmtNumber = new Intl.NumberFormat(locale, { style: 'currency', currency: 'USD' });
```

---

## 检查清单（应用到第 20 步项目）
- 所有交互控件可用键盘操作；tab 顺序与视觉一致。
- 颜色对比通过 4.5:1；hover/active/focus 状态可见。
- Toast、加载、错误信息有文字提示并位于可见区域；ARIA live 正确。
- 文案集中管理，允许切换语言；日期/数字用 Intl；如有 RTL，使用逻辑属性并设置 dir。

---

## 进一步阅读
- WAI-ARIA 基础：https://developer.mozilla.org/docs/Learn/Accessibility/WAI-ARIA_basics
- 对比度指南：https://www.w3.org/TR/WCAG21/#contrast-minimum
- Intl API：https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl
