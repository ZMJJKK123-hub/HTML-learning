# 补充教程 02：安全基础

适用：前端常见安全风险与防护思路，便于在小项目中应用。

## 你将学到
- XSS：来源、类型、前端防护要点
- CSRF：原理、常见防御手段
- CSP：内容安全策略的基本配置
- CORS：同源策略与跨域请求的正确姿势
- 表单/存储校验：输入清洗、输出转义、最小暴露

---

## 核心风险速查
- **XSS（跨站脚本）**：
  - 反射型：参数直接拼进页面。
  - 存储型：恶意内容存数据库，再被渲染。
  - DOM 型：前端用 `innerHTML` 等不安全插入。
- **CSRF（跨站请求伪造）**：
  - 攻击者诱导受害者在已登录站点上下文发请求（凭证会自动带上）。
- **CORS 与同源策略**：
  - 浏览器限制脚本跨域访问；服务端决定是否放行，前端只能“请求”，不能“绕过”。

---

## XSS 防护要点
- **输出转义优先**：
  - DOM：使用 `textContent` / `setAttribute`，不要用 `innerHTML` 拼用户输入。
  - 模板：默认转义（如 React/ Vue 模板）。只有可信 HTML 时才用 `dangerouslySetInnerHTML`/`v-html`。
- **输入校验与清洗**：限制长度、字符集；必要时后端做 HTML 过滤/白名单。
- **CSP**：禁止内联脚本、限制可信域名。
- **库选择**：避免 eval/new Function；避免将用户输入当作脚本/URL 直接执行。

示例（避免 innerHTML 注入）：
```js
const input = '<img src=x onerror=alert(1) />';
const safe = document.getElementById('safe');
safe.textContent = input; // 渲染为纯文本，无执行
```

---

## CSRF 防护要点
- **SameSite Cookie**：`Set-Cookie: session=...; SameSite=Lax; Secure; HttpOnly`
- **CSRF Token**：表单或请求头携带服务端下发的 token，服务端验证。
- **双重提交 Cookie**：前端从 Cookie 读出 token 放到请求头/体，后端比对（需防重放）。
- **关键操作要求重验证**：如敏感操作加二次确认或重新登录。

---

## CSP（Content Security Policy）基础
- 作用：限制可执行脚本/样式/资源来源，降低 XSS 危害。
- 最小示例（响应头）：
```
Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'self';
```
- 常见放行：CDN 资源、API 域、字体域等。
- 开发模式可用 `Content-Security-Policy-Report-Only` 先观测违规。

---

## CORS 正确理解
- 浏览器阻挡跨域响应的读取，不是阻挡请求发出。
- 允许跨域必须由 **服务端** 设置：
  - 简单请求：`Access-Control-Allow-Origin: https://your.site`
  - 复杂请求需预检：额外返回 `Access-Control-Allow-Methods/Headers`。
  - 携带凭证：`Access-Control-Allow-Credentials: true` 且 Origin 不能是 `*`。
- 前端“解决跨域”常见方式：
  - 开发代理（如 Vite/webpack devServer 代理）。
  - 让后端正确配置 CORS。

---

## 表单与存储的安全习惯
- 输入长度/格式校验（邮箱、URL、手机号等）；错误提示不暴露内部信息。
- 本地存储：避免存敏感数据；若必须，设置过期/加密；Token 更佳放 HttpOnly Cookie（配合 SameSite/CORS 配置）。
- URL 参数与 hash：避免直接注入到 DOM；使用 `encodeURIComponent`，并用 `textContent` 呈现。
- 下载/文件：校验类型与大小；不要信任客户端 Mime。

---

## 最小实践清单（结合第 20 步项目）
1) 将所有用户输入渲染点改为 `textContent`（或模板默认转义），检查是否存在 `innerHTML` 拼接。
2) 为表单增加长度/格式校验，错误信息保持简洁。
3) 若有 Cookie，会话设置 `HttpOnly; Secure; SameSite=Lax`（示例配置即可）。
4) 增加 CSP 示例到说明文件：禁止内联脚本，只允许本站资源。
5) 开发环境跨域用本地代理；正式环境让 API 返回正确的 CORS 头。

---

## 进一步阅读
- MDN XSS：https://developer.mozilla.org/docs/Glossary/Cross-site_scripting
- MDN CSP：https://developer.mozilla.org/docs/Web/HTTP/CSP
- OWASP CSRF Cheat Sheet：https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html
- OWASP XSS Cheat Sheet：https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html
