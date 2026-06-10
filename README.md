# Design System

最小可运行的 React 组件设计系统 monorepo。

## 包结构

| 包 | 说明 |
|---|---|
| `@design-system/tokens` | CSS Variables 和 token 入口 |
| `@design-system/react-ui` | shadcn/ui 风格基础组件 |
| `@design-system/react-ai` | AI Elements / assistant-ui 风格 AI 组件 |
| `@design-system/playground-react` | mock AI Assistant 示例 |

## 预览内容

`pnpm dev` 会启动可直接预览的正式 playground，包含四个页面：

| 页面 | 内容 |
|---|---|
| 总览 | 完整 Assistant 示例，包含消息、streaming、error、工具调用、引用、附件、推理和输入区 |
| react-ui | Button、Input、Textarea、Card、Badge、Dialog、Tabs、Empty 全量展示 |
| react-ai | Attachments、ToolCallCard、CitationList、ReasoningBlock、TaskTimeline、Composer、MessageList 展示 |
| tokens | 基础色、状态色、圆角、边框、focus ring 展示 |

## 命令

```bash
pnpm install
pnpm test
pnpm build
pnpm dev
```

## 样式原则

- 基础组件参考 shadcn/ui。
- AI 组件参考 AI Elements 和 assistant-ui examples。
- 颜色来自 CSS Variables。
- 不接真实模型 API。
- 不引入后端和数据库。
