import * as React from "react";

import { cn } from "../lib/utils";

export interface ListProps extends React.HTMLAttributes<HTMLUListElement> {}

export function List({ className, ...props }: ListProps) {
  return <ul className={cn("grid gap-2", className)} {...props} />;
}

export interface ListItemProps
  extends Omit<React.HTMLAttributes<HTMLLIElement>, "title"> {
  description?: React.ReactNode;
  title: React.ReactNode;
}

export function ListItem({
  className,
  description,
  title,
  ...props
}: ListItemProps) {
  return (
    <li className={cn("rounded-md border bg-background p-3", className)} {...props}>
      <div className="text-sm font-medium">{title}</div>
      {description ? (
        <div className="mt-1 text-sm text-muted-foreground">{description}</div>
      ) : null}
    </li>
  );
}
