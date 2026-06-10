import { defineComponent, h } from "vue";

import { cn } from "../lib/utils";

function createEmptyPart(name: string, tag: string, baseClass: string) {
  return defineComponent({
    name,
    props: { class: String },
    setup(props, { attrs, slots }) {
      return () =>
        h(tag, { ...attrs, class: cn(baseClass, props.class) }, slots.default?.());
    },
  });
}

export const VEmpty = createEmptyPart(
  "VEmpty",
  "div",
  "flex min-h-52 flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center",
);
export const VEmptyTitle = createEmptyPart(
  "VEmptyTitle",
  "h3",
  "mt-2 text-sm font-semibold text-foreground",
);
export const VEmptyDescription = createEmptyPart(
  "VEmptyDescription",
  "p",
  "mt-1 max-w-sm text-sm text-muted-foreground",
);
