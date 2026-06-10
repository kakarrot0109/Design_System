import { defineComponent, h } from "vue";

import { cn } from "../lib/utils";

export const VTextarea = defineComponent({
  name: "VTextarea",
  props: {
    class: String,
    disabled: Boolean,
    modelValue: String,
    placeholder: String,
  },
  emits: ["update:modelValue"],
  setup(props, { attrs, emit }) {
    return () =>
      h("textarea", {
        ...attrs,
        class: cn(
          "flex min-h-20 w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          props.class,
        ),
        disabled: props.disabled,
        onInput: (event: Event) =>
          emit("update:modelValue", (event.target as HTMLTextAreaElement).value),
        placeholder: props.placeholder,
        value: props.modelValue,
      });
  },
});
