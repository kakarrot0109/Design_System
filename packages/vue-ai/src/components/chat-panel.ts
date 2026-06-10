import { defineComponent, h } from "vue";

import { cn } from "@design-system/vue-ui";

export const VChatPanel = defineComponent({
  name: "VChatPanel",
  props: { class: String },
  setup(props, { slots }) {
    return () =>
      h(
        "section",
        {
          class: cn(
            "flex h-full min-h-0 flex-col overflow-hidden rounded-none bg-background",
            props.class,
          ),
        },
        [
          slots.header
            ? h("div", { class: "border-b px-4 py-3" }, slots.header())
            : null,
          h("div", { class: "flex min-h-0 flex-1 flex-col overflow-hidden" }, slots.default?.()),
          slots.composer
            ? h("div", { class: "border-t bg-background p-4" }, slots.composer())
            : null,
        ],
      );
  },
});
