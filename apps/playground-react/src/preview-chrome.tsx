import type * as React from "react";
import { Badge, Button } from "@design-system/react-ui";
import { Bot, CheckCircle2, Sparkles } from "lucide-react";

import type { SectionMeta } from "./data";

export function BrandHeader() {
  return (
    <div className="flex h-16 items-center gap-3 border-b px-4">
      <div className="flex size-9 items-center justify-center rounded-md border bg-muted">
        <Bot aria-hidden="true" className="size-4" />
      </div>
      <div className="min-w-0">
        <div className="truncate text-sm font-semibold">Design System</div>
        <div className="truncate text-xs text-muted-foreground">正式预览项目</div>
      </div>
    </div>
  );
}

export function NavigationButton({
  active,
  onClick,
  section,
}: {
  active: boolean;
  onClick: () => void;
  section: SectionMeta;
}) {
  const Icon = section.icon;

  return (
    <button
      className={[
        "flex items-center gap-3 rounded-md px-3 py-2 text-left text-sm transition-colors",
        active ? "bg-muted font-medium" : "text-muted-foreground hover:bg-muted",
      ].join(" ")}
      onClick={onClick}
      type="button"
    >
      <Icon aria-hidden="true" className="size-4 shrink-0" />
      <span className="min-w-0">
        <span className="block truncate">{section.label}</span>
        <span className="block truncate text-xs font-normal text-muted-foreground">
          {section.description}
        </span>
      </span>
    </button>
  );
}

export function StatusPanel() {
  return (
    <div className="grid gap-3 text-sm">
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground">预览覆盖</span>
        <Badge variant="secondary">4 个页面</Badge>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground">数据来源</span>
        <Badge variant="outline">mock</Badge>
      </div>
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <CheckCircle2 aria-hidden="true" className="size-4 text-success" />
        tokens、react-ui、react-ai 已接入
      </div>
    </div>
  );
}

export function PreviewSection({
  children,
  description,
  title,
}: {
  children: React.ReactNode;
  description?: string;
  title: string;
}) {
  return (
    <section className="playground-section group grid gap-2">
      <div className="flex flex-col gap-1">
        <h2 className="text-sm font-semibold">{title}</h2>
        {description ? (
          <p className="max-w-3xl text-xs leading-5 text-muted-foreground">{description}</p>
        ) : null}
      </div>
      <div className="rounded-md border bg-background p-3 transition-[border-color,box-shadow,transform] duration-150 ease-out group-hover:border-foreground/20 group-hover:shadow-sm group-focus-within:border-ring/50 group-focus-within:shadow-sm motion-safe:group-hover:-translate-y-0.5 motion-reduce:transition-none">
        {children}
      </div>
    </section>
  );
}

export function ComponentGroup({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <div className="grid gap-2">
      <div className="text-xs font-medium text-muted-foreground">{label}</div>
      {children}
    </div>
  );
}

export function Metric({ title, value }: { title: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-md border bg-background p-2.5 transition-[border-color,box-shadow,transform] duration-150 ease-out hover:border-foreground/20 hover:shadow-sm motion-safe:hover:-translate-y-0.5 motion-reduce:transition-none">
      <span className="text-xs text-muted-foreground">{title}</span>
      <span className="text-base font-semibold">{value}</span>
    </div>
  );
}

export function ReferenceItem({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-2 rounded-md border bg-background p-2.5 text-sm transition-[border-color,box-shadow,transform] duration-150 ease-out hover:border-foreground/20 hover:shadow-sm motion-safe:hover:-translate-y-0.5 motion-reduce:transition-none">
      <Sparkles aria-hidden="true" className="size-3.5 text-muted-foreground" />
      <span className="truncate">{title}</span>
    </div>
  );
}
