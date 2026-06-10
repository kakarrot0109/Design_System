import { defineComponent, h } from "vue";

import { cn } from "../lib/utils";

export const VSelect = defineComponent({
  name: "VSelect",
  props: {
    ariaLabel: String,
    class: String,
    disabled: Boolean,
    modelValue: [String, Number],
  },
  emits: ["update:modelValue"],
  setup(props, { attrs, emit, slots }) {
    return () =>
      h(
        "select",
        {
          ...attrs,
          "aria-label": props.ariaLabel,
          class: cn(
            "flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-base shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            props.class,
          ),
          disabled: props.disabled,
          onChange: (event: Event) =>
            emit("update:modelValue", (event.target as HTMLSelectElement).value),
          value: props.modelValue,
        },
        slots.default?.(),
      );
  },
});
