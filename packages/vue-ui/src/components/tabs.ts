import { defineComponent, h, inject, provide, ref, type Ref } from "vue";

import { cn } from "../lib/utils";

interface TabsContext {
  active: Ref<string>;
  setActive: (value: string) => void;
}

const tabsKey = Symbol("tabs");

export const VTabs = defineComponent({
  name: "VTabs",
  props: {
    defaultValue: {
      required: true,
      type: String,
    },
  },
  setup(props, { slots }) {
    const active = ref(props.defaultValue);
    provide<TabsContext>(tabsKey, {
      active,
      setActive: (value) => {
        active.value = value;
      },
    });

    return () => h("div", slots.default?.());
  },
});

export const VTabsList = defineComponent({
  name: "VTabsList",
  props: { class: String },
  setup(props, { slots }) {
    return () =>
      h(
        "div",
        {
          class: cn(
            "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
            props.class,
          ),
          role: "tablist",
        },
        slots.default?.(),
      );
  },
});

export const VTabsTrigger = defineComponent({
  name: "VTabsTrigger",
  props: {
    class: String,
    value: {
      required: true,
      type: String,
    },
  },
  setup(props, { slots }) {
    const context = inject<TabsContext>(tabsKey);

    return () => {
      const isActive = context?.active.value === props.value;

      return h(
        "button",
        {
          "aria-selected": isActive,
          class: cn(
            "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
            isActive && "bg-background text-foreground shadow",
            props.class,
          ),
          onClick: () => context?.setActive(props.value),
          role: "tab",
          type: "button",
        },
        slots.default?.(),
      );
    };
  },
});

export const VTabsContent = defineComponent({
  name: "VTabsContent",
  props: {
    class: String,
    value: {
      required: true,
      type: String,
    },
  },
  setup(props, { slots }) {
    const context = inject<TabsContext>(tabsKey);

    return () =>
      context?.active.value === props.value
        ? h(
            "div",
            {
              class: cn(
                "mt-2 min-w-0 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                props.class,
              ),
              role: "tabpanel",
            },
            slots.default?.(),
          )
        : null;
  },
});
