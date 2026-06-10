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
- [x] 增加 Vue 适配 → 验证：`vue-ui`、`vue-ai`、`playground-vue` 可测试、可构建、可预览
- [x] 统一 React / Vue playground → 验证：`pnpm dev` 可在同页切换 React 和 Vue
- [x] 扩展核心 UI 覆盖 → 验证：Typography、Select、Checkbox、RadioGroup、List、Table 在 React/Vue 中可测试、可构建、可预览

## 复盘

- 已搭建 `pnpm workspace`，包含 `tokens`、`react-ui`、`react-ai`、`playground-react`。
- 已补 `README.md` 和 `docs/examples/*` 示例。
- 已将 playground 扩展为正式预览项目，包含总览、react-ui、react-ai、tokens 四个页面。
- `pnpm test` 通过：`react-ui` 2 个测试，`react-ai` 2 个测试，`playground-react` 2 个测试。
- `pnpm build` 通过：tokens、react-ui、react-ai、playground-react 均完成构建。
- 浏览器检查：四个导航页可打开，桌面和 375px 移动端无页面级横向溢出。
- 已增加 `vue-ui`、`vue-ai`、`playground-vue`，并补 `pnpm dev:vue`。
- Vue playground 包含总览、vue-ui、vue-ai、tokens 四个页面，覆盖基础组件和 AI 场景组件。
- 最新 `pnpm test` 通过：React、Vue 两套包和两个 playground 均通过。
- 最新 `pnpm build` 通过：React、Vue 两套包和两个 playground 均完成构建。
- Vue 浏览器检查：`http://127.0.0.1:5175/` 桌面四页可切换，375px 移动端无页面级横向溢出。
- 已新增统一入口 `@design-system/playground`，`pnpm dev` 默认打开统一预览。
- 统一 playground 可在同一页面切换 React / Vue，并共用总览、UI、AI、tokens 四页导航。
- 统一 playground 浏览器检查：`http://127.0.0.1:5176/` 桌面 React/Vue 与 UI/AI/tokens 可切换，移动端无页面级横向溢出。
- 已扩展核心 UI 覆盖：Typography、Select、Checkbox、RadioGroup、List、Table。
- 新增组件已同时覆盖 React/Vue 包、统一 playground 和独立 React/Vue playground。
- 核心 UI 浏览器检查：`http://127.0.0.1:5176/` 桌面和 375px 移动端 React/Vue UI 页无页面级横向溢出。
