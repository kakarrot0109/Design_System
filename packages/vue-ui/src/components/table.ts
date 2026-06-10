import { defineComponent, h } from "vue";

import { cn } from "../lib/utils";

function createTablePart(name: string, tag: string, baseClass: string) {
  return defineComponent({
    name,
    props: { class: String },
    setup(props, { attrs, slots }) {
      return () =>
        h(tag, { ...attrs, class: cn(baseClass, props.class) }, slots.default?.());
    },
  });
}

export const VTable = defineComponent({
  name: "VTable",
  props: { class: String },
  setup(props, { attrs, slots }) {
    return () =>
      h("div", { class: "w-full overflow-x-auto" }, [
        h(
          "table",
          { ...attrs, class: cn("w-full caption-bottom text-sm", props.class) },
          slots.default?.(),
        ),
      ]);
  },
});

export const VTableHeader = createTablePart("VTableHeader", "thead", "[&_tr]:border-b");
export const VTableBody = createTablePart("VTableBody", "tbody", "[&_tr:last-child]:border-0");
export const VTableRow = createTablePart(
  "VTableRow",
  "tr",
  "border-b transition-colors hover:bg-muted/50",
);
export const VTableHead = createTablePart(
  "VTableHead",
  "th",
  "h-10 px-3 text-left align-middle text-xs font-medium text-muted-foreground",
);
export const VTableCell = createTablePart("VTableCell", "td", "px-3 py-3 align-middle");
