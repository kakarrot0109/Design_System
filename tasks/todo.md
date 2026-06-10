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

## 页面精细化任务

### 假设

- 目标页面是统一入口 `@design-system/playground`，不是独立 React/Vue playground。
- 只解决“大块、像被缩放”的视觉问题，不新增组件、不改组件 API。
- 保持 shadcn/ui、AI Elements、assistant-ui 的克制黑白灰方向。
- React 和 Vue 预览需要同步变细，不能只改 React。

### 成功标准

- 桌面端页面不再像等权重展板：主示例、次示例、辅助信息有明显层级。
- 移动端 375px 无页面级横向溢出，导航、卡片、对话示例不互相挤压。
- React/Vue 的总览、UI、AI、tokens 四页仍可切换。
- `pnpm test`、`pnpm build` 通过。

### 执行清单

- [x] 确认视觉方向 → 验证：用户选择方案后再开始改代码
- [x] 收紧统一 playground 外层布局 → 验证：桌面截图中顶部和内容区不再显得被放大
- [x] 精细化 `PreviewSection`、指标块、参考项 → 验证：卡片密度更接近工具型界面
- [x] 调整总览页 Assistant 示例高度和侧栏节奏 → 验证：首屏能看到更多层级，不只是一块大聊天面板
- [x] 调整 UI/AI/tokens 展示区密度 → 验证：组件仍完整展示，但单个模块视觉权重降低
- [x] 同步 Vue 预览渲染结构 → 验证：Vue 模式和 React 模式观感一致
- [x] 跑测试和构建 → 验证：`pnpm test`、`pnpm build`
- [x] 浏览器验收桌面和 375px 移动端 → 验证：截图无大块感、无横向溢出

### 本轮观察

- 总览页 Assistant 示例外层约 754px 高，内部 ChatPanel 固定 720px，是“大块感”的主要来源。
- UI 页大量区块使用 `gap-6`、`p-4`、满宽 `max-w-7xl`，导致每个 demo 像同权重大卡片。
- Typography demo 内部的 `h1`、`h2` 是组件能力展示，但在页面里抢了真实页面标题层级。
- 移动端没有页面级横向溢出，但 720px 对话示例在 375px 宽下压迫感明显。

## 页面交互增强任务

### 假设

- 交互效果服务于工具型 playground，不做营销页式大动画。
- 不引入动画依赖，只用 Tailwind/CSS 和少量 React 状态。
- 交互应同时覆盖 React 和 Vue 预览的共同外壳。
- 尊重 `prefers-reduced-motion`，避免强制运动。

### 方案比较

| 方案 | 内容 | 取舍 |
|---|---|---|
| 克制微交互 | hover 细阴影、按压位移、导航 active 滑块、区块淡入、滚动边界阴影 | 推荐，适合设计系统工具页 |
| 演示型交互 | 卡片展开、示例筛选、复制 token、交互式 tabs 状态演示 | 更实用，但改动和状态更多 |
| 高动效 | 页面切换动画、列表 stagger、明显缩放和弹性 | 视觉更强，但不符合当前黑白灰克制方向 |

### 建议范围

- [x] 确认交互强度 → 验证：用户确认后再改代码
- [x] 顶部导航增加 active 滑块和按压反馈 → 验证：切换 React/Vue、页面 tab 时状态清楚
- [x] `PreviewSection` 增加 hover/focus-within 层级和轻微进入动画 → 验证：组件区块不显死板
- [x] 指标块、参考项、token 色块增加 hover 反馈 → 验证：可感知但不跳动
- [x] 主内容滚动区增加顶部/底部边界阴影 → 验证：用户知道内容可滚动
- [x] 跑测试和构建 → 验证：`pnpm test`、`pnpm build`
- [x] 浏览器验收桌面和 375px 移动端 → 验证：无横向溢出，动效不过度

### 复盘

- 已增加克制微交互：顶部切换滑块、导航按压反馈、预览区块 hover/focus 层级、滚动边界阴影。
- 已新增滚动状态测试，覆盖 `data-scroll-state` 从 top 到 middle 的变化。
- `pnpm test` 和 `pnpm build` 已通过。
- 浏览器检查已覆盖桌面 React/Vue 四页和 375px React 四页：无横向溢出，总览示例高度为 560px，交互外壳存在。

## 文档重写和提交任务

### 假设

- `AGENTS.md` 需要写项目协作规则，也要明确页面、组件、视觉、交互这些直观可见内容的修改标准。
- `README.md` 面向使用者，需要按当前项目真实状态整体重写，不做增量追加。
- 本次提交包含前面已完成的页面密度重排、交互增强和文档重写。

### 执行清单

- [x] 重写 `AGENTS.md` → 验证：包含项目结构、直观验收点、视觉交互规则、验证规则
- [x] 重写 `README.md` → 验证：覆盖项目目标、包结构、playground、视觉交互、命令、验收重点
- [x] 运行验证 → 验证：`pnpm test`、`pnpm build`
- [ ] 提交并推送 → 验证：`git commit`、`git push`
