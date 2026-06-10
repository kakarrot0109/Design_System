import * as React from "react";
import { Circle, CircleAlert, CircleCheck, Loader2 } from "lucide-react";

import { cn } from "@design-system/react-ui";
import type { TaskState, TaskStep } from "../types";

const stateIcon = {
  pending: Circle,
  running: Loader2,
  success: CircleCheck,
  error: CircleAlert,
};

export interface TaskTimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: TaskStep[];
}

export function TaskTimeline({ steps, className, ...props }: TaskTimelineProps) {
  if (steps.length === 0) {
    return null;
  }

  return (
    <div className={cn("grid min-w-0 gap-0 rounded-lg border", className)} {...props}>
      {steps.map((step, index) => (
        <TimelineStep
          isLast={index === steps.length - 1}
          key={step.id}
          step={step}
        />
      ))}
    </div>
  );
}

function TimelineStep({ step, isLast }: { step: TaskStep; isLast: boolean }) {
  const Icon = stateIcon[step.state];

  return (
    <div className="grid grid-cols-[2rem_1fr] gap-2 px-3 py-2 text-sm">
      <div className="relative flex justify-center">
        <Icon
          aria-hidden="true"
          className={cn(
            "z-10 mt-0.5 size-4 bg-background text-muted-foreground",
            step.state === "running" && "animate-spin",
            step.state === "success" && "text-success",
            step.state === "error" && "text-destructive",
          )}
        />
        {!isLast ? (
          <span className="absolute left-1/2 top-5 h-full w-px bg-border" />
        ) : null}
      </div>
      <div className="min-w-0">
        <div className="font-medium">{step.title}</div>
        {step.description ? (
          <p className="mt-1 text-xs text-muted-foreground">{step.description}</p>
        ) : null}
      </div>
    </div>
  );
}

export function taskStateLabel(state: TaskState) {
  return state;
}
