import type {
  AttachmentItem,
  MessageRecord,
  TaskStep,
  ToolCall,
} from "@design-system/vue-ai";
import {
  LayoutDashboard,
  MessageSquareText,
  Package2,
  Palette,
  type LucideIcon,
} from "lucide-vue-next";

export type SectionId = "overview" | "vue-ui" | "vue-ai" | "tokens";

export interface SectionMeta {
  id: SectionId;
  label: string;
  description: string;
  icon: LucideIcon;
}

export const sections: SectionMeta[] = [
  {
    id: "overview",
    label: "Vue 总览",
    description: "完整 Assistant 页面",
    icon: LayoutDashboard,
  },
  {
    id: "vue-ui",
    label: "vue-ui",
    description: "基础组件",
    icon: Package2,
  },
  {
    id: "vue-ai",
    label: "vue-ai",
    description: "AI 场景组件",
    icon: MessageSquareText,
  },
  {
    id: "tokens",
    label: "tokens",
    description: "颜色和状态",
    icon: Palette,
  },
];

export const attachmentItems: AttachmentItem[] = [
  {
    id: "style",
    name: "组件样式要求.md",
    type: "file",
    size: "5.8 KB",
    description: "样式规则",
  },
  {
    id: "preview",
    name: "Vue 对话区截图.png",
    type: "image",
    size: "840 KB",
    description: "视觉参考",
  },
  {
    id: "source",
    name: "https://ui.shadcn.com",
    type: "link",
    description: "基础组件参考",
  },
];

export const taskSteps: TaskStep[] = [
  {
    id: "task-1",
    title: "检查 vue-ui",
    state: "success",
    description: "Button、Input、Card、Badge、Dialog、Tabs、Empty。",
  },
  {
    id: "task-2",
    title: "检查 vue-ai",
    state: "running",
    description: "附件、工具调用、引用资料、推理块、输入区。",
  },
  {
    id: "task-3",
    title: "检查 Vue playground",
    state: "pending",
    description: "mock 消息覆盖用户、助手、streaming、error。",
  },
];

export const toolCalls: ToolCall[] = [
  {
    id: "pending",
    name: "prepare_vue_preview",
    state: "pending",
    description: "等待预览任务",
    input: { route: "/tokens" },
  },
  {
    id: "running",
    name: "render_vue_playground",
    state: "running",
    description: "渲染 Vue 本地页面",
    input: { viewport: "1280x720" },
  },
  {
    id: "success",
    name: "inspect_vue_tokens",
    state: "success",
    description: "检查 CSS Variables",
    input: { packages: ["vue-ui", "vue-ai"] },
    output: { tokenUsage: "通过", hardcodedBusinessColors: 0 },
  },
  {
    id: "error",
    name: "load_remote_model",
    state: "error",
    description: "真实模型调用不在本项目范围内",
    output: { reason: "不接真实模型 API" },
  },
];

export const messages: MessageRecord[] = [
  {
    id: "user-1",
    role: "user",
    content: "请检查 Vue 适配是否覆盖基础组件、AI 组件和正式预览。",
    attachments: attachmentItems,
  },
  {
    id: "assistant-1",
    role: "assistant",
    status: "done",
    content:
      "Vue 预览会复用同一套 tokens，并展示 vue-ui、vue-ai、Assistant 示例和状态色。",
    reasoning: "Vue 适配不复制 token，只复用 CSS Variables，减少两套体系漂移。",
    tasks: taskSteps,
    toolCalls: [toolCalls[2]],
    citations: [
      {
        id: "source-1",
        title: "组件样式要求",
        description: "样式来源、视觉约束和 playground 要求。",
      },
      {
        id: "source-2",
        title: "Vue playground",
        description: "用于验收 Vue 组件适配效果。",
      },
    ],
  },
  {
    id: "assistant-2",
    role: "assistant",
    status: "streaming",
    content: "正在生成 Vue 组件验收视图，并检查移动端折行。",
    reasoning: "streaming 状态需要默认展开推理块，但视觉权重不能超过正文。",
    toolCalls: [toolCalls[1]],
  },
  {
    id: "assistant-3",
    role: "assistant",
    status: "error",
    content: "真实模型调用被拒绝：当前 Vue playground 只使用 mock 数据。",
    toolCalls: [toolCalls[3]],
  },
];

export const tokenGroups = [
  {
    title: "基础色",
    items: [
      { label: "background", className: "bg-background text-foreground" },
      { label: "foreground", className: "bg-foreground text-background" },
      { label: "muted", className: "bg-muted text-muted-foreground" },
      { label: "secondary", className: "bg-secondary text-secondary-foreground" },
      { label: "primary", className: "bg-primary text-primary-foreground" },
    ],
  },
  {
    title: "状态色",
    items: [
      { label: "success", className: "bg-success text-primary-foreground" },
      { label: "warning", className: "bg-warning text-primary" },
      { label: "info", className: "bg-info text-primary-foreground" },
      {
        label: "destructive",
        className: "bg-destructive text-destructive-foreground",
      },
    ],
  },
];
