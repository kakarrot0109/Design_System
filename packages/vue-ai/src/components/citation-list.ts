import { defineComponent, h, type PropType } from "vue";
import { ExternalLink } from "lucide-vue-next";

import { cn } from "@design-system/vue-ui";
import type { Citation } from "../types";

export const VCitationList = defineComponent({
  name: "VCitationList",
  props: {
    citations: {
      default: () => [],
      type: Array as PropType<Citation[]>,
    },
    class: String,
  },
  setup(props) {
    return () =>
      props.citations.length === 0
        ? null
        : h(
            "ol",
            { class: cn("grid min-w-0 gap-2", props.class) },
            props.citations.map((citation, index) =>
              h(
                "li",
                {
                  class:
                    "flex min-w-0 gap-3 rounded-md border bg-background p-3 text-sm",
                  key: citation.id,
                },
                [
                  h(
                    "span",
                    {
                      class:
                        "flex size-6 shrink-0 items-center justify-center rounded-full border text-xs text-muted-foreground",
                    },
                    String(index + 1),
                  ),
                  h("div", { class: "min-w-0 flex-1" }, [
                    h("div", { class: "flex items-center gap-1 font-medium" }, [
                      citation.href
                        ? h(
                            "a",
                            {
                              class: "truncate underline-offset-4 hover:underline",
                              href: citation.href,
                            },
                            citation.title,
                          )
                        : h("span", { class: "truncate" }, citation.title),
                      citation.href
                        ? h(ExternalLink, {
                            "aria-hidden": "true",
                            class: "size-3.5 shrink-0 text-muted-foreground",
                          })
                        : null,
                    ]),
                    citation.description
                      ? h(
                          "p",
                          { class: "mt-1 text-xs text-muted-foreground" },
                          citation.description,
                        )
                      : null,
                  ]),
                ],
              ),
            ),
          );
  },
});
