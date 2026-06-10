import * as React from "react";
import { Paperclip, SendHorizontal } from "lucide-react";

import { Button, Textarea, cn } from "@design-system/react-ui";
import type { AttachmentItem } from "../types";
import { Attachments } from "./attachments";

export interface ComposerProps extends React.FormHTMLAttributes<HTMLFormElement> {
  attachments?: AttachmentItem[];
  defaultValue?: string;
  disabled?: boolean;
  isLoading?: boolean;
  onAttachmentRemove?: (item: AttachmentItem) => void;
  onSubmitMessage?: (value: string) => void;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  value?: string;
}

export function Composer({
  attachments = [],
  className,
  defaultValue = "",
  disabled,
  isLoading,
  onAttachmentRemove,
  onSubmitMessage,
  onValueChange,
  placeholder = "输入消息...",
  value,
  ...props
}: ComposerProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const text = value ?? internalValue;
  const isDisabled = disabled || isLoading;

  function updateValue(nextValue: string) {
    setInternalValue(nextValue);
    onValueChange?.(nextValue);
  }

  return (
    <form
      className={cn("rounded-xl border bg-background p-2 shadow-sm", className)}
      onSubmit={(event) => {
        event.preventDefault();
        if (!text.trim() || isDisabled) {
          return;
        }
        onSubmitMessage?.(text);
      }}
      {...props}
    >
      {attachments.length > 0 ? (
        <Attachments
          className="mb-2"
          items={attachments}
          onRemove={onAttachmentRemove}
          variant="inline"
        />
      ) : null}
      <Textarea
        className="min-h-24 resize-none border-0 p-2 shadow-none focus-visible:ring-0"
        disabled={isDisabled}
        onChange={(event) => updateValue(event.target.value)}
        placeholder={placeholder}
        value={text}
      />
      <div className="mt-2 flex items-center justify-between gap-2 border-t pt-2">
        <Button aria-label="添加附件" disabled={isDisabled} size="icon" type="button" variant="ghost">
          <Paperclip aria-hidden="true" className="size-4" />
        </Button>
        <Button disabled={isDisabled || !text.trim()} size="icon" type="submit">
          <SendHorizontal aria-hidden="true" className="size-4" />
          <span className="sr-only">发送</span>
        </Button>
      </div>
    </form>
  );
}
