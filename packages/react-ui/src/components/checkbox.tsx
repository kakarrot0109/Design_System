import * as React from "react";

import { cn } from "../lib/utils";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: React.ReactNode;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, ...props }, ref) => (
    <label className="inline-flex items-center gap-2 text-sm">
      <input
        className={cn(
          "size-4 rounded border border-input accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        type="checkbox"
        {...props}
      />
      {label ? <span>{label}</span> : null}
    </label>
  ),
);
Checkbox.displayName = "Checkbox";
