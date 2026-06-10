# Design System 搭建任务

## 目标

按 `prompt.md` 和 `组件样式要求.md` 搭建最小可运行 monorepo：

- `@design-system/tokens`
- `@design-system/react-ui`
- `@design-system/react-ai`
- `apps/playground-react`

## 假设

- 当前目录为空项目，不是现有代码改造。
- 包名使用 npm 规范小写：`@design-system/*`。
- 工程底座使用 `pnpm workspace + Vite + TypeScript + Tailwind + tsup`。
- 不引入后端、数据库、真实模型 API、复杂状态管理、Storybook。
- 视觉只使用黑白灰和少量状态色，颜色来自 CSS Variables。

## 执行清单

- [x] 初始化 workspace 和基础配置 → 验证：`pnpm install` 可完成
- [x] 写组件行为测试 → 验证：测试先因缺少实现失败
- [x] 建 `packages/tokens` → 验证：CSS variables 可被 playground 引入
- [x] 建 `packages/react-ui` → 验证：基础组件可渲染并通过测试
- [x] 建 `packages/react-ai` → 验证：AI 组件可组合并通过测试
- [x] 建 `apps/playground-react` → 验证：mock Assistant 页面可构建
- [x] 运行完整验证 → 验证：`pnpm test`、`pnpm build` 通过
- [x] 启动 playground → 验证：浏览器可打开页面，布局无明显错误
- [x] 补正式预览展厅 → 验证：总览、react-ui、react-ai、tokens 四页可浏览

## 复盘

- 已搭建 `pnpm workspace`，包含 `tokens`、`react-ui`、`react-ai`、`playground-react`。
- 已补 `README.md` 和 `docs/examples/*` 示例。
- 已将 playground 扩展为正式预览项目，包含总览、react-ui、react-ai、tokens 四个页面。
- `pnpm test` 通过：`react-ui` 2 个测试，`react-ai` 2 个测试，`playground-react` 2 个测试。
- `pnpm build` 通过：tokens、react-ui、react-ai、playground-react 均完成构建。
- 浏览器检查：四个导航页可打开，桌面和 375px 移动端无页面级横向溢出。
