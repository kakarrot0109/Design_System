import * as React from "react";

import { cn } from "../lib/utils";

type TypographyVariant = "h1" | "h2" | "h3" | "p" | "lead" | "muted" | "small" | "code";

const variantClass: Record<TypographyVariant, string> = {
  code: "rounded bg-muted px-1.5 py-0.5 font-mono text-sm",
  h1: "text-3xl font-semibold tracking-normal",
  h2: "text-2xl font-semibold tracking-normal",
  h3: "text-xl font-semibold tracking-normal",
  lead: "text-lg text-muted-foreground",
  muted: "text-sm text-muted-foreground",
  p: "text-sm leading-6",
  small: "text-xs font-medium leading-none",
};

const variantTag: Record<TypographyVariant, React.ElementType> = {
  code: "code",
  h1: "h1",
  h2: "h2",
  h3: "h3",
  lead: "p",
  muted: "p",
  p: "p",
  small: "small",
};

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: TypographyVariant;
}

export function Typography({
  className,
  variant = "p",
  ...props
}: TypographyProps) {
  const Component = variantTag[variant];

  return (
    <Component className={cn(variantClass[variant], className)} {...props} />
  );
}
