import { defineComponent, h } from "vue";

import { cn } from "../lib/utils";

export const VCheckbox = defineComponent({
  name: "VCheckbox",
  props: {
    class: String,
    disabled: Boolean,
    label: String,
    modelValue: Boolean,
  },
  emits: ["update:modelValue"],
  setup(props, { attrs, emit }) {
    return () =>
      h("label", { class: "inline-flex items-center gap-2 text-sm" }, [
        h("input", {
          ...attrs,
          checked: props.modelValue,
          class: cn(
            "size-4 rounded border border-input accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            props.class,
          ),
          disabled: props.disabled,
          onChange: (event: Event) =>
            emit("update:modelValue", (event.target as HTMLInputElement).checked),
          type: "checkbox",
        }),
        props.label ? h("span", props.label) : null,
      ]);
  },
});
