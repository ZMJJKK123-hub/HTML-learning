# 补充教程 14：安全进阶

## 你将学到
- OAuth2 / OIDC 授权与登录流程
- 传输安全与敏感数据处理
- 文件上传/下载安全
- 依赖安全与扫描

---

## OAuth2 / OIDC 概览
- OAuth2：授权协议；常见流：授权码（含 PKCE）、客户端凭证、刷新令牌。
- OIDC：在 OAuth2 之上添加身份层（ID Token）。
- 前端实践：
  - 公共客户端使用 授权码 + PKCE；避免隐式流。
  - 回调中校验 state、防重放；存储 Token 时倾向 HttpOnly Cookie。

---

## 传输与存储安全
- 全站 HTTPS；HSTS（`Strict-Transport-Security`）。
- 敏感信息不进入前端包、不写入日志。
- 本地存储谨慎：Token 尽量放 HttpOnly Cookie；若必须存储，设置过期并加密。

---

## 文件上传/下载
- 上传：限制类型与大小，在后端做白名单校验；避免将用户文件直接当静态资源回显。
- 下载：设置正确的 `Content-Disposition`，避免在浏览器内执行；对导出数据做权限校验。

---

## 依赖安全
- 定期运行 `npm audit` 或使用 `pnpm audit`；关注高危漏洞。
- 锁定版本并最小化依赖；使用 Dependabot/Snyk 等自动提醒。

---

## 落地建议
1) 若集成第三方登录，选择 OAuth2 授权码 + PKCE，验证 state/nonce。
2) 前端不存长效敏感 Token；使用 HttpOnly Cookie + SameSite + 短期有效。
3) 文件上传功能加大小/类型限制，后端扫描/转存，避免直接可执行。
4) 在 CI 加入依赖安全扫描，定期更新依赖。

---

## 进一步阅读
- OAuth2：https://oauth.net/2/
- OIDC：https://openid.net/connect/
- OWASP 安全指南：https://owasp.org
