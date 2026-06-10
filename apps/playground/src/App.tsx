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
  const activeMeta = unifiedSections.find((section) => section.id === activeSection)!;

  return (
    <div className="grid min-h-[100dvh] grid-rows-[auto_1fr] bg-muted/40 text-foreground">
      <header className="border-b bg-background">
        <div className="mx-auto grid w-full max-w-7xl gap-3 px-4 py-3 lg:px-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-md border bg-muted">
                <Bot aria-hidden="true" className="size-4" />
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

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex rounded-lg border bg-muted p-1">
              {frameworks.map((item) => (
                <button
                  aria-pressed={framework === item.id}
                  className={[
                    "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                    framework === item.id
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground",
                  ].join(" ")}
                  key={item.id}
                  onClick={() => setFramework(item.id)}
                  type="button"
                >
                  {item.label}
                </button>
              ))}
            </div>

            <nav aria-label="统一预览导航" className="flex gap-2 overflow-x-auto">
              {unifiedSections.map((section) => {
                const Icon = section.icon;

                return (
                  <button
                    aria-pressed={activeSection === section.id}
                    className={[
                      "flex shrink-0 items-center gap-2 rounded-md border px-3 py-1.5 text-sm transition-colors",
                      activeSection === section.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-background text-muted-foreground hover:text-foreground",
                    ].join(" ")}
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    type="button"
                  >
                    <Icon aria-hidden="true" className="size-4" />
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

      <main className="min-h-0 overflow-y-auto overflow-x-hidden">
        <div className="mx-auto grid w-full max-w-7xl gap-6 p-4 lg:p-6">
          {framework === "react" ? (
            <ReactPreview section={activeSection} />
          ) : (
            <VuePreview section={activeSection} />
          )}
        </div>
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
