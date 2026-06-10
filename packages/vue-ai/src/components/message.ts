import { defineComponent, h, type PropType } from "vue";

import { cn, VBadge } from "@design-system/vue-ui";
import type { MessageRecord, MessageStatus } from "../types";
import { VAttachments } from "./attachments";
import { VCitationList } from "./citation-list";
import { VReasoningBlock } from "./reasoning-block";
import { VTaskTimeline } from "./task-timeline";
import { VToolCallCard } from "./tool-call-card";

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

export const VMessageList = defineComponent({
  name: "VMessageList",
  props: { class: String },
  setup(props, { slots }) {
    return () =>
      h(
        "div",
        {
          class: cn(
            "flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto overflow-x-hidden px-4 py-6",
            props.class,
          ),
        },
        slots.default?.(),
      );
  },
});

export const VMessageItem = defineComponent({
  name: "VMessageItem",
  props: {
    message: {
      required: true,
      type: Object as PropType<MessageRecord>,
    },
  },
  setup(props) {
    return () =>
      h(
        "article",
        {
          class: cn(
            "flex w-full min-w-0 gap-3",
            props.message.role === "user" && "justify-end",
          ),
        },
        [
          props.message.role === "user" ? null : h(MessageAvatar),
          h(
            "div",
            {
              class: cn(
                "grid min-w-0 max-w-3xl flex-1 gap-3",
                props.message.role === "user" && "justify-items-end",
              ),
            },
            [
              h(
                "div",
                {
                  class: cn(
                    "min-w-0 rounded-lg text-sm leading-6 [overflow-wrap:anywhere]",
                    props.message.role === "user"
                      ? "bg-muted px-4 py-3"
                      : "bg-transparent px-0 py-1",
                  ),
                },
                props.message.content,
              ),
              props.message.status
                ? h(
                    VBadge,
                    {
                      class: "w-fit",
                      variant: statusVariant[props.message.status],
                    },
                    () => statusLabel[props.message.status!],
                  )
                : null,
              props.message.attachments
                ? h(VAttachments, {
                    class: "w-full",
                    items: props.message.attachments,
                    variant: props.message.role === "user" ? "inline" : "list",
                  })
                : null,
              props.message.reasoning
                ? h(
                    VReasoningBlock,
                    { defaultOpen: props.message.status === "streaming" },
                    () => props.message.reasoning,
                  )
                : null,
              props.message.tasks
                ? h(VTaskTimeline, { class: "w-full", steps: props.message.tasks })
                : null,
              props.message.toolCalls
                ? h(
                    "div",
                    { class: "grid w-full gap-2" },
                    props.message.toolCalls.map((tool) =>
                      h(VToolCallCard, { key: tool.id, tool }),
                    ),
                  )
                : null,
              props.message.citations
                ? h(VCitationList, {
                    class: "w-full",
                    citations: props.message.citations,
                  })
                : null,
            ],
          ),
        ],
      );
  },
});

const MessageAvatar = defineComponent({
  name: "MessageAvatar",
  setup() {
    return () =>
      h(
        "div",
        {
          class:
            "mt-1 flex size-8 shrink-0 items-center justify-center rounded-md border bg-background text-xs font-medium text-muted-foreground",
        },
        "AI",
      );
  },
});
