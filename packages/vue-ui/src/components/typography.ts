import { defineComponent, h } from "vue";

import { cn } from "../lib/utils";

type TypographyVariant = "h1" | "h2" | "h3" | "p" | "lead" | "muted" | "small" | "code";

const variantClass: Record<TypographyVariant, string> = {
  code: "rounded bg-muted px-1.5 py-0.5 font-mono text-sm",
  h1: "text-3xl font-semibold tracking-normal",
  h2: "text-2xl font-semibold tracking-normal",
  h3: "text-xl font-semibold tracking-normal",
  lead: "text-lg text-muted-foreground",
  muted: "text-sm text-muted-foreground",
  p: "text-sm leading-6",
  small: "text-xs font-medium leading-none",
};

const variantTag: Record<TypographyVariant, string> = {
  code: "code",
  h1: "h1",
  h2: "h2",
  h3: "h3",
  lead: "p",
  muted: "p",
  p: "p",
  small: "small",
};

export const VTypography = defineComponent({
  name: "VTypography",
  props: {
    class: String,
    variant: {
      default: "p",
      type: String as () => TypographyVariant,
    },
  },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        variantTag[props.variant],
        { ...attrs, class: cn(variantClass[props.variant], props.class) },
        slots.default?.(),
      );
  },
});
