import * as React from "react";

import { cn } from "@design-system/react-ui";

export interface ChatPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  composer?: React.ReactNode;
  header?: React.ReactNode;
}

export function ChatPanel({
  children,
  className,
  composer,
  header,
  ...props
}: ChatPanelProps) {
  return (
    <section
      className={cn(
        "flex h-full min-h-0 flex-col overflow-hidden rounded-none bg-background",
        className,
      )}
      {...props}
    >
      {header ? <div className="border-b px-4 py-3">{header}</div> : null}
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden">{children}</div>
      {composer ? <div className="border-t bg-background p-4">{composer}</div> : null}
    </section>
  );
}
