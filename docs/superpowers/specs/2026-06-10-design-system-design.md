# Design System 设计规格

## 目标

搭建一个最小可运行的 React 组件设计系统 monorepo，统一基础 UI、AI 组件和 playground 示例的样式来源。

## 范围

| 模块 | 责任 | 成功标准 |
|---|---|---|
| `packages/tokens` | 输出 CSS Variables 和 token 使用入口 | 组件颜色可通过变量统一控制 |
| `packages/react-ui` | 输出基础组件 | `Button/Input/Textarea/Card/Badge/Dialog/Tabs/Empty` 贴近 shadcn/ui |
| `packages/react-ai` | 输出 AI 场景组件 | `Attachments/ToolCallCard/CitationList/ReasoningBlock/TaskTimeline/Composer/Message*` 可组合 |
| `apps/playground-react` | 展示完整 AI Assistant mock 页面 | 页面包含文档要求的消息、工具、引用、附件、推理、输入区 |

## 技术决策

| 决策 | 选择 |
|---|---|
| 包管理 | `pnpm workspace` |
| 库构建 | `tsup` |
| 应用构建 | `Vite` |
| 语言 | TypeScript |
| 样式 | Tailwind + CSS Variables |
| 组件变体 | `class-variance-authority` + `cn` |
| 图标 | `lucide-react` |
| 交互基础 | `@radix-ui/react-dialog`、`@radix-ui/react-tabs` |

## 视觉原则

- 基础 UI 以 shadcn/ui 的结构、圆角、边框、focus ring、disabled 状态为基准。
- AI 组件以 AI Elements 的紧凑卡片、附件、工具调用、引用资料、推理折叠为基准。
- playground 以 assistant-ui examples 的聊天布局为基准。
- 禁止大面积彩色、渐变装饰、花哨阴影、卡通化插画。
- 状态色只用于 `success/warning/error/info`。

## 非目标

- 不做 Storybook。
- 不接真实模型 API。
- 不写后端。
- 不接数据库。
- 不做发布流水线。
- 不做复杂状态管理。

## 验证

- `pnpm test`
- `pnpm build`
- `pnpm dev`
- 浏览器检查 playground 页面。
