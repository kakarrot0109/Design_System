import * as React from "react";
import {
  File,
  FileAudio,
  FileImage,
  FileText,
  Film,
  Link,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Button, cn } from "@design-system/react-ui";
import type { AttachmentItem, AttachmentVariant } from "../types";

const iconMap: Record<AttachmentItem["type"], LucideIcon> = {
  image: FileImage,
  pdf: FileText,
  audio: FileAudio,
  video: Film,
  link: Link,
  file: File,
};

const listClasses: Record<AttachmentVariant, string> = {
  grid: "grid grid-cols-1 gap-2 sm:grid-cols-2",
  inline: "flex flex-row flex-wrap gap-2",
  list: "flex flex-col gap-2",
};

export interface AttachmentsProps extends React.HTMLAttributes<HTMLDivElement> {
  items: AttachmentItem[];
  variant?: AttachmentVariant;
  onRemove?: (item: AttachmentItem) => void;
}

export function Attachments({
  items,
  variant = "grid",
  onRemove,
  className,
  ...props
}: AttachmentsProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <div
      className={cn("min-w-0 max-w-full", listClasses[variant], className)}
      role="list"
      {...props}
    >
      {items.map((item) => (
        <AttachmentCard
          item={item}
          key={item.id}
          onRemove={onRemove}
          variant={variant}
        />
      ))}
    </div>
  );
}

export interface AttachmentCardProps {
  item: AttachmentItem;
  variant?: AttachmentVariant;
  onRemove?: (item: AttachmentItem) => void;
}

export function AttachmentCard({
  item,
  variant = "grid",
  onRemove,
}: AttachmentCardProps) {
  return (
    <div
      className={cn(
        "group flex min-w-0 items-center gap-3 rounded-md border bg-background p-2 text-sm",
        variant === "grid" && "min-h-20",
        variant === "inline" && "w-full max-w-full sm:w-auto sm:max-w-64",
      )}
      role="listitem"
    >
      <AttachmentPreview item={item} />
      <AttachmentInfo item={item} />
      {onRemove ? <AttachmentRemove item={item} onRemove={onRemove} /> : null}
    </div>
  );
}

export function AttachmentPreview({ item }: { item: AttachmentItem }) {
  const Icon = iconMap[item.type];

  if (item.type === "image" && item.url) {
    return (
      <img
        alt=""
        className="size-10 rounded-md border object-cover"
        src={item.url}
      />
    );
  }

  return (
    <div className="flex size-10 shrink-0 items-center justify-center rounded-md border bg-muted text-muted-foreground">
      <Icon aria-hidden="true" className="size-4" />
    </div>
  );
}

export function AttachmentInfo({ item }: { item: AttachmentItem }) {
  return (
    <div className="min-w-0 flex-1">
      <div className="truncate font-medium text-foreground">{item.name}</div>
      <div className="truncate text-xs text-muted-foreground">
        {[item.description, item.size].filter(Boolean).join(" · ") || item.type}
      </div>
    </div>
  );
}

export function AttachmentRemove({
  item,
  onRemove,
}: {
  item: AttachmentItem;
  onRemove: (item: AttachmentItem) => void;
}) {
  return (
    <Button
      aria-label={`移除 ${item.name}`}
      className="size-7 shrink-0 opacity-70 hover:opacity-100"
      onClick={() => onRemove(item)}
      size="icon"
      type="button"
      variant="ghost"
    >
      <X aria-hidden="true" className="size-3.5" />
    </Button>
  );
}
