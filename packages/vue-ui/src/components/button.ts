import { cva, type VariantProps } from "class-variance-authority";
import { defineComponent, h } from "vue";

import { cn } from "../lib/utils";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ring-offset-background",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      },
      size: {
        sm: "h-8 rounded-md px-3 text-xs",
        md: "h-9 px-4 py-2",
        lg: "h-10 rounded-md px-8",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

type ButtonVariantProps = VariantProps<typeof buttonVariants>;

export const VButton = defineComponent({
  name: "VButton",
  props: {
    ariaLabel: String,
    class: String,
    disabled: Boolean,
    size: {
      default: "md",
      type: String as () => NonNullable<ButtonVariantProps["size"]>,
    },
    type: {
      default: "button",
      type: String,
    },
    variant: {
      default: "default",
      type: String as () => NonNullable<ButtonVariantProps["variant"]>,
    },
  },
  emits: ["click"],
  setup(props, { attrs, emit, slots }) {
    return () =>
      h(
        "button",
        {
          ...attrs,
          "aria-label": props.ariaLabel,
          class: cn(
            buttonVariants({ variant: props.variant, size: props.size }),
            props.class,
          ),
          disabled: props.disabled,
          type: props.type,
          onClick: (event: MouseEvent) => emit("click", event),
        },
        slots.default?.(),
      );
  },
});
