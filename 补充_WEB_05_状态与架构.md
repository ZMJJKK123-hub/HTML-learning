# 补充教程 05：状态与架构

适用：理解页面架构选择、路由与状态管理的基础模式。

## 你将学到
- SPA vs MPA 的取舍
- 路由基础与懒加载
- 状态分类：局部/共享/服务器状态
- 模式：Context、事件总线、简单 store、数据获取与缓存、乐观更新
- 组件设计：容器/展示、复合组件模式

---

## 架构选择
- **MPA（多页）**：首屏快，SEO 友好；页面跳转全刷新，前端复杂度低。
- **SPA（单页）**：无刷新跳转，前后端分离；需路由、状态、首屏优化、SEO 方案（SSR/预渲染）。
- 小项目可用 MPA + 少量增强；需要富交互或类似后台的场景再选 SPA。

---

## 路由基础
- 客户端路由核心：监听 `popstate`，`pushState/replaceState` 改变 URL，按路径渲染视图。
- 懒加载：按路由分包，进入页面时再动态导入对应模块。

示例（极简路由片段）：
```js
const routes = {
  '/': () => show('home'),
  '/about': () => show('about'),
};
function navigate(path) {
  history.pushState({}, '', path);
  routes[path]?.();
}
window.addEventListener('popstate', () => routes[location.pathname]?.());
```

---

## 状态分类与模式
- **局部状态**：组件内部使用（输入框、切换开关）。
- **共享状态**：主题、登录用户、购物车等跨组件数据。
- **服务器状态**：接口数据，需包含加载/错误/过期/刷新逻辑。

常见模式：
- **Context（或事件总线）**：小型共享，避免层层传参。
- **简单 store**：维护 `state + listeners`，提供 `getState/subscribe/setState`。
- **数据获取与缓存**：封装 fetch，加入缓存/过期/重试；视图监听数据源变化。
- **乐观更新**：先更新 UI，再提交；失败时回滚并提示。

最小 store 示例：
```js
const createStore = (init) => {
  let state = init;
  const listeners = new Set();
  const setState = (patch) => {
    state = { ...state, ...patch };
    listeners.forEach((l) => l(state));
  };
  const subscribe = (fn) => (listeners.add(fn), () => listeners.delete(fn));
  return { getState: () => state, setState, subscribe };
};
```

---

## 组件设计模式
- **容器/展示组件**：容器处理数据/状态，展示组件只管渲染和事件回调。
- **复合组件**：通过上下文共享状态（如 Tabs、Modal、Dropdown），子组件通过约定组合使用。
- **解耦副作用**：数据获取、计时器、事件监听单独封装，便于测试和重用。

---

## 应用到第 20 步项目的建议
1) 提取全局状态（主题/任务列表/异步数据）到一个简单 store，视图订阅变更。
2) 路由：如需多视图，可用极简 hash 路由或 pushState 路由并做懒加载模块。
3) 数据层：封装 fetch，加入缓存与重试；加载/错误/空状态统一管理。
4) 乐观更新：任务新增/删除先更新 UI，再落库（或模拟 API）；失败时回滚并 Toast。

---

## 进一步阅读
- 前端路由原理：https://developer.mozilla.org/docs/Web/API/History_API
- React 状态管理模式综述（可类比思路）：https://react.dev/learn/choosing-the-state-structure
- 乐观更新思路（参考 React Query 文档）：https://tanstack.com/query/latest/docs/react/guides/optimistic-updates
