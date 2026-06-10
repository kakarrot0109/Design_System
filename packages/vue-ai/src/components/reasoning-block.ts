import { defineComponent, h } from "vue";
import { Brain } from "lucide-vue-next";

import { cn } from "@design-system/vue-ui";

export const VReasoningBlock = defineComponent({
  name: "VReasoningBlock",
  props: {
    class: String,
    defaultOpen: Boolean,
    title: {
      default: "推理过程",
      type: String,
    },
  },
  setup(props, { slots }) {
    return () =>
      h(
        "details",
        {
          class: cn("group min-w-0 rounded-lg border bg-muted/40 p-3 text-sm", props.class),
          open: props.defaultOpen,
        },
        [
          h("summary", { class: "flex cursor-pointer list-none items-center gap-2 font-medium" }, [
            h(Brain, { "aria-hidden": "true", class: "size-4 text-muted-foreground" }),
            h("span", { class: "flex-1" }, props.title),
          ]),
          h("div", { class: "mt-3 border-t pt-3 text-muted-foreground" }, slots.default?.()),
        ],
      );
  },
});
