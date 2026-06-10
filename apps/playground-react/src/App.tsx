import {
  Attachments,
  ChatPanel,
  Composer,
  MessageItem,
  MessageList,
  type AttachmentItem,
  type MessageRecord,
} from "@design-system/react-ai";
import { Badge, Button, Card, CardContent, CardHeader, CardTitle, Tabs, TabsContent, TabsList, TabsTrigger } from "@design-system/react-ui";
import { Bot, PanelLeft, Search, Settings2 } from "lucide-react";

const attachments: AttachmentItem[] = [
  {
    id: "brief",
    name: "组件样式要求.md",
    type: "file",
    size: "5.8 KB",
    description: "样式规则",
  },
  {
    id: "screen",
    name: "对话区截图.png",
    type: "image",
    size: "840 KB",
    description: "视觉参考",
  },
];

const messages: MessageRecord[] = [
  {
    id: "user-1",
    role: "user",
    content: "请按 shadcn/ui、AI Elements、assistant-ui 的方向，整理这个组件库的首轮验收清单。",
    attachments,
  },
  {
    id: "assistant-1",
    role: "assistant",
    status: "done",
    content: (
      <div className="grid gap-2">
        <p>首轮验收应先看三个层级：基础组件是否统一，AI 组件是否可组合，playground 是否像完整 Assistant。</p>
        <p>我会把颜色、圆角、边框、focus、disabled、附件、工具调用和引用资料作为硬性检查点。</p>
      </div>
    ),
    reasoning: (
      <p>
        文档重点不是新增功能，而是统一视觉来源。因此验收应围绕 token 使用、组件边界和示例完整度。
      </p>
    ),
    tasks: [
      {
        id: "task-1",
        title: "检查基础组件",
        state: "success",
        description: "Button、Input、Card、Badge、Dialog、Tabs、Empty。",
      },
      {
        id: "task-2",
        title: "检查 AI 组件",
        state: "running",
        description: "附件、工具调用、引用资料、推理块、输入区。",
      },
      {
        id: "task-3",
        title: "检查示例页面",
        state: "pending",
        description: "mock 消息覆盖用户、助手、streaming、error。",
      },
    ],
    toolCalls: [
      {
        id: "tool-1",
        name: "inspect_component_tokens",
        state: "success",
        description: "检查组件是否只使用 CSS Variables",
        input: { packages: ["react-ui", "react-ai"] },
        output: { hardcodedBusinessColors: 0, tokenUsage: "通过" },
      },
    ],
    citations: [
      {
        id: "source-1",
        title: "shadcn/ui components",
        href: "https://ui.shadcn.com/docs/components",
        description: "基础组件结构、变体、focus 和 disabled 状态。",
      },
      {
        id: "source-2",
        title: "AI Elements",
        href: "https://elements.ai-sdk.dev/components/attachments",
        description: "附件、工具调用、引用资料和推理组件的组织方式。",
      },
    ],
  },
  {
    id: "assistant-2",
    role: "assistant",
    status: "streaming",
    content: "正在补齐 Composer、ToolCallCard 和 CitationList 的边界状态，并检查 playground 的信息层级。",
    reasoning: "streaming 状态需要默认展开推理块，但视觉权重不能超过正文。",
    toolCalls: [
      {
        id: "tool-2",
        name: "render_playground_preview",
        state: "running",
        description: "生成本地 playground 预览",
        input: { route: "/", viewport: "1280x720" },
      },
    ],
  },
];

function App() {
  return (
    <div className="grid min-h-[100dvh] bg-muted/40 text-foreground lg:grid-cols-[280px_1fr]">
      <aside className="hidden border-r bg-background lg:flex lg:flex-col">
        <div className="flex h-14 items-center gap-2 border-b px-4">
          <div className="flex size-8 items-center justify-center rounded-md border bg-muted">
            <Bot aria-hidden="true" className="size-4" />
          </div>
          <div>
            <div className="text-sm font-semibold">Design System</div>
            <div className="text-xs text-muted-foreground">AI 组件工作台</div>
          </div>
        </div>
        <div className="grid gap-3 p-4">
          <Button className="justify-start" variant="outline">
            <Search aria-hidden="true" className="size-4" />
            搜索组件
          </Button>
          <Card>
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-sm">当前线程</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-2 p-4 pt-0 text-sm">
              <ThreadItem active title="样式来源统一" />
              <ThreadItem title="附件组件验收" />
              <ThreadItem title="ToolCall 状态" />
            </CardContent>
          </Card>
          <Attachments items={attachments} variant="list" />
        </div>
      </aside>

      <main className="min-w-0">
        <ChatPanel
          className="h-[100dvh]"
          composer={
            <Composer
              attachments={[
                {
                  id: "draft",
                  name: "验收草稿.md",
                  type: "file",
                  size: "3.1 KB",
                },
              ]}
              defaultValue=""
              isLoading={false}
              placeholder="继续输入你的组件验收问题..."
            />
          }
          header={<Header />}
        >
          <MessageList className="mx-auto w-full max-w-4xl">
            <Tabs defaultValue="thread">
              <div className="mb-4 flex items-center justify-between gap-3">
                <TabsList>
                  <TabsTrigger value="thread">对话</TabsTrigger>
                  <TabsTrigger value="artifact">产物</TabsTrigger>
                </TabsList>
                <Badge variant="outline">mock 数据</Badge>
              </div>
              <TabsContent className="mt-0 grid gap-6" value="thread">
                {messages.map((message) => (
                  <MessageItem key={message.id} message={message} />
                ))}
              </TabsContent>
              <TabsContent className="mt-0" value="artifact">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">验收清单预览</CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-2 text-sm text-muted-foreground">
                    <p>react-ui 对齐 shadcn/ui。</p>
                    <p>react-ai 对齐 AI Elements 和 assistant-ui。</p>
                    <p>playground 展示完整 AI Assistant 状态。</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </MessageList>
        </ChatPanel>
      </main>
    </div>
  );
}

function Header() {
  return (
    <div className="flex min-h-10 items-center justify-between gap-3">
      <div className="flex min-w-0 items-center gap-3">
        <Button className="lg:hidden" size="icon" variant="ghost">
          <PanelLeft aria-hidden="true" className="size-4" />
          <span className="sr-only">打开侧边栏</span>
        </Button>
        <div className="min-w-0">
          <h1 className="truncate text-sm font-semibold">样式来源统一检查</h1>
          <p className="truncate text-xs text-muted-foreground">
            shadcn/ui · AI Elements · assistant-ui examples
          </p>
        </div>
      </div>
      <Button size="icon" variant="ghost">
        <Settings2 aria-hidden="true" className="size-4" />
        <span className="sr-only">设置</span>
      </Button>
    </div>
  );
}

function ThreadItem({ active, title }: { active?: boolean; title: string }) {
  return (
    <button
      className={[
        "rounded-md px-3 py-2 text-left text-sm transition-colors",
        active ? "bg-muted font-medium" : "text-muted-foreground hover:bg-muted",
      ].join(" ")}
      type="button"
    >
      {title}
    </button>
  );
}

export default App;
