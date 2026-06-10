import * as React from "react";

import { cn } from "../lib/utils";

interface RadioGroupContextValue {
  defaultValue?: string;
  name: string;
  onValueChange?: (value: string) => void;
  value?: string;
}

const RadioGroupContext = React.createContext<RadioGroupContextValue | null>(null);

export interface RadioGroupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange"> {
  defaultValue?: string;
  name?: string;
  onValueChange?: (value: string) => void;
  value?: string;
}

export function RadioGroup({
  className,
  defaultValue,
  name,
  onValueChange,
  value,
  ...props
}: RadioGroupProps) {
  const generatedName = React.useId();

  return (
    <RadioGroupContext.Provider
      value={{ defaultValue, name: name ?? generatedName, onValueChange, value }}
    >
      <div
        className={cn("grid gap-2", className)}
        role="radiogroup"
        {...props}
      />
    </RadioGroupContext.Provider>
  );
}

export interface RadioGroupItemProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: React.ReactNode;
  value: string;
}

export const RadioGroupItem = React.forwardRef<HTMLInputElement, RadioGroupItemProps>(
  ({ className, label, value, ...props }, ref) => {
    const context = React.useContext(RadioGroupContext);

    return (
      <label className="inline-flex items-center gap-2 text-sm">
        <input
          checked={context?.value === undefined ? undefined : context.value === value}
          className={cn(
            "size-4 border border-input accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          defaultChecked={context?.value === undefined && context?.defaultValue === value}
          name={context?.name}
          onChange={(event) => {
            props.onChange?.(event);
            if (event.currentTarget.checked) {
              context?.onValueChange?.(value);
            }
          }}
          ref={ref}
          type="radio"
          value={value}
          {...props}
        />
        <span>{label}</span>
      </label>
    );
  },
);
RadioGroupItem.displayName = "RadioGroupItem";
