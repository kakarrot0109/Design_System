# Design System

最小可运行的 React / Vue 组件设计系统 monorepo。

## 包结构

| 包 | 说明 |
|---|---|
| `@design-system/tokens` | CSS Variables 和 token 入口 |
| `@design-system/react-ui` | shadcn/ui 风格基础组件 |
| `@design-system/react-ai` | AI Elements / assistant-ui 风格 AI 组件 |
| `@design-system/vue-ui` | Vue 版 shadcn/ui 风格基础组件 |
| `@design-system/vue-ai` | Vue 版 AI Elements / assistant-ui 风格 AI 组件 |
| `@design-system/playground` | React / Vue 统一预览入口 |
| `@design-system/playground-react` | mock AI Assistant 示例 |
| `@design-system/playground-vue` | Vue 版 mock AI Assistant 示例 |

## 预览内容

`pnpm dev` 会启动统一 playground，可在同一页面切换 React 和 Vue。`pnpm dev:react`、`pnpm dev:vue` 保留为单框架调试入口。

| 页面 | 内容 |
|---|---|
| 总览 | 完整 Assistant 示例，包含消息、streaming、error、工具调用、引用、附件、推理和输入区 |
| UI | React / Vue 的 Typography、Button、Input、Textarea、Select、Checkbox、RadioGroup、List、Table、Card、Badge、Dialog、Tabs、Empty 展示 |
| AI | React / Vue 的 Attachments、ToolCallCard、CitationList、ReasoningBlock、TaskTimeline、Composer、MessageList 展示 |
| tokens | 基础色、状态色、圆角、边框、focus ring 展示 |

## 命令

```bash
pnpm install
pnpm test
pnpm build
pnpm dev
pnpm dev:react
pnpm dev:vue
```

## 样式原则

- 基础组件参考 shadcn/ui。
- AI 组件参考 AI Elements 和 assistant-ui examples。
- 颜色来自 CSS Variables。
- 不接真实模型 API。
- 不引入后端和数据库。
