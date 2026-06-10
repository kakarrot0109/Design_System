import { defineComponent, h } from "vue";

import { cn } from "../lib/utils";

export const VInput = defineComponent({
  name: "VInput",
  props: {
    class: String,
    disabled: Boolean,
    modelValue: [String, Number],
    placeholder: String,
    readonly: Boolean,
    type: {
      default: "text",
      type: String,
    },
  },
  emits: ["update:modelValue"],
  setup(props, { attrs, emit }) {
    return () =>
      h("input", {
        ...attrs,
        class: cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          props.class,
        ),
        disabled: props.disabled,
        onInput: (event: Event) =>
          emit("update:modelValue", (event.target as HTMLInputElement).value),
        placeholder: props.placeholder,
        readonly: props.readonly,
        type: props.type,
        value: props.modelValue,
      });
  },
});
