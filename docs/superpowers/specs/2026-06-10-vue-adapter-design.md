# Vue 适配设计规格

## 目标

在现有 React 设计系统基础上增加 Vue 适配，使项目同时提供 Vue 组件包和可直接预览的 Vue playground。

## 范围

| 模块 | 责任 | 成功标准 |
|---|---|---|
| `packages/vue-ui` | Vue 基础组件 | Button、Input、Textarea、Card、Badge、Dialog、Tabs、Empty 可渲染 |
| `packages/vue-ai` | Vue AI 场景组件 | Attachments、ToolCallCard、CitationList、ReasoningBlock、TaskTimeline、Composer、MessageItem、ChatPanel 可组合 |
| `apps/playground-vue` | Vue 正式预览 | 总览、vue-ui、vue-ai、tokens 四页可浏览 |
| 根工程 | workspace 集成 | `pnpm test`、`pnpm build` 覆盖 Vue 包和 Vue playground |

## 技术决策

| 决策 | 选择 |
|---|---|
| Vue 版本 | Vue 3 |
| 库组件写法 | `defineComponent` + render function |
| playground 写法 | Vite + Vue SFC |
| 样式 | 继续复用 Tailwind 和 `@design-system/tokens` |
| 测试 | `@vue/test-utils` + Vitest |

## 边界

- 不改 React 包 API。
- 不复制 token，Vue 直接复用 CSS Variables。
- 不接真实模型 API。
- 不引入后端、数据库、Storybook。
- Vue 适配先覆盖当前设计系统已定义组件，不扩展无关组件。

## 验证

- `pnpm --filter @design-system/vue-ui test`
- `pnpm --filter @design-system/vue-ai test`
- `pnpm --filter @design-system/playground-vue test`
- `pnpm test`
- `pnpm build`
- 浏览器打开 Vue playground。
