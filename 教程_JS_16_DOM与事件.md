# JavaScript 第 16 步：DOM 与事件

配套演示：HTMLlearning/16_js_dom_events.html

## 目标
- 熟练选择与更新 DOM：querySelector/All、textContent、classList、style。
- 掌握事件模型：捕获/冒泡、默认行为、阻止默认、stopPropagation（了解）。
- 能写事件委托：在容器上监听，利用事件冒泡，减少绑定数量。
- 处理表单与校验：阻止默认提交、读取表单值、简单规则提示。
- 了解节流/防抖的动机与实现，减轻高频事件压力。

---

## 1. DOM 选择与更新
- 选择：`querySelector` / `querySelectorAll`，适度使用 id / class 作为锚点。
- 更新：textContent/innerHTML（避免不信任输入）、classList（add/remove/toggle）。
- 样式：优先通过类控制；少量演示可以直接改 style。

## 2. 事件模型与监听
- 绑定：`el.addEventListener('click', handler)`；少用 `onclick` 内联。
- 冒泡与捕获：默认冒泡；如需捕获可传 `{ capture: true }`。
- 阻止默认：`event.preventDefault()`（表单提交、链接跳转）。
- 停止冒泡（了解）：`event.stopPropagation()` 仅在必要时使用。

## 3. 事件委托
- 思想：把监听绑在父容器上，根据 `event.target` 判断真实触发源。
- 好处：新元素无需重新绑定；减少监听数量。
- 示例：
  ```js
  list.addEventListener('click', (event) => {
    if (event.target.matches('button.remove')) {
      // 处理删除
    }
  });
  ```

## 4. 表单与校验
- 阻止默认提交：`form.addEventListener('submit', e => e.preventDefault())`。
- 读取值：`input.value` / `textarea.value`；记得 `trim()`。
- 简单规则：长度、必填、格式（邮箱包含 @）。
- 状态提示：用状态元素显示错误/成功，避免弹窗。

## 5. 节流与防抖（概念）
- 防抖 debounce：等输入停顿再触发（如搜索建议）。
- 节流 throttle：按间隔触发（如滚动监听）。
- 简易防抖实现：
  ```js
  function debounce(fn, delay = 300){
    let t; return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), delay); };
  }
  ```

---

## 实践任务
1) 待办列表：支持添加、删除（委托），展示数量；刷新页面可重建初始 3 条假数据。
2) 表单校验：增加“必填”与“最小长度”提示，邮箱格式不符时高亮输入框。
3) 防抖搜索：输入框 300ms 防抖，展示“正在搜索…”/“结果就绪”状态；空值时清除状态。
4) 事件委托加分：在待办列表加“完成切换”按钮，点击切换完成态（添加类名并样式）。

---

## 小提示
- 事件回调内尽量用 const/let 并保持函数纯净（无副作用时更易测试）。
- 能用 class 控制样式就不要在 JS 里大把 set style。
- 委托时用 `matches()` 或 `closest()` 判断目标。
- 表单重置可用 `form.reset()`，同时清空状态提示。
