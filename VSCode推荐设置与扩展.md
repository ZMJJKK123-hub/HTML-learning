# VS Code 推荐设置与扩展

适用：提升在 VS Code 中学习与开发本项目的效率。

## 推荐扩展
- Live Server：本地预览 HTML，自动刷新
- ESLint：代码规范检查（结合工程化专题）
- Prettier：统一格式（结合工程化专题）
- HTML CSS Support / IntelliSense：补全与提示
- Markdown All in One：优化编写教程与笔记
- GitLens：版本与变更追踪

## 基础设置建议
- Editor：
  - formatOnSave: true（结合 Prettier）
  - tabSize: 2 / insertSpaces: true（统一缩进）
- Files：
  - exclude 临时产物（如 dist/）
- Terminal：
  - 使用内置终端运行静态服务或构建命令

## 使用技巧
- 在工作区根目录打开 `HTMLlearning/`，便于导航
- 右键 HTML → Open with Live Server 预览演示文件
- 用分屏对照教程与演示 HTML/JS，边看边改

## 下一步
- 结合“工程化与测试”添加基础 ESLint/Prettier 配置与脚本
- 为综合项目逐步引入 TypeScript（可从 `// @ts-check` 开始）