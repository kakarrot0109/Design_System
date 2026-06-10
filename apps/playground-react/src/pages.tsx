import {
  Attachments,
  ChatPanel,
  CitationList,
  Composer,
  MessageItem,
  MessageList,
  ReasoningBlock,
  TaskTimeline,
  ToolCallCard,
} from "@design-system/react-ai";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Empty,
  EmptyDescription,
  EmptyTitle,
  Input,
  List,
  ListItem,
  RadioGroup,
  RadioGroupItem,
  Select,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Textarea,
  Typography,
} from "@design-system/react-ui";
import { FileText, Search } from "lucide-react";

import {
  attachmentItems,
  messages,
  taskSteps,
  tokenGroups,
  toolCalls,
} from "./data";
import {
  ComponentGroup,
  Metric,
  PreviewSection,
  ReferenceItem,
} from "./preview-chrome";

export function OverviewPage() {
  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
      <PreviewSection
        description="包含用户消息、助手消息、streaming、error、工具调用、引用、附件、推理和输入区。"
        title="Assistant 示例"
      >
        <div className="h-[720px] overflow-hidden rounded-lg border bg-background">
          <ChatPanel
            className="h-full"
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
                placeholder="继续输入你的组件验收问题..."
              />
            }
            header={
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold">样式来源统一检查</div>
                  <div className="text-xs text-muted-foreground">
                    shadcn/ui · AI Elements · assistant-ui examples
                  </div>
                </div>
                <Badge variant="outline">mock 数据</Badge>
              </div>
            }
          >
            <MessageList>
              {messages.map((message) => (
                <MessageItem key={message.id} message={message} />
              ))}
            </MessageList>
          </ChatPanel>
        </div>
      </PreviewSection>

      <div className="grid content-start gap-6">
        <PreviewSection title="项目状态">
          <div className="grid gap-3">
            <Metric title="基础组件" value="8" />
            <Metric title="AI 组件" value="9" />
            <Metric title="预览页面" value="4" />
          </div>
        </PreviewSection>
        <PreviewSection title="参考来源">
          <div className="grid gap-2 text-sm">
            <ReferenceItem title="shadcn/ui" />
            <ReferenceItem title="AI Elements" />
            <ReferenceItem title="assistant-ui examples" />
          </div>
        </PreviewSection>
      </div>
    </div>
  );
}

export function ReactUiPage() {
  return (
    <div className="grid gap-6">
      <PreviewSection
        description="覆盖标题、正文、说明文字、弱化文字、代码和小字号。"
        title="Typography"
      >
        <div className="grid gap-4">
          <Typography variant="h1">页面主标题</Typography>
          <Typography variant="h2">区块标题</Typography>
          <Typography variant="lead">用于摘要和辅助说明的 lead 文本。</Typography>
          <Typography>
            默认正文保持 14px、舒适行高，适合后台和 AI 工作台的密集阅读。
          </Typography>
          <div className="flex flex-wrap items-center gap-3">
            <Typography variant="muted">弱化说明文字</Typography>
            <Typography variant="small">小字号标签</Typography>
            <Typography variant="code">pnpm dev</Typography>
          </div>
        </div>
      </PreviewSection>

      <PreviewSection
        description="覆盖 default、secondary、outline、ghost、destructive，以及 sm、md、lg、icon。"
        title="Button"
      >
        <div className="grid gap-4">
          <div className="flex flex-wrap gap-2">
            <Button>默认</Button>
            <Button variant="secondary">次级</Button>
            <Button variant="outline">描边</Button>
            <Button variant="ghost">幽灵</Button>
            <Button variant="destructive">危险</Button>
            <Button disabled>禁用</Button>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button size="sm">小尺寸</Button>
            <Button size="md">中尺寸</Button>
            <Button size="lg">大尺寸</Button>
            <Button aria-label="搜索" size="icon" variant="outline">
              <Search aria-hidden="true" className="size-4" />
            </Button>
          </div>
        </div>
      </PreviewSection>

      <div className="grid gap-6 xl:grid-cols-2">
        <PreviewSection title="Input / Textarea">
          <div className="grid gap-3">
            <Input placeholder="输入组件名称" />
            <Input disabled placeholder="禁用输入框" />
            <Textarea placeholder="记录组件验收意见" />
          </div>
        </PreviewSection>

        <PreviewSection title="Select">
          <div className="grid gap-3">
            <Select aria-label="组件类型" defaultValue="table">
              <option value="button">Button</option>
              <option value="select">Select</option>
              <option value="table">Table</option>
            </Select>
            <Select aria-label="禁用下拉框" disabled>
              <option>禁用状态</option>
            </Select>
          </div>
        </PreviewSection>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <PreviewSection title="Checkbox / RadioGroup">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Checkbox defaultChecked label="显示禁用状态" />
              <Checkbox label="展示错误态样例" />
            </div>
            <RadioGroup aria-label="尺寸" defaultValue="md">
              <RadioGroupItem label="小尺寸" value="sm" />
              <RadioGroupItem label="中尺寸" value="md" />
              <RadioGroupItem label="大尺寸" value="lg" />
            </RadioGroup>
          </div>
        </PreviewSection>

        <PreviewSection title="Badge">
          <div className="flex flex-wrap gap-2">
            <Badge>默认</Badge>
            <Badge variant="secondary">次级</Badge>
            <Badge variant="outline">描边</Badge>
            <Badge variant="destructive">危险</Badge>
          </div>
        </PreviewSection>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <PreviewSection title="List">
          <List>
            <ListItem title="Typography" description="字体层级、正文、辅助文字和代码。" />
            <ListItem title="Form" description="下拉框、单选框、多选框和输入框。" />
            <ListItem title="Data Display" description="列表、表格、状态列和操作列。" />
          </List>
        </PreviewSection>

        <PreviewSection title="Table">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>组件</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Typography</TableCell>
                <TableCell><Badge variant="secondary">已覆盖</Badge></TableCell>
                <TableCell><Button size="sm" variant="outline">查看</Button></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Select</TableCell>
                <TableCell><Badge variant="secondary">已覆盖</Badge></TableCell>
                <TableCell><Button size="sm" variant="outline">查看</Button></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Table</TableCell>
                <TableCell><Badge variant="outline">基础版</Badge></TableCell>
                <TableCell><Button size="sm" variant="outline">查看</Button></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </PreviewSection>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <PreviewSection title="Card">
          <Card>
            <CardHeader>
              <CardTitle>组件卡片</CardTitle>
              <CardDescription>
                白底、细边框、轻圆角，保持 shadcn/ui 的信息层级。
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              卡片用于承载结构化内容，不做花哨阴影。
            </CardContent>
            <CardFooter className="gap-2">
              <Button size="sm">确认</Button>
              <Button size="sm" variant="outline">
                取消
              </Button>
            </CardFooter>
          </Card>
        </PreviewSection>

        <PreviewSection title="Dialog">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">打开弹窗</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>组件设置</DialogTitle>
                <DialogDescription>
                  Dialog 使用 overlay、content、title、description、footer 结构。
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-3">
                <Input placeholder="组件名称" />
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">取消</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button>保存</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </PreviewSection>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <PreviewSection title="Tabs">
          <Tabs defaultValue="usage">
            <TabsList>
              <TabsTrigger value="usage">用法</TabsTrigger>
              <TabsTrigger value="states">状态</TabsTrigger>
              <TabsTrigger value="tokens">变量</TabsTrigger>
            </TabsList>
            <TabsContent value="usage">
              <div className="rounded-md border p-4 text-sm text-muted-foreground">
                分段切换适合后台和 AI 工作台。
              </div>
            </TabsContent>
            <TabsContent value="states">
              <div className="rounded-md border p-4 text-sm text-muted-foreground">
                active 状态使用背景和轻阴影区分。
              </div>
            </TabsContent>
            <TabsContent value="tokens">
              <div className="rounded-md border p-4 text-sm text-muted-foreground">
                颜色来自 CSS Variables。
              </div>
            </TabsContent>
          </Tabs>
        </PreviewSection>

        <PreviewSection title="Empty">
          <Empty>
            <FileText aria-hidden="true" className="size-8 text-muted-foreground" />
            <EmptyTitle>暂无组件</EmptyTitle>
            <EmptyDescription>空状态保持克制，不使用花哨插画。</EmptyDescription>
          </Empty>
        </PreviewSection>
      </div>
    </div>
  );
}

export function ReactAiPage() {
  return (
    <div className="grid gap-6">
      <PreviewSection
        description="支持 grid、inline、list 三种展示模式。"
        title="Attachments"
      >
        <div className="grid gap-5">
          <ComponentGroup label="grid">
            <Attachments items={attachmentItems} variant="grid" />
          </ComponentGroup>
          <ComponentGroup label="inline">
            <Attachments items={attachmentItems} variant="inline" />
          </ComponentGroup>
          <ComponentGroup label="list">
            <Attachments items={attachmentItems} variant="list" />
          </ComponentGroup>
        </div>
      </PreviewSection>

      <PreviewSection
        description="覆盖 pending、running、success、error。"
        title="ToolCallCard"
      >
        <div className="grid gap-3 xl:grid-cols-2">
          {toolCalls.map((tool) => (
            <ToolCallCard key={tool.id} tool={tool} />
          ))}
        </div>
      </PreviewSection>

      <div className="grid gap-6 xl:grid-cols-2">
        <PreviewSection title="CitationList">
          <CitationList
            citations={[
              {
                id: "citation-1",
                title: "组件样式要求",
                description: "定义样式来源、视觉约束和 playground 要求。",
              },
              {
                id: "citation-2",
                title: "assistant-ui examples",
                href: "https://www.assistant-ui.com/examples",
                description: "完整聊天体验参考。",
              },
            ]}
          />
        </PreviewSection>

        <PreviewSection title="ReasoningBlock">
          <ReasoningBlock defaultOpen>
            <p>
              默认可折叠；streaming 时可以展开；使用浅灰背景、细边框和低视觉权重。
            </p>
          </ReasoningBlock>
        </PreviewSection>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <PreviewSection title="TaskTimeline">
          <TaskTimeline steps={taskSteps} />
        </PreviewSection>

        <PreviewSection title="Composer">
          <div className="grid gap-4">
            <Composer attachments={attachmentItems.slice(0, 1)} placeholder="输入消息..." />
            <Composer isLoading placeholder="生成中不可编辑" />
            <Composer disabled placeholder="禁用状态" />
          </div>
        </PreviewSection>
      </div>

      <PreviewSection
        description="覆盖 user、assistant、streaming、done、error。"
        title="MessageItem / MessageList"
      >
        <div className="max-h-[620px] overflow-y-auto rounded-lg border bg-background">
          <MessageList>
            {messages.map((message) => (
              <MessageItem key={message.id} message={message} />
            ))}
          </MessageList>
        </div>
      </PreviewSection>
    </div>
  );
}

export function TokensPage() {
  return (
    <div className="grid gap-6">
      {tokenGroups.map((group) => (
        <PreviewSection key={group.title} title={group.title}>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
            {group.items.map((item) => (
              <div className="overflow-hidden rounded-lg border" key={item.label}>
                <div
                  className={[
                    "flex h-24 items-end p-3 text-sm font-medium",
                    item.className,
                  ].join(" ")}
                >
                  {item.label}
                </div>
                <div className="border-t bg-background p-3 text-xs text-muted-foreground">
                  hsl(var(--{item.label}))
                </div>
              </div>
            ))}
          </div>
        </PreviewSection>
      ))}

      <div className="grid gap-6 xl:grid-cols-3">
        <PreviewSection title="Radius">
          <div className="grid gap-3">
            <div className="h-16 rounded-sm border bg-background" />
            <div className="h-16 rounded-md border bg-background" />
            <div className="h-16 rounded-lg border bg-background" />
          </div>
        </PreviewSection>

        <PreviewSection title="Border">
          <div className="grid gap-3">
            <div className="rounded-md border bg-background p-4 text-sm">默认边框</div>
            <div className="rounded-md border border-dashed bg-background p-4 text-sm">
              虚线边框
            </div>
            <div className="rounded-md border bg-muted p-4 text-sm">弱背景</div>
          </div>
        </PreviewSection>

        <PreviewSection title="Focus Ring">
          <div className="grid gap-3">
            <Button className="ring-2 ring-ring ring-offset-2">按钮 focus</Button>
            <Input className="ring-1 ring-ring" value="输入框 focus" readOnly />
          </div>
        </PreviewSection>
      </div>
    </div>
  );
}
