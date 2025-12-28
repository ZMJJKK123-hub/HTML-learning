# 补充教程 07：前端框架与 SSR/预渲染

## 你将学到
- React/Vue/Svelte 的共性：组件、状态、事件、属性传递
- 路由与状态管理基础
- SSR/预渲染（SSG）的动机与流程

---

## 组件与状态（共性）
- 组件即函数（或对象）+ props + 状态。最小心智模型：`render(state, props) -> UI`。
- 事件绑定：React `onClick`，Vue `@click`，Svelte `on:click`。
- 条件/列表：React `condition &&` / `map`；Vue `v-if` / `v-for`；Svelte `{#if}` / `{#each}`。
- 状态：React `useState`，Vue `ref/reactive`，Svelte `let count = 0;` 赋值即更新。

示例（React 函数组件）：
```jsx
function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
}
```

---

## 路由基础
- SPA 路由 = 监听 URL 变化，按 path 渲染组件。
- React Router：`<BrowserRouter><Routes><Route path="/" element={<Home/>}/></Routes></BrowserRouter>`。
- Vue Router：在 `createRouter` 中定义 routes，模板用 `<RouterLink>`、`<RouterView>`。
- 懒加载：路由组件用动态导入，减少首屏包。

---

## 状态管理
- 何时需要全局：主题、登录用户、跨页面共享数据。
- 轻量方案：React Context + Reducer；Vue 提供 `provide/inject`；Svelte store（`writable`）。
- 独立库：Redux Toolkit（React）、Pinia（Vue）。

---

## SSR 与预渲染
- **动机**：更快首屏/SEO/爬虫友好；减少白屏时间。
- **模式**：
  - SSR（服务端渲染）：每次请求在服务器渲染 HTML，再在客户端 hydrate。
  - SSG（预渲染）：构建时生成静态 HTML，适合内容相对静态的页面。
- React：Next.js（混合 SSR/SSG）；Vue：Nuxt；Svelte：SvelteKit。
- 数据获取：在服务端取数据并注入 HTML；客户端再接管。

---

## 最小上手路径（建议）
1) 选 React 或 Vue：
   - React：`npm create vite@latest my-app -- --template react`。
   - Vue：`npm create vite@latest my-app -- --template vue`。
2) 实现：计数器 → 列表渲染 → 表单 → 路由多页。
3) 体验 SSR/SSG：
   - React：试 Next.js `npx create-next-app`，写一个 SSR 页面（getServerSideProps）和一个 SSG 页面（getStaticProps）。
   - Vue：试 Nuxt `npx nuxi init`，写一个使用 `useAsyncData` 的页面。
4) 对比：首屏速度、SEO、路由跳转体验。

---

## 进一步阅读
- React 官方文档：https://react.dev
- Vue 官方文档：https://vuejs.org
- Svelte 官方文档：https://svelte.dev
- Next.js：https://nextjs.org
- Nuxt：https://nuxt.com
