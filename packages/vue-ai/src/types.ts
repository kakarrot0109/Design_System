import type { VNodeChild } from "vue";

export type AttachmentKind = "image" | "pdf" | "audio" | "video" | "link" | "file";
export type AttachmentVariant = "grid" | "inline" | "list";
export type ToolCallState = "pending" | "running" | "success" | "error";
export type MessageRole = "user" | "assistant" | "system";
export type MessageStatus = "streaming" | "done" | "error";
export type TaskState = "pending" | "running" | "success" | "error";
export type MessageContent = Exclude<VNodeChild, null | undefined | void>;

export interface AttachmentItem {
  id: string;
  name: string;
  type: AttachmentKind;
  size?: string;
  url?: string;
  description?: string;
}

export interface ToolCall {
  id: string;
  name: string;
  state: ToolCallState;
  input?: unknown;
  output?: unknown;
  description?: string;
}

export interface Citation {
  id: string;
  title: string;
  href?: string;
  description?: string;
}

export interface TaskStep {
  id: string;
  title: string;
  state: TaskState;
  description?: string;
}

export interface MessageRecord {
  id: string;
  role: MessageRole;
  status?: MessageStatus;
  content: MessageContent;
  attachments?: AttachmentItem[];
  toolCalls?: ToolCall[];
  citations?: Citation[];
  reasoning?: MessageContent;
  tasks?: TaskStep[];
}
