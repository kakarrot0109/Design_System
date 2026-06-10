import * as React from "react";
import { Brain, ChevronDown } from "lucide-react";

import { cn } from "@design-system/react-ui";

export interface ReasoningBlockProps
  extends React.HTMLAttributes<HTMLDetailsElement> {
  title?: string;
  defaultOpen?: boolean;
}

export function ReasoningBlock({
  title = "推理过程",
  defaultOpen,
  children,
  className,
  ...props
}: ReasoningBlockProps) {
  return (
    <details
      className={cn("group min-w-0 rounded-lg border bg-muted/40 p-3 text-sm", className)}
      open={defaultOpen}
      {...props}
    >
      <summary className="flex cursor-pointer list-none items-center gap-2 font-medium">
        <Brain aria-hidden="true" className="size-4 text-muted-foreground" />
        <span className="flex-1">{title}</span>
        <ChevronDown
          aria-hidden="true"
          className="size-4 text-muted-foreground transition-transform group-open:rotate-180"
        />
      </summary>
      <div className="mt-3 border-t pt-3 text-muted-foreground">{children}</div>
    </details>
  );
}
