import * as React from "react";
import { ChevronDown, CircleAlert, CircleCheck, Clock, Loader2 } from "lucide-react";

import { Badge, cn } from "@design-system/react-ui";
import type { ToolCall, ToolCallState } from "../types";

const stateLabel: Record<ToolCallState, string> = {
  pending: "等待",
  running: "运行中",
  success: "成功",
  error: "错误",
};

const stateIcon = {
  pending: Clock,
  running: Loader2,
  success: CircleCheck,
  error: CircleAlert,
};

export interface ToolCallCardProps
  extends React.HTMLAttributes<HTMLDetailsElement> {
  tool: ToolCall;
}

export function ToolCallCard({ tool, className, ...props }: ToolCallCardProps) {
  const Icon = stateIcon[tool.state];

  return (
    <details
      className={cn(
        "group min-w-0 max-w-full overflow-hidden rounded-lg border bg-muted/40 p-3 text-sm",
        className,
      )}
      open={tool.state === "running" || tool.state === "error"}
      {...props}
    >
      <summary className="flex min-w-0 cursor-pointer list-none items-center gap-3">
        <div className="flex size-8 items-center justify-center rounded-md border bg-background text-muted-foreground">
          <Icon
            aria-hidden="true"
            className={cn("size-4", tool.state === "running" && "animate-spin")}
          />
        </div>
        <div className="min-w-0 flex-1">
          <div className="truncate font-medium">{tool.name}</div>
          {tool.description ? (
            <div className="truncate text-xs text-muted-foreground">
              {tool.description}
            </div>
          ) : null}
        </div>
        <Badge variant={tool.state === "error" ? "destructive" : "outline"}>
          {stateLabel[tool.state]}
        </Badge>
        <ChevronDown
          aria-hidden="true"
          className="size-4 text-muted-foreground transition-transform group-open:rotate-180"
        />
      </summary>
      <div className="mt-3 grid gap-2 border-t pt-3">
        {tool.input !== undefined ? (
          <ToolJsonBlock label="输入" value={tool.input} />
        ) : null}
        {tool.output !== undefined ? (
          <ToolJsonBlock label="输出" value={tool.output} />
        ) : null}
      </div>
    </details>
  );
}

function ToolJsonBlock({ label, value }: { label: string; value: unknown }) {
  return (
    <div>
      <div className="mb-1 text-xs font-medium text-muted-foreground">{label}</div>
      <pre className="max-w-full overflow-x-auto rounded-md border bg-background p-3 text-xs leading-relaxed text-foreground">
        {JSON.stringify(value, null, 2)}
      </pre>
    </div>
  );
}
