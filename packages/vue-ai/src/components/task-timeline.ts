import { defineComponent, h, type PropType } from "vue";
import { Circle, CircleAlert, CircleCheck, Loader2 } from "lucide-vue-next";

import { cn } from "@design-system/vue-ui";
import type { TaskStep } from "../types";

const stateIcon = {
  pending: Circle,
  running: Loader2,
  success: CircleCheck,
  error: CircleAlert,
};

export const VTaskTimeline = defineComponent({
  name: "VTaskTimeline",
  props: {
    class: String,
    steps: {
      default: () => [],
      type: Array as PropType<TaskStep[]>,
    },
  },
  setup(props) {
    return () =>
      props.steps.length === 0
        ? null
        : h(
            "div",
            { class: cn("grid min-w-0 gap-0 rounded-lg border", props.class) },
            props.steps.map((step, index) => {
              const Icon = stateIcon[step.state];
              return h(
                "div",
                {
                  class: "grid grid-cols-[2rem_1fr] gap-2 px-3 py-2 text-sm",
                  key: step.id,
                },
                [
                  h("div", { class: "relative flex justify-center" }, [
                    h(Icon, {
                      "aria-hidden": "true",
                      class: cn(
                        "z-10 mt-0.5 size-4 bg-background text-muted-foreground",
                        step.state === "running" && "animate-spin",
                        step.state === "success" && "text-success",
                        step.state === "error" && "text-destructive",
                      ),
                    }),
                    index === props.steps.length - 1
                      ? null
                      : h("span", {
                          class: "absolute left-1/2 top-5 h-full w-px bg-border",
                        }),
                  ]),
                  h("div", { class: "min-w-0" }, [
                    h("div", { class: "font-medium" }, step.title),
                    step.description
                      ? h(
                          "p",
                          { class: "mt-1 text-xs text-muted-foreground" },
                          step.description,
                        )
                      : null,
                  ]),
                ],
              );
            }),
          );
  },
});
