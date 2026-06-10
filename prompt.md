请基于当前项目继续修改，重点是统一组件样式来源。

新的硬性要求：
所有组件样式必须以 shadcn/ui、AI Elements、assistant-ui examples 为参考来源。

参考来源：
1. shadcn/ui components
https://ui.shadcn.com/docs/components

2. AI Elements attachments 以及同站点 AI components
https://elements.ai-sdk.dev/components/attachments

3. assistant-ui examples
https://www.assistant-ui.com/examples

请按以下规则调整：

一、@Design_System/react-ui
- 基础组件样式对齐 shadcn/ui
- Button / Input / Textarea / Card / Badge / Dialog / Tabs / Empty 必须采用 shadcn/ui 的 Tailwind 组织方式
- 使用 cn 和 class-variance-authority
- variant、size、disabled、focus、hover、dark mode 的表现要接近 shadcn/ui
- 所有颜色仍然来自 CSS Variables，不允许写死业务色
- 不要自行设计一套新的视觉风格

二、@Design_System/react-ai
- AI 组件样式参考 AI Elements 和 assistant-ui
- Attachments 组件参考 AI Elements Attachments，支持 grid / inline / list
- ToolCallCard 参考 AI Elements Tool
- CitationList 参考 AI Elements Sources / Inline Citation
- ReasoningBlock 参考 AI Elements Reasoning / Chain of Thought
- Composer 参考 AI Elements Prompt Input 和 assistant-ui 输入区
- ChatPanel / MessageList / MessageItem 参考 assistant-ui examples 的 ChatGPT Clone / Claude Clone
- 组件保持可组合，不要写成一个巨大的 Chat 黑盒

三、apps/playground-react
- 示例页面整体参考 assistant-ui examples
- 做一个成熟的 AI Assistant 页面
- 包含：
  - Header
  - MessageList
  - 用户消息
  - 助手消息
  - streaming 状态
  - ToolCallCard
  - CitationList
  - Attachments
  - ReasoningBlock
  - Composer
- 使用 mock 数据
- 不接真实 API

四、视觉约束
- 黑白灰为主
- shadcn/ui 作为基础 UI 底座
- AI Elements 作为 AI 组件样式参考
- assistant-ui 作为完整聊天体验参考
- 只保留少量 success / warning / error / info 状态色
- 禁止大面积彩色
- 禁止渐变装饰
- 禁止花哨阴影
- 禁止卡通插画
- 禁止每个组件私自定义颜色

五、实现约束
- 先保证 pnpm build 通过
- 再保证 playground-react 可运行
- 再完善 docs 示例
- 不要引入后端
- 不要引入数据库
- 不要接真实大模型 API
- 不要做复杂状态管理
- 不要新增无关组件
- 不要过度抽象

完成后请自检：
1. react-ui 是否像 shadcn/ui
2. react-ai 是否像 AI Elements / assistant-ui
3. playground-react 是否像成熟 AI Assistant
4. tokens / styles 是否被真实使用
5. pnpm build 是否通过
