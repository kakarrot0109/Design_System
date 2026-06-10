import * as React from "react";
import { ExternalLink } from "lucide-react";

import { cn } from "@design-system/react-ui";
import type { Citation } from "../types";

export interface CitationListProps extends React.HTMLAttributes<HTMLOListElement> {
  citations: Citation[];
}

export function CitationList({
  citations,
  className,
  ...props
}: CitationListProps) {
  if (citations.length === 0) {
    return null;
  }

  return (
    <ol className={cn("grid min-w-0 gap-2", className)} {...props}>
      {citations.map((citation, index) => (
        <li
          className="flex min-w-0 gap-3 rounded-md border bg-background p-3 text-sm"
          key={citation.id}
        >
          <span className="flex size-6 shrink-0 items-center justify-center rounded-full border text-xs text-muted-foreground">
            {index + 1}
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1 font-medium">
              {citation.href ? (
                <a
                  className="truncate underline-offset-4 hover:underline"
                  href={citation.href}
                >
                  {citation.title}
                </a>
              ) : (
                <span className="truncate">{citation.title}</span>
              )}
              {citation.href ? (
                <ExternalLink
                  aria-hidden="true"
                  className="size-3.5 shrink-0 text-muted-foreground"
                />
              ) : null}
            </div>
            {citation.description ? (
              <p className="mt-1 text-xs text-muted-foreground">
                {citation.description}
              </p>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  );
}
