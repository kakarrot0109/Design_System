import { defineComponent, h, type PropType } from "vue";
import {
  File,
  FileAudio,
  FileImage,
  FileText,
  Film,
  Link,
  X,
} from "lucide-vue-next";

import { cn, VButton } from "@design-system/vue-ui";
import type { AttachmentItem, AttachmentVariant } from "../types";

const iconMap = {
  image: FileImage,
  pdf: FileText,
  audio: FileAudio,
  video: Film,
  link: Link,
  file: File,
};

const listClasses: Record<AttachmentVariant, string> = {
  grid: "grid grid-cols-1 gap-2 sm:grid-cols-2",
  inline: "flex flex-row flex-wrap gap-2",
  list: "flex flex-col gap-2",
};

export const VAttachments = defineComponent({
  name: "VAttachments",
  props: {
    class: String,
    items: {
      default: () => [],
      type: Array as PropType<AttachmentItem[]>,
    },
    variant: {
      default: "grid",
      type: String as PropType<AttachmentVariant>,
    },
  },
  emits: ["remove"],
  setup(props, { emit }) {
    return () =>
      props.items.length === 0
        ? null
        : h(
            "div",
            {
              class: cn("min-w-0 max-w-full", listClasses[props.variant], props.class),
              role: "list",
            },
            props.items.map((item) =>
              h(AttachmentCard, {
                item,
                key: item.id,
                onRemove: (removed: AttachmentItem) => emit("remove", removed),
                variant: props.variant,
              }),
            ),
          );
  },
});

const AttachmentCard = defineComponent({
  name: "AttachmentCard",
  props: {
    item: {
      required: true,
      type: Object as PropType<AttachmentItem>,
    },
    variant: {
      default: "grid",
      type: String as PropType<AttachmentVariant>,
    },
  },
  emits: ["remove"],
  setup(props, { emit }) {
    return () =>
      h(
        "div",
        {
          class: cn(
            "group flex min-w-0 items-center gap-3 rounded-md border bg-background p-2 text-sm",
            props.variant === "grid" && "min-h-20",
            props.variant === "inline" && "w-full max-w-full sm:w-auto sm:max-w-64",
          ),
          role: "listitem",
        },
        [
          h(AttachmentPreview, { item: props.item }),
          h(AttachmentInfo, { item: props.item }),
          h(
            VButton,
            {
              ariaLabel: `移除 ${props.item.name}`,
              class: "size-7 shrink-0 opacity-70 hover:opacity-100",
              onClick: () => emit("remove", props.item),
              size: "icon",
              variant: "ghost",
            },
            () => h(X, { "aria-hidden": "true", class: "size-3.5" }),
          ),
        ],
      );
  },
});

const AttachmentPreview = defineComponent({
  name: "AttachmentPreview",
  props: {
    item: {
      required: true,
      type: Object as PropType<AttachmentItem>,
    },
  },
  setup(props) {
    return () => {
      const Icon = iconMap[props.item.type];

      if (props.item.type === "image" && props.item.url) {
        return h("img", {
          alt: "",
          class: "size-10 rounded-md border object-cover",
          src: props.item.url,
        });
      }

      return h(
        "div",
        {
          class:
            "flex size-10 shrink-0 items-center justify-center rounded-md border bg-muted text-muted-foreground",
        },
        h(Icon, { "aria-hidden": "true", class: "size-4" }),
      );
    };
  },
});

const AttachmentInfo = defineComponent({
  name: "AttachmentInfo",
  props: {
    item: {
      required: true,
      type: Object as PropType<AttachmentItem>,
    },
  },
  setup(props) {
    return () =>
      h("div", { class: "min-w-0 flex-1" }, [
        h("div", { class: "truncate font-medium text-foreground" }, props.item.name),
        h(
          "div",
          { class: "truncate text-xs text-muted-foreground" },
          [props.item.description, props.item.size].filter(Boolean).join(" · ") ||
            props.item.type,
        ),
      ]);
  },
});
