# 补充教程 09：后端基础（前端视角）

## 你将学到
- REST 设计要点、错误码规范
- GraphQL 基本概念
- 鉴权：Session vs JWT
- CRUD 与数据校验

---

## REST 速查
- 路径名词化：`/users`、`/users/{id}`。
- 方法语义：GET 读、POST 建、PUT 全量改、PATCH 局部改、DELETE 删。
- 状态码：200/201/204 成功；400/401/403/404/409/422/429/500 常见。
- 错误体建议：`{ code: 'USER_NOT_FOUND', message: '...' }`，便于前端映射。
- 版本：`/api/v1` 或 Header。

---

## GraphQL 概览
- 单一端点 `/graphql`，按需查询字段，减少 over-fetch/under-fetch。
- 概念：Schema、Query/Mutation/Subscription、Resolver。
- 适用：前端字段灵活、跨多端、聚合多服务；但需缓存/错误/权限的额外设计。

---

## 鉴权与会话
- **Session + Cookie**：服务端存会话，前端用 Cookie；配合 `HttpOnly; Secure; SameSite`。
- **JWT**：自包含凭证，前端存储需谨慎（尽量 HttpOnly Cookie）；注意过期与刷新（Refresh Token）。
- 接口保护：需鉴权的接口返回 401/403；前端处理跳转登录或提示。

---

## CRUD 与校验
- 服务端必须校验：必填、长度、类型、权限；错误码和 message 不泄露内部细节。
- 幂等与乐观锁：PUT 应幂等；并发更新可用版本号/If-Match。

---

## 前后端协作建议
- 约定错误码与 message，前端做映射与本地化。
- 定义分页、排序、过滤协议（如 `?page=1&pageSize=20&sort=createdAt:desc`）。
- Mock：使用 Swagger/OpenAPI 或 Mock 服务；前端可本地代理。

---

## 进一步阅读
- REST 设计指南：https://restfulapi.net
- OpenAPI/Swagger：https://swagger.io
- GraphQL 官方文档：https://graphql.org/learn/
