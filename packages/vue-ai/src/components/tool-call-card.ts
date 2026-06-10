import { defineComponent, h, type PropType } from "vue";
import { CircleAlert, CircleCheck, Clock, Loader2 } from "lucide-vue-next";

import { cn, VBadge } from "@design-system/vue-ui";
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

export const VToolCallCard = defineComponent({
  name: "VToolCallCard",
  props: {
    tool: {
      required: true,
      type: Object as PropType<ToolCall>,
    },
  },
  setup(props) {
    return () => {
      const Icon = stateIcon[props.tool.state];

      return h(
        "details",
        {
          class: "group min-w-0 max-w-full overflow-hidden rounded-lg border bg-muted/40 p-3 text-sm",
          open: props.tool.state === "running" || props.tool.state === "error",
        },
        [
          h("summary", { class: "flex min-w-0 cursor-pointer list-none items-center gap-3" }, [
            h(
              "div",
              {
                class:
                  "flex size-8 items-center justify-center rounded-md border bg-background text-muted-foreground",
              },
              h(Icon, {
                "aria-hidden": "true",
                class: cn("size-4", props.tool.state === "running" && "animate-spin"),
              }),
            ),
            h("div", { class: "min-w-0 flex-1" }, [
              h("div", { class: "truncate font-medium" }, props.tool.name),
              props.tool.description
                ? h(
                    "div",
                    { class: "truncate text-xs text-muted-foreground" },
                    props.tool.description,
                  )
                : null,
            ]),
            h(
              VBadge,
              { variant: props.tool.state === "error" ? "destructive" : "outline" },
              () => stateLabel[props.tool.state],
            ),
          ]),
          h("div", { class: "mt-3 grid gap-2 border-t pt-3" }, [
            props.tool.input !== undefined
              ? h(JsonBlock, { label: "输入", value: props.tool.input })
              : null,
            props.tool.output !== undefined
              ? h(JsonBlock, { label: "输出", value: props.tool.output })
              : null,
          ]),
        ],
      );
    };
  },
});

const JsonBlock = defineComponent({
  name: "JsonBlock",
  props: {
    label: { required: true, type: String },
    value: { required: true, type: null as unknown as PropType<unknown> },
  },
  setup(props) {
    return () =>
      h("div", [
        h("div", { class: "mb-1 text-xs font-medium text-muted-foreground" }, props.label),
        h(
          "pre",
          {
            class:
              "max-w-full overflow-x-auto rounded-md border bg-background p-3 text-xs leading-relaxed text-foreground",
          },
          JSON.stringify(props.value, null, 2),
        ),
      ]);
  },
});
