# 补充教程 08：数据获取与状态库

## 你将学到
- TanStack Query/SWR：缓存、失效、重试、乐观更新
- Redux Toolkit / Pinia：全局可预测状态
- 何时用数据获取库 vs 全局状态库

---

## 数据获取库（服务器状态）
- 核心：缓存 + 状态机（loading/error/success）+ 失效策略 + 重试 + 乐观更新。
- TanStack Query（React/Vue/Svelte 均有适配）：
```js
const { data, isLoading, isError, refetch, mutate } = useQuery({
  queryKey: ['todos'],
  queryFn: fetchTodos,
  staleTime: 1000 * 60,
});
// 乐观更新（mutate）
useMutation({
  mutationFn: addTodo,
  onMutate: async (newTodo) => {
    await queryClient.cancelQueries(['todos']);
    const prev = queryClient.getQueryData(['todos']);
    queryClient.setQueryData(['todos'], (old = []) => [...old, newTodo]);
    return { prev };
  },
  onError: (_err, _newTodo, ctx) => queryClient.setQueryData(['todos'], ctx.prev),
  onSettled: () => queryClient.invalidateQueries(['todos']),
});
```
- SWR（React）：`const { data, error, mutate } = useSWR('/api/todos', fetcher, { dedupingInterval: 2000 });`

何时选：
- 需要缓存、失效、重试、乐观更新 → 选数据获取库。
- 数据来自服务器，随时可能过期 → 服务器状态库更适合。

---

## 全局状态库（本地状态）
- Redux Toolkit（React）：简化 reducer/immer，内置异步 thunk；适合可预测、可调试时间旅行的场景。
- Pinia（Vue）：以 store 为中心，支持 getters/actions，类型友好。
- 何时用：跨页面/深层组件共享、需要可追踪变更。

Redux Toolkit 示例：
```js
const slice = createSlice({
  name: 'theme',
  initialState: { mode: 'light' },
  reducers: {
    setMode: (state, action) => { state.mode = action.payload; }
  }
});
export const { setMode } = slice.actions;
```

Pinia 示例：
```js
export const useThemeStore = defineStore('theme', {
  state: () => ({ mode: 'light' }),
  actions: { setMode(mode) { this.mode = mode; } },
});
```

---

## 选择指引
- 服务器数据：用 Query/SWR；本地共享：用 Context/Pinia/Redux Toolkit。
- 先从简单开始：组件内状态 → Context/Provide → 数据获取库 → 必要时再引入全局状态库。

---

## 进一步阅读
- TanStack Query：https://tanstack.com/query/latest
- SWR：https://swr.vercel.app
- Redux Toolkit：https://redux-toolkit.js.org
- Pinia：https://pinia.vuejs.org
