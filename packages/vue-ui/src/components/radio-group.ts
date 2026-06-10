import { defineComponent, h, inject, provide, type InjectionKey } from "vue";

import { cn } from "../lib/utils";

interface RadioGroupContext {
  ariaLabel?: string;
  modelValue?: string;
  name: string;
  setValue: (value: string) => void;
}

const radioGroupKey: InjectionKey<RadioGroupContext> = Symbol("radio-group");

export const VRadioGroup = defineComponent({
  name: "VRadioGroup",
  props: {
    ariaLabel: String,
    class: String,
    modelValue: String,
    name: String,
  },
  emits: ["update:modelValue"],
  setup(props, { emit, slots }) {
    const name = props.name ?? `radio-${Math.random().toString(36).slice(2)}`;

    provide(radioGroupKey, {
      ariaLabel: props.ariaLabel,
      get modelValue() {
        return props.modelValue;
      },
      name,
      setValue: (value) => emit("update:modelValue", value),
    });

    return () =>
      h(
        "div",
        {
          "aria-label": props.ariaLabel,
          class: cn("grid gap-2", props.class),
          role: "radiogroup",
        },
        slots.default?.(),
      );
  },
});

export const VRadioGroupItem = defineComponent({
  name: "VRadioGroupItem",
  props: {
    class: String,
    disabled: Boolean,
    label: {
      required: true,
      type: String,
    },
    value: {
      required: true,
      type: String,
    },
  },
  setup(props, { attrs }) {
    const context = inject(radioGroupKey);

    return () =>
      h("label", { class: "inline-flex items-center gap-2 text-sm" }, [
        h("input", {
          ...attrs,
          checked: context?.modelValue === props.value,
          class: cn(
            "size-4 border border-input accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            props.class,
          ),
          disabled: props.disabled,
          name: context?.name,
          onChange: (event: Event) => {
            if ((event.target as HTMLInputElement).checked) {
              context?.setValue(props.value);
            }
          },
          type: "radio",
          value: props.value,
        }),
        h("span", props.label),
      ]);
  },
});
