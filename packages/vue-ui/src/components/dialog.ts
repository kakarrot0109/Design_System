import {
  defineComponent,
  h,
  inject,
  provide,
  ref,
  Teleport,
  type Ref,
} from "vue";

import { cn } from "../lib/utils";

interface DialogContext {
  open: Ref<boolean>;
  setOpen: (value: boolean) => void;
}

const dialogKey = Symbol("dialog");

export const VDialog = defineComponent({
  name: "VDialog",
  setup(_, { slots }) {
    const open = ref(false);
    provide<DialogContext>(dialogKey, {
      open,
      setOpen: (value) => {
        open.value = value;
      },
    });

    return () => slots.default?.();
  },
});

export const VDialogTrigger = defineComponent({
  name: "VDialogTrigger",
  setup(_, { slots }) {
    const context = inject<DialogContext>(dialogKey);
    return () =>
      h(
        "span",
        {
          onClick: () => context?.setOpen(true),
        },
        slots.default?.(),
      );
  },
});

export const VDialogContent = defineComponent({
  name: "VDialogContent",
  props: { class: String },
  setup(props, { slots }) {
    const context = inject<DialogContext>(dialogKey);

    return () =>
      context?.open.value
        ? h(Teleport, { to: "body" }, [
            h("div", {
              class: "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm",
              onClick: () => context.setOpen(false),
            }),
            h(
              "div",
              {
                class: cn(
                  "fixed left-1/2 top-1/2 z-50 grid w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 rounded-lg border bg-background p-6 shadow-lg",
                  props.class,
                ),
                role: "dialog",
              },
              slots.default?.(),
            ),
          ])
        : null;
  },
});

export const VDialogClose = defineComponent({
  name: "VDialogClose",
  setup(_, { slots }) {
    const context = inject<DialogContext>(dialogKey);
    return () =>
      h(
        "span",
        {
          onClick: () => context?.setOpen(false),
        },
        slots.default?.(),
      );
  },
});

function createDialogPart(name: string, tag: string, baseClass: string) {
  return defineComponent({
    name,
    props: { class: String },
    setup(props, { slots }) {
      return () => h(tag, { class: cn(baseClass, props.class) }, slots.default?.());
    },
  });
}

export const VDialogHeader = createDialogPart(
  "VDialogHeader",
  "div",
  "flex flex-col space-y-1.5 text-center sm:text-left",
);
export const VDialogFooter = createDialogPart(
  "VDialogFooter",
  "div",
  "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
);
export const VDialogTitle = createDialogPart(
  "VDialogTitle",
  "h2",
  "text-lg font-semibold leading-none tracking-normal",
);
export const VDialogDescription = createDialogPart(
  "VDialogDescription",
  "p",
  "text-sm text-muted-foreground",
);
