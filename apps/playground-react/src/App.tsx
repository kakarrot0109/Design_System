import * as React from "react";
import { Badge, Button } from "@design-system/react-ui";
import { Settings2 } from "lucide-react";

import { sections, type SectionId } from "./data";
import {
  OverviewPage,
  ReactAiPage,
  ReactUiPage,
  TokensPage,
} from "./pages";
import {
  BrandHeader,
  NavigationButton,
  StatusPanel,
} from "./preview-chrome";

function App() {
  const [activeSection, setActiveSection] =
    React.useState<SectionId>("overview");
  const activeMeta = sections.find((section) => section.id === activeSection)!;

  return (
    <div className="grid min-h-[100dvh] bg-muted/40 text-foreground lg:grid-cols-[280px_1fr]">
      <aside className="hidden border-r bg-background lg:flex lg:flex-col">
        <BrandHeader />
        <nav className="grid gap-1 p-3" aria-label="组件预览导航">
          {sections.map((section) => (
            <NavigationButton
              active={activeSection === section.id}
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              section={section}
            />
          ))}
        </nav>
        <div className="mt-auto border-t p-4">
          <StatusPanel />
        </div>
      </aside>

      <main className="min-w-0">
        <div className="flex h-[100dvh] min-h-0 flex-col">
          <header className="border-b bg-background px-4 py-3">
            <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4">
              <div className="min-w-0">
                <h1 className="truncate text-sm font-semibold">{activeMeta.label}</h1>
                <p className="truncate text-xs text-muted-foreground">
                  {activeMeta.description}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">可直接预览</Badge>
                <Button size="icon" variant="ghost">
                  <Settings2 aria-hidden="true" className="size-4" />
                  <span className="sr-only">设置</span>
                </Button>
              </div>
            </div>
            <div className="mt-3 flex gap-2 overflow-x-auto lg:hidden">
              {sections.map((section) => (
                <Button
                  className="shrink-0"
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  size="sm"
                  variant={activeSection === section.id ? "default" : "outline"}
                >
                  {section.label}
                </Button>
              ))}
            </div>
          </header>

          <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden">
            <div className="mx-auto grid w-full max-w-7xl gap-6 p-4 lg:p-6">
              {activeSection === "overview" ? <OverviewPage /> : null}
              {activeSection === "react-ui" ? <ReactUiPage /> : null}
              {activeSection === "react-ai" ? <ReactAiPage /> : null}
              {activeSection === "tokens" ? <TokensPage /> : null}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
