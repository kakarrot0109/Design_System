import { defineComponent, h } from "vue";

import { cn } from "../lib/utils";

export const VList = defineComponent({
  name: "VList",
  props: { class: String },
  setup(props, { attrs, slots }) {
    return () =>
      h("ul", { ...attrs, class: cn("grid gap-2", props.class) }, slots.default?.());
  },
});

export const VListItem = defineComponent({
  name: "VListItem",
  props: {
    class: String,
    description: String,
    title: {
      required: true,
      type: String,
    },
  },
  setup(props, { attrs }) {
    return () =>
      h("li", { ...attrs, class: cn("rounded-md border bg-background p-3", props.class) }, [
        h("div", { class: "text-sm font-medium" }, props.title),
        props.description
          ? h("div", { class: "mt-1 text-sm text-muted-foreground" }, props.description)
          : null,
      ]);
  },
});
