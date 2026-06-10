# Design System

React / Vue 组件设计系统 monorepo，包含共享 tokens、基础 UI 组件、AI 场景组件和统一 playground。

## 项目目标

- 建立一套黑白灰为主、状态色克制的组件体系。
- 基础组件对齐 shadcn/ui 的结构、状态和 Tailwind 组织方式。
- AI 组件参考 AI Elements 和 assistant-ui examples。
- 提供 React / Vue 两套组件预览，并在统一 playground 中并排维护体验一致性。
- 不接真实模型 API，不引入后端、数据库或复杂状态管理。

## 包结构

| 包 | 说明 |
|---|---|
| `@design-system/tokens` | CSS Variables 和 token 入口 |
| `@design-system/react-ui` | React 基础组件，风格参考 shadcn/ui |
| `@design-system/react-ai` | React AI 场景组件，风格参考 AI Elements / assistant-ui |
| `@design-system/vue-ui` | Vue 基础组件 |
| `@design-system/vue-ai` | Vue AI 场景组件 |
| `@design-system/playground` | React / Vue 统一预览入口 |
| `@design-system/playground-react` | React 独立预览入口 |
| `@design-system/playground-vue` | Vue 独立预览入口 |

## Playground

`pnpm dev` 启动统一 playground，可在同一页面切换 React 和 Vue。

统一 playground 是工具型预览界面，不是营销页。当前页面已做密度收紧：内容宽度、区块间距、预览卡片、总览 Assistant 示例高度都降低了一档，避免页面像被整体缩放放大。

| 页面 | 内容 |
|---|---|
| 总览 | 完整 Assistant 示例：消息、streaming、error、工具调用、引用、附件、推理和输入区 |
| UI | Typography、Button、Input、Textarea、Select、Checkbox、RadioGroup、List、Table、Card、Badge、Dialog、Tabs、Empty |
| AI | Attachments、ToolCallCard、CitationList、ReasoningBlock、TaskTimeline、Composer、MessageList |
| tokens | 基础色、状态色、圆角、边框、focus ring |

## 视觉规则

- 基础组件以 shadcn/ui 为主要样式来源。
- AI 组件以 AI Elements 和 assistant-ui examples 为主要样式来源。
- 颜色来自 CSS Variables，不在组件里写死业务色。
- 黑白灰为主，只保留少量 success / warning / error / info 状态色。
- 禁止大面积彩色、渐变装饰、花哨阴影、卡通插画。
- 卡片、表格、列表、工具调用、引用资料都保持细边框、轻圆角、可扫描的信息层级。

## 交互规则

- React / Vue 切换有 active 滑块和按压反馈。
- 页面导航按钮有 hover、active、selected 状态。
- 预览区块、指标块、参考项和 token 色块有克制 hover / focus 层级。
- 主内容滚动区有顶部和底部边界阴影，提示可继续滚动。
- 动效只使用 CSS / Tailwind，不引入额外动画依赖。
- 动效遵守 `prefers-reduced-motion`。

## 命令

```bash
pnpm install
pnpm test
pnpm build
pnpm dev
pnpm dev:react
pnpm dev:vue
```

## 验收重点

- `pnpm test` 通过。
- `pnpm build` 通过。
- 统一 playground 中 React / Vue 可切换。
- 总览、UI、AI、tokens 四页可浏览。
- 桌面端布局不呈现大块展板感。
- 375px 移动端无页面级横向溢出。
- hover、focus、active、selected 和滚动边界反馈存在，但不过度。

## 约束

- 不引入后端。
- 不引入数据库。
- 不接真实大模型 API。
- 不新增无关组件。
- 不为了一次性场景做过度抽象。
- 修改统一 playground 时，React 和 Vue 预览需要同步。
