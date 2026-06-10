import { createApp, defineComponent, h, type VNodeChild } from "vue";
import {
  VAttachments,
  VChatPanel,
  VCitationList,
  VComposer,
  VMessageItem,
  VMessageList,
  VReasoningBlock,
  VTaskTimeline,
  VToolCallCard,
} from "@design-system/vue-ai";
import {
  VBadge,
  VButton,
  VCard,
  VCardContent,
  VCardDescription,
  VCardFooter,
  VCardHeader,
  VCardTitle,
  VDialog,
  VDialogClose,
  VDialogContent,
  VDialogDescription,
  VDialogFooter,
  VDialogHeader,
  VDialogTitle,
  VDialogTrigger,
  VEmpty,
  VEmptyDescription,
  VEmptyTitle,
  VInput,
  VTabs,
  VTabsContent,
  VTabsList,
  VTabsTrigger,
  VTextarea,
} from "@design-system/vue-ui";
import { FileText, Search, Sparkles } from "lucide-vue-next";

import {
  attachmentItems,
  messages,
  taskSteps,
  tokenGroups,
  toolCalls,
} from "../../playground-vue/src/data";
import type { UnifiedSectionId } from "./sections";

export function mountVuePreview(container: HTMLElement, section: UnifiedSectionId) {
  const app = createApp({
    render: () => renderVueSection(section),
  });

  app.mount(container);

  return () => {
    app.unmount();
  };
}

function renderVueSection(section: UnifiedSectionId) {
  if (section === "ui") {
    return renderVueUiPage();
  }

  if (section === "ai") {
    return renderVueAiPage();
  }

  if (section === "tokens") {
    return renderTokensPage();
  }

  return renderOverviewPage();
}

function renderOverviewPage() {
  return h("div", { class: "grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]" }, [
    previewSection(
      "Assistant 示例",
      [
        h("div", { class: "h-[720px] overflow-hidden rounded-lg border bg-background" }, [
          h(
            VChatPanel,
            { class: "h-full" },
            {
              composer: () =>
                h(VComposer, {
                  attachments: [
                    {
                      id: "draft",
                      name: "Vue 验收草稿.md",
                      size: "3.1 KB",
                      type: "file",
                    },
                  ],
                  placeholder: "继续输入你的 Vue 组件验收问题...",
                }),
              default: () =>
                h(
                  VMessageList,
                  null,
                  () =>
                    messages.map((message) =>
                      h(VMessageItem, { key: message.id, message }),
                    ),
                ),
              header: () =>
                h("div", { class: "flex items-center justify-between gap-3" }, [
                  h("div", [
                    h("div", { class: "text-sm font-semibold" }, "Vue 样式来源统一检查"),
                    h(
                      "div",
                      { class: "text-xs text-muted-foreground" },
                      "shadcn/ui · AI Elements · assistant-ui examples",
                    ),
                  ]),
                  h(VBadge, { variant: "outline" }, () => "mock 数据"),
                ]),
            },
          ),
        ]),
      ],
      "包含用户消息、助手消息、streaming、error、工具调用、引用、附件、推理和输入区。",
    ),
    h("div", { class: "grid content-start gap-6" }, [
      previewSection("项目状态", [
        h("div", { class: "grid gap-3" }, [
          metric("基础组件", "8"),
          metric("AI 组件", "9"),
          metric("预览页面", "4"),
        ]),
      ]),
      previewSection("参考来源", [
        h("div", { class: "grid gap-2 text-sm" }, [
          referenceItem("shadcn/ui"),
          referenceItem("AI Elements"),
          referenceItem("assistant-ui examples"),
          h(VBadge, { class: "w-fit", variant: "outline" }, () => "vue-ui"),
        ]),
      ]),
    ]),
  ]);
}

function renderVueUiPage() {
  return h("div", { class: "grid gap-6" }, [
    previewSection(
      "Button",
      [
        h("div", { class: "grid gap-4" }, [
          h("div", { class: "flex flex-wrap gap-2" }, [
            h(VButton, null, () => "默认"),
            h(VButton, { variant: "secondary" }, () => "次级"),
            h(VButton, { variant: "outline" }, () => "描边"),
            h(VButton, { variant: "ghost" }, () => "幽灵"),
            h(VButton, { variant: "destructive" }, () => "危险"),
            h(VButton, { disabled: true }, () => "禁用"),
          ]),
          h("div", { class: "flex flex-wrap items-center gap-2" }, [
            h(VButton, { size: "sm" }, () => "小尺寸"),
            h(VButton, { size: "md" }, () => "中尺寸"),
            h(VButton, { size: "lg" }, () => "大尺寸"),
            h(VButton, { ariaLabel: "搜索", size: "icon", variant: "outline" }, () =>
              h(Search, { "aria-hidden": "true", class: "size-4" }),
            ),
          ]),
        ]),
      ],
      "覆盖 default、secondary、outline、ghost、destructive，以及 sm、md、lg、icon。",
    ),
    h("div", { class: "grid gap-6 xl:grid-cols-2" }, [
      previewSection("Input / Textarea", [
        h("div", { class: "grid gap-3" }, [
          h(VInput, { placeholder: "输入组件名称" }),
          h(VInput, { disabled: true, placeholder: "禁用输入框" }),
          h(VTextarea, { placeholder: "记录组件验收意见" }),
        ]),
      ]),
      previewSection("Badge", [
        h("div", { class: "flex flex-wrap gap-2" }, [
          h(VBadge, null, () => "默认"),
          h(VBadge, { variant: "secondary" }, () => "次级"),
          h(VBadge, { variant: "outline" }, () => "描边"),
          h(VBadge, { variant: "destructive" }, () => "危险"),
        ]),
      ]),
    ]),
    h("div", { class: "grid gap-6 xl:grid-cols-2" }, [
      previewSection("Card", [
        h(VCard, null, () => [
          h(VCardHeader, null, () => [
            h(VCardTitle, null, () => "组件卡片"),
            h(
              VCardDescription,
              null,
              () => "白底、细边框、轻圆角，保持 shadcn/ui 的信息层级。",
            ),
          ]),
          h(
            VCardContent,
            { class: "text-sm text-muted-foreground" },
            () => "卡片用于承载结构化内容，不做花哨阴影。",
          ),
          h(VCardFooter, { class: "gap-2" }, () => [
            h(VButton, { size: "sm" }, () => "确认"),
            h(VButton, { size: "sm", variant: "outline" }, () => "取消"),
          ]),
        ]),
      ]),
      previewSection("Dialog", [
        h(VDialog, null, () => [
          h(VDialogTrigger, null, () =>
            h(VButton, { variant: "outline" }, () => "打开弹窗"),
          ),
          h(VDialogContent, null, () => [
            h(VDialogHeader, null, () => [
              h(VDialogTitle, null, () => "组件设置"),
              h(
                VDialogDescription,
                null,
                () => "Dialog 使用 overlay、content、title、description、footer 结构。",
              ),
            ]),
            h(VInput, { placeholder: "组件名称" }),
            h(VDialogFooter, null, () => [
              h(VDialogClose, null, () =>
                h(VButton, { variant: "outline" }, () => "取消"),
              ),
              h(VDialogClose, null, () => h(VButton, null, () => "保存")),
            ]),
          ]),
        ]),
      ]),
    ]),
    h("div", { class: "grid gap-6 xl:grid-cols-2" }, [
      previewSection("Tabs", [
        h(VTabs, { defaultValue: "usage" }, () => [
          h(VTabsList, null, () => [
            h(VTabsTrigger, { value: "usage" }, () => "用法"),
            h(VTabsTrigger, { value: "states" }, () => "状态"),
            h(VTabsTrigger, { value: "tokens" }, () => "变量"),
          ]),
          h(VTabsContent, { value: "usage" }, () =>
            h(
              "div",
              { class: "rounded-md border p-4 text-sm text-muted-foreground" },
              "分段切换适合后台和 AI 工作台。",
            ),
          ),
          h(VTabsContent, { value: "states" }, () =>
            h(
              "div",
              { class: "rounded-md border p-4 text-sm text-muted-foreground" },
              "active 状态使用背景和轻阴影区分。",
            ),
          ),
          h(VTabsContent, { value: "tokens" }, () =>
            h(
              "div",
              { class: "rounded-md border p-4 text-sm text-muted-foreground" },
              "颜色来自 CSS Variables。",
            ),
          ),
        ]),
      ]),
      previewSection("Empty", [
        h(VEmpty, null, () => [
          h(FileText, { "aria-hidden": "true", class: "size-8 text-muted-foreground" }),
          h(VEmptyTitle, null, () => "暂无组件"),
          h(VEmptyDescription, null, () => "空状态保持克制，不使用花哨插画。"),
        ]),
      ]),
    ]),
  ]);
}

function renderVueAiPage() {
  return h("div", { class: "grid gap-6" }, [
    previewSection(
      "Attachments",
      [
        h("div", { class: "grid gap-5" }, [
          componentGroup("grid", h(VAttachments, { items: attachmentItems, variant: "grid" })),
          componentGroup("inline", h(VAttachments, { items: attachmentItems, variant: "inline" })),
          componentGroup("list", h(VAttachments, { items: attachmentItems, variant: "list" })),
        ]),
      ],
      "支持 grid、inline、list 三种展示模式。",
    ),
    previewSection(
      "ToolCallCard",
      [
        h(
          "div",
          { class: "grid gap-3 xl:grid-cols-2" },
          toolCalls.map((tool) => h(VToolCallCard, { key: tool.id, tool })),
        ),
      ],
      "覆盖 pending、running、success、error。",
    ),
    h("div", { class: "grid gap-6 xl:grid-cols-2" }, [
      previewSection("CitationList", [
        h(VCitationList, {
          citations: [
            {
              description: "定义样式来源、视觉约束和 playground 要求。",
              id: "citation-1",
              title: "组件样式要求",
            },
            {
              description: "完整 Vue 预览参考。",
              id: "citation-2",
              title: "Vue playground",
            },
          ],
        }),
      ]),
      previewSection("ReasoningBlock", [
        h(
          VReasoningBlock,
          { defaultOpen: true },
          () => "默认可折叠；streaming 时可以展开；使用浅灰背景、细边框和低视觉权重。",
        ),
      ]),
    ]),
    h("div", { class: "grid gap-6 xl:grid-cols-2" }, [
      previewSection("TaskTimeline", [h(VTaskTimeline, { steps: taskSteps })]),
      previewSection("Composer", [
        h("div", { class: "grid gap-4" }, [
          h(VComposer, { attachments: attachmentItems.slice(0, 1), placeholder: "输入消息..." }),
          h(VComposer, { isLoading: true, placeholder: "生成中不可编辑" }),
          h(VComposer, { disabled: true, placeholder: "禁用状态" }),
        ]),
      ]),
    ]),
    previewSection(
      "MessageItem / MessageList",
      [
        h("div", { class: "max-h-[620px] overflow-y-auto rounded-lg border bg-background" }, [
          h(
            VMessageList,
            null,
            () =>
              messages.map((message) =>
                h(VMessageItem, { key: message.id, message }),
              ),
          ),
        ]),
      ],
      "覆盖 user、assistant、streaming、done、error。",
    ),
  ]);
}

function renderTokensPage() {
  return h("div", { class: "grid gap-6" }, [
    ...tokenGroups.map((group) =>
      previewSection(
        group.title,
        h("div", { class: "grid gap-3 sm:grid-cols-2 xl:grid-cols-5" }, [
          group.items.map((item) =>
            h("div", { class: "overflow-hidden rounded-lg border", key: item.label }, [
              h(
                "div",
                { class: ["flex h-24 items-end p-3 text-sm font-medium", item.className] },
                item.label,
              ),
              h(
                "div",
                { class: "border-t bg-background p-3 text-xs text-muted-foreground" },
                `hsl(var(--${item.label}))`,
              ),
            ]),
          ),
        ]),
      ),
    ),
    h("div", { class: "grid gap-6 xl:grid-cols-3" }, [
      previewSection("Radius", [
        h("div", { class: "grid gap-3" }, [
          h("div", { class: "h-16 rounded-sm border bg-background" }),
          h("div", { class: "h-16 rounded-md border bg-background" }),
          h("div", { class: "h-16 rounded-lg border bg-background" }),
        ]),
      ]),
      previewSection("Border", [
        h("div", { class: "grid gap-3" }, [
          h("div", { class: "rounded-md border bg-background p-4 text-sm" }, "默认边框"),
          h(
            "div",
            { class: "rounded-md border border-dashed bg-background p-4 text-sm" },
            "虚线边框",
          ),
          h("div", { class: "rounded-md border bg-muted p-4 text-sm" }, "弱背景"),
        ]),
      ]),
      previewSection("Focus Ring", [
        h("div", { class: "grid gap-3" }, [
          h(VButton, { class: "ring-2 ring-ring ring-offset-2" }, () => "按钮 focus"),
          h(VInput, { class: "ring-1 ring-ring", modelValue: "输入框 focus", readonly: true }),
        ]),
      ]),
    ]),
  ]);
}

const PreviewSection = defineComponent({
  props: {
    description: String,
    title: {
      required: true,
      type: String,
    },
  },
  setup(props, { slots }) {
    return () =>
      h("section", { class: "grid gap-3" }, [
        h("div", { class: "flex flex-col gap-1" }, [
          h("h2", { class: "text-base font-semibold" }, props.title),
          props.description
            ? h("p", { class: "max-w-3xl text-sm text-muted-foreground" }, props.description)
            : null,
        ]),
        h("div", { class: "rounded-lg border bg-background p-4" }, slots.default?.()),
      ]);
  },
});

function previewSection(title: string, children: VNodeChild, description?: string) {
  return h(PreviewSection, { description, title }, () => children);
}

function componentGroup(label: string, children: VNodeChild) {
  return h("div", { class: "grid gap-2" }, [
    h("div", { class: "text-xs font-medium text-muted-foreground" }, label),
    children,
  ]);
}

function metric(title: string, value: string) {
  return h("div", { class: "flex items-center justify-between rounded-lg border bg-background p-3" }, [
    h("span", { class: "text-sm text-muted-foreground" }, title),
    h("span", { class: "text-lg font-semibold" }, value),
  ]);
}

function referenceItem(title: string) {
  return h("div", { class: "flex items-center gap-2 rounded-md border bg-background p-3" }, [
    h(Sparkles, { "aria-hidden": "true", class: "size-4 text-muted-foreground" }),
    h("span", title),
  ]);
}
