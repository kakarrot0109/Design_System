import { defineComponent, h } from "vue";

import { cn } from "../lib/utils";

function createCardPart(name: string, tag: string, baseClass: string) {
  return defineComponent({
    name,
    props: { class: String },
    setup(props, { attrs, slots }) {
      return () =>
        h(tag, { ...attrs, class: cn(baseClass, props.class) }, slots.default?.());
    },
  });
}

export const VCard = createCardPart(
  "VCard",
  "div",
  "rounded-lg border bg-card text-card-foreground shadow-sm",
);
export const VCardHeader = createCardPart(
  "VCardHeader",
  "div",
  "flex flex-col space-y-1.5 p-6",
);
export const VCardTitle = createCardPart(
  "VCardTitle",
  "h3",
  "text-2xl font-semibold leading-none tracking-normal",
);
export const VCardDescription = createCardPart(
  "VCardDescription",
  "p",
  "text-sm text-muted-foreground",
);
export const VCardContent = createCardPart("VCardContent", "div", "p-6 pt-0");
export const VCardFooter = createCardPart(
  "VCardFooter",
  "div",
  "flex items-center p-6 pt-0",
);
