import { defineComponent, h, ref, type PropType } from "vue";
import { Paperclip, SendHorizontal } from "lucide-vue-next";

import { cn, VButton, VTextarea } from "@design-system/vue-ui";
import type { AttachmentItem } from "../types";
import { VAttachments } from "./attachments";

export const VComposer = defineComponent({
  name: "VComposer",
  props: {
    attachments: {
      default: () => [],
      type: Array as PropType<AttachmentItem[]>,
    },
    class: String,
    disabled: Boolean,
    isLoading: Boolean,
    placeholder: {
      default: "输入消息...",
      type: String,
    },
  },
  emits: ["removeAttachment", "submitMessage"],
  setup(props, { emit }) {
    const value = ref("");

    return () => {
      const isDisabled = props.disabled || props.isLoading;
      return h(
        "form",
        {
          class: cn("rounded-xl border bg-background p-2 shadow-sm", props.class),
          onSubmit: (event: Event) => {
            event.preventDefault();
            if (!value.value.trim() || isDisabled) return;
            emit("submitMessage", value.value);
          },
        },
        [
          props.attachments.length
            ? h(VAttachments, {
                class: "mb-2",
                items: props.attachments,
                onRemove: (item: AttachmentItem) => emit("removeAttachment", item),
                variant: "inline",
              })
            : null,
          h(VTextarea, {
            class: "min-h-24 resize-none border-0 p-2 shadow-none focus-visible:ring-0",
            disabled: isDisabled,
            modelValue: value.value,
            "onUpdate:modelValue": (nextValue: string) => {
              value.value = nextValue;
            },
            placeholder: props.placeholder,
          }),
          h("div", { class: "mt-2 flex items-center justify-between gap-2 border-t pt-2" }, [
            h(
              VButton,
              {
                ariaLabel: "添加附件",
                disabled: isDisabled,
                size: "icon",
                variant: "ghost",
              },
              () => h(Paperclip, { "aria-hidden": "true", class: "size-4" }),
            ),
            h(
              VButton,
              {
                disabled: isDisabled || !value.value.trim(),
                size: "icon",
                type: "submit",
              },
              () => h(SendHorizontal, { "aria-hidden": "true", class: "size-4" }),
            ),
          ]),
        ],
      );
    };
  },
});
