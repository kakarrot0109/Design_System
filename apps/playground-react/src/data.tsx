import type * as React from "react";
import type {
  AttachmentItem,
  MessageRecord,
  TaskStep,
  ToolCall,
} from "@design-system/react-ai";
import {
  LayoutDashboard,
  MessageSquareText,
  Package2,
  Palette,
} from "lucide-react";

export type SectionId = "overview" | "react-ui" | "react-ai" | "tokens";

export interface SectionMeta {
  id: SectionId;
  label: string;
  description: string;
  icon: React.ElementType;
}

export const sections: SectionMeta[] = [
  {
    id: "overview",
    label: "总览",
    description: "完整 Assistant 页面",
    icon: LayoutDashboard,
  },
  {
    id: "react-ui",
    label: "react-ui",
    description: "基础组件",
    icon: Package2,
  },
  {
    id: "react-ai",
    label: "react-ai",
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
    name: "对话区截图.png",
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
    title: "检查基础组件",
    state: "success",
    description: "Button、Input、Card、Badge、Dialog、Tabs、Empty。",
  },
  {
    id: "task-2",
    title: "检查 AI 组件",
    state: "running",
    description: "附件、工具调用、引用资料、推理块、输入区。",
  },
  {
    id: "task-3",
    title: "检查示例页面",
    state: "pending",
    description: "mock 消息覆盖用户、助手、streaming、error。",
  },
];

export const toolCalls: ToolCall[] = [
  {
    id: "pending",
    name: "prepare_preview",
    state: "pending",
    description: "等待预览任务",
    input: { route: "/tokens" },
  },
  {
    id: "running",
    name: "render_playground",
    state: "running",
    description: "渲染本地页面",
    input: { viewport: "1280x720" },
  },
  {
    id: "success",
    name: "inspect_tokens",
    state: "success",
    description: "检查 CSS Variables",
    input: { packages: ["react-ui", "react-ai"] },
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
    content:
      "请按 shadcn/ui、AI Elements、assistant-ui 的方向，整理这个组件库的首轮验收清单。",
    attachments: attachmentItems,
  },
  {
    id: "assistant-1",
    role: "assistant",
    status: "done",
    content: (
      <div className="grid gap-2">
        <p>
          首轮验收先看三个层级：基础组件是否统一，AI 组件是否可组合，playground
          是否像完整 Assistant。
        </p>
        <p>
          检查点包括颜色、圆角、边框、focus、disabled、附件、工具调用和引用资料。
        </p>
      </div>
    ),
    reasoning: (
      <p>
        文档重点不是新增功能，而是统一视觉来源。因此验收围绕 token 使用、组件边界和示例完整度。
      </p>
    ),
    tasks: taskSteps,
    toolCalls: [toolCalls[2]],
    citations: [
      {
        id: "source-1",
        title: "shadcn/ui components",
        href: "https://ui.shadcn.com/docs/components",
        description: "基础组件结构、变体、focus 和 disabled 状态。",
      },
      {
        id: "source-2",
        title: "AI Elements",
        href: "https://elements.ai-sdk.dev/components/attachments",
        description: "附件、工具调用、引用资料和推理组件组织方式。",
      },
    ],
  },
  {
    id: "assistant-2",
    role: "assistant",
    status: "streaming",
    content:
      "正在生成组件验收视图，并检查 playground 的信息层级、滚动边界和移动端折行。",
    reasoning: "streaming 状态需要默认展开推理块，但视觉权重不能超过正文。",
    toolCalls: [toolCalls[1]],
  },
  {
    id: "assistant-3",
    role: "assistant",
    status: "error",
    content: "真实模型调用被拒绝：当前 playground 只使用 mock 数据。",
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
