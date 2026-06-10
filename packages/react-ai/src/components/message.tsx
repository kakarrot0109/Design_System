import * as React from "react";

import { Badge, cn } from "@design-system/react-ui";
import type { MessageRecord, MessageRole, MessageStatus } from "../types";
import { Attachments } from "./attachments";
import { CitationList } from "./citation-list";
import { ReasoningBlock } from "./reasoning-block";
import { TaskTimeline } from "./task-timeline";
import { ToolCallCard } from "./tool-call-card";

export interface MessageListProps extends React.HTMLAttributes<HTMLDivElement> {}

export function MessageList({ className, ...props }: MessageListProps) {
  return (
    <div
      className={cn(
        "flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto overflow-x-hidden px-4 py-6",
        className,
      )}
      {...props}
    />
  );
}

export interface MessageItemProps extends React.HTMLAttributes<HTMLDivElement> {
  message: MessageRecord;
}

const statusVariant: Record<MessageStatus, "outline" | "secondary" | "destructive"> = {
  streaming: "secondary",
  done: "outline",
  error: "destructive",
};

const statusLabel: Record<MessageStatus, string> = {
  streaming: "生成中",
  done: "完成",
  error: "错误",
};

export function MessageItem({ message, className, ...props }: MessageItemProps) {
  return (
    <article
      className={cn(
        "flex w-full min-w-0 gap-3",
        message.role === "user" && "justify-end",
        className,
      )}
      {...props}
    >
      {message.role !== "user" ? <MessageAvatar role={message.role} /> : null}
      <div
        className={cn(
          "grid min-w-0 max-w-3xl flex-1 gap-3",
          message.role === "user" && "justify-items-end",
        )}
      >
        <div
          className={cn(
            "min-w-0 rounded-lg text-sm leading-6 [overflow-wrap:anywhere]",
            message.role === "user"
              ? "bg-muted px-4 py-3"
              : "bg-transparent px-0 py-1",
          )}
        >
          <div className="prose prose-sm max-w-none text-foreground">
            {message.content}
          </div>
        </div>
        {message.status ? <MessageStatusBadge status={message.status} /> : null}
        {message.attachments ? (
          <Attachments
            className="w-full"
            items={message.attachments}
            variant={message.role === "user" ? "inline" : "list"}
          />
        ) : null}
        {message.reasoning ? (
          <ReasoningBlock defaultOpen={message.status === "streaming"}>
            {message.reasoning}
          </ReasoningBlock>
        ) : null}
        {message.tasks ? <TaskTimeline className="w-full" steps={message.tasks} /> : null}
        {message.toolCalls ? (
          <div className="grid w-full gap-2">
            {message.toolCalls.map((tool) => (
              <ToolCallCard key={tool.id} tool={tool} />
            ))}
          </div>
        ) : null}
        {message.citations ? (
          <CitationList className="w-full" citations={message.citations} />
        ) : null}
      </div>
    </article>
  );
}

function MessageAvatar({ role }: { role: MessageRole }) {
  return (
    <div className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-md border bg-background text-xs font-medium text-muted-foreground">
      {role === "assistant" ? "AI" : "系"}
    </div>
  );
}

function MessageStatusBadge({ status }: { status: MessageStatus }) {
  return (
    <Badge className="w-fit" variant={statusVariant[status]}>
      {statusLabel[status]}
    </Badge>
  );
}
