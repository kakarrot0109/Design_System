import * as React from "react";
import { Badge, Button } from "@design-system/react-ui";
import { Bot, Settings2 } from "lucide-react";

import {
  OverviewPage,
  ReactAiPage,
  ReactUiPage,
  TokensPage,
} from "../../playground-react/src/pages";
import { frameworks, unifiedSections, type FrameworkId, type UnifiedSectionId } from "./sections";
import { mountVuePreview } from "./vue-preview";

function App() {
  const [framework, setFramework] = React.useState<FrameworkId>("react");
  const [activeSection, setActiveSection] =
    React.useState<UnifiedSectionId>("overview");
  const [scrollState, setScrollState] =
    React.useState<"top" | "middle" | "bottom">("top");
  const previewScrollRef = React.useRef<HTMLDivElement>(null);
  const activeMeta = unifiedSections.find((section) => section.id === activeSection)!;
  const showTopShadow = scrollState === "middle" || scrollState === "bottom";
  const showBottomShadow = scrollState === "top" || scrollState === "middle";

  function updateScrollState(node: HTMLDivElement) {
    const maxScrollTop = node.scrollHeight - node.clientHeight;

    if (node.scrollTop <= 1 || maxScrollTop <= 1) {
      setScrollState("top");
      return;
    }

    if (node.scrollTop >= maxScrollTop - 1) {
      setScrollState("bottom");
      return;
    }

    setScrollState("middle");
  }

  function switchFramework(nextFramework: FrameworkId) {
    setFramework(nextFramework);
    if (previewScrollRef.current) {
      previewScrollRef.current.scrollTop = 0;
    }
    setScrollState("top");
  }

  function switchSection(nextSection: UnifiedSectionId) {
    setActiveSection(nextSection);
    if (previewScrollRef.current) {
      previewScrollRef.current.scrollTop = 0;
    }
    setScrollState("top");
  }

  return (
    <div className="grid min-h-[100dvh] grid-rows-[auto_1fr] bg-muted/30 text-foreground">
      <header className="border-b bg-background">
        <div className="mx-auto grid w-full max-w-[1180px] gap-2.5 px-4 py-2.5 lg:px-5">
          <div className="flex flex-wrap items-center justify-between gap-2.5">
            <div className="flex min-w-0 items-center gap-2.5">
              <div className="flex size-8 items-center justify-center rounded-md border bg-muted">
                <Bot aria-hidden="true" className="size-3.5" />
              </div>
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold">Design System</div>
                <div className="truncate text-xs text-muted-foreground">
                  React / Vue 统一预览
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Badge variant="outline">{framework === "react" ? "React" : "Vue"} 模式</Badge>
              <Button aria-label="设置" size="icon" variant="ghost">
                <Settings2 aria-hidden="true" className="size-4" />
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2.5">
            <div className="relative inline-grid grid-cols-2 rounded-md border bg-muted p-0.5">
              <span
                aria-hidden="true"
                className={[
                  "absolute inset-y-0.5 left-0.5 w-[calc(50%-2px)] rounded-sm bg-background shadow-sm transition-transform duration-150 ease-out motion-reduce:transition-none",
                  framework === "vue" ? "translate-x-full" : "translate-x-0",
                ].join(" ")}
              />
              {frameworks.map((item) => (
                <button
                  aria-pressed={framework === item.id}
                  className={[
                    "relative z-10 rounded-sm px-2.5 py-1 text-xs font-medium transition-[color,transform] duration-150 ease-out active:scale-[0.98] motion-reduce:transition-none motion-reduce:active:scale-100",
                    framework === item.id
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  ].join(" ")}
                  key={item.id}
                  onClick={() => switchFramework(item.id)}
                  type="button"
                >
                  {item.label}
                </button>
              ))}
            </div>

            <nav aria-label="统一预览导航" className="flex gap-1.5 overflow-x-auto">
              {unifiedSections.map((section) => {
                const Icon = section.icon;

                return (
                  <button
                    aria-pressed={activeSection === section.id}
                    className={[
                      "flex shrink-0 items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs transition-[background-color,border-color,color,box-shadow,transform] duration-150 ease-out active:scale-[0.98] motion-reduce:transition-none motion-reduce:active:scale-100",
                      activeSection === section.id
                        ? "border-primary bg-primary text-primary-foreground shadow-sm"
                        : "bg-background text-muted-foreground hover:border-foreground/20 hover:text-foreground hover:shadow-sm",
                    ].join(" ")}
                    key={section.id}
                    onClick={() => switchSection(section.id)}
                    type="button"
                  >
                    <Icon aria-hidden="true" className="size-3.5" />
                    {section.label}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="min-w-0">
            <h1 className="truncate text-sm font-semibold">{activeMeta.label}</h1>
            <p className="truncate text-xs text-muted-foreground">
              {activeMeta.description}
            </p>
          </div>
        </div>
      </header>

      <main className="relative min-h-0 overflow-hidden">
        <div
          aria-label="组件预览内容"
          className="h-full min-h-0 overflow-y-auto overflow-x-hidden scroll-smooth motion-reduce:scroll-auto"
          data-scroll-state={scrollState}
          onScroll={(event) => updateScrollState(event.currentTarget)}
          ref={previewScrollRef}
        >
          <div className="mx-auto grid w-full max-w-[1180px] gap-4 p-3 sm:p-4 lg:p-5">
          {framework === "react" ? (
            <ReactPreview section={activeSection} />
          ) : (
            <VuePreview section={activeSection} />
          )}
          </div>
        </div>
        <div
          aria-hidden="true"
          className={[
            "pointer-events-none absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-background/80 to-transparent transition-opacity duration-150 motion-reduce:transition-none",
            showTopShadow ? "opacity-100" : "opacity-0",
          ].join(" ")}
        />
        <div
          aria-hidden="true"
          className={[
            "pointer-events-none absolute inset-x-0 bottom-0 h-5 bg-gradient-to-t from-background/90 to-transparent transition-opacity duration-150 motion-reduce:transition-none",
            showBottomShadow ? "opacity-100" : "opacity-0",
          ].join(" ")}
        />
      </main>
    </div>
  );
}

function ReactPreview({ section }: { section: UnifiedSectionId }) {
  if (section === "ui") {
    return <ReactUiPage />;
  }

  if (section === "ai") {
    return <ReactAiPage />;
  }

  if (section === "tokens") {
    return <TokensPage />;
  }

  return <OverviewPage />;
}

function VuePreview({ section }: { section: UnifiedSectionId }) {
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!containerRef.current) {
      return undefined;
    }

    return mountVuePreview(containerRef.current, section);
  }, [section]);

  return <div ref={containerRef} />;
}

export default App;
