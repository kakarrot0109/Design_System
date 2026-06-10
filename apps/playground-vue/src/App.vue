<script setup lang="ts">
import { computed, defineComponent, h, ref } from "vue";
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
import { Bot, CheckCircle2, FileText, Search, Settings2, Sparkles } from "lucide-vue-next";

import {
  attachmentItems,
  messages,
  sections,
  taskSteps,
  tokenGroups,
  toolCalls,
  type SectionId,
} from "./data";

const activeSection = ref<SectionId>("overview");
const activeMeta = computed(
  () => sections.find((section) => section.id === activeSection.value)!,
);

function setSection(section: SectionId) {
  activeSection.value = section;
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

const ComponentGroup = defineComponent({
  props: {
    label: {
      required: true,
      type: String,
    },
  },
  setup(props, { slots }) {
    return () =>
      h("div", { class: "grid gap-2" }, [
        h("div", { class: "text-xs font-medium text-muted-foreground" }, props.label),
        slots.default?.(),
      ]);
  },
});

const Metric = defineComponent({
  props: {
    title: {
      required: true,
      type: String,
    },
    value: {
      required: true,
      type: String,
    },
  },
  setup(props) {
    return () =>
      h("div", { class: "flex items-center justify-between rounded-lg border bg-background p-3" }, [
        h("span", { class: "text-sm text-muted-foreground" }, props.title),
        h("span", { class: "text-lg font-semibold" }, props.value),
      ]);
  },
});

const ReferenceItem = defineComponent({
  components: { Sparkles },
  props: {
    title: {
      required: true,
      type: String,
    },
  },
  setup(props) {
    return () =>
      h("div", { class: "flex items-center gap-2 rounded-md border bg-background p-3" }, [
        h(Sparkles, { "aria-hidden": "true", class: "size-4 text-muted-foreground" }),
        h("span", props.title),
      ]);
  },
});
</script>

<template>
  <div class="grid min-h-[100dvh] bg-muted/40 text-foreground lg:grid-cols-[280px_1fr]">
    <aside class="hidden border-r bg-background lg:flex lg:flex-col">
      <div class="flex h-16 items-center gap-3 border-b px-4">
        <div class="flex size-9 items-center justify-center rounded-md border bg-muted">
          <Bot aria-hidden="true" class="size-4" />
        </div>
        <div class="min-w-0">
          <div class="truncate text-sm font-semibold">Design System</div>
          <div class="truncate text-xs text-muted-foreground">Vue 正式预览</div>
        </div>
      </div>

      <nav aria-label="Vue 组件预览导航" class="grid gap-1 p-3">
        <button
          v-for="section in sections"
          :key="section.id"
          :data-section="section.id"
          :class="[
            'flex items-center gap-3 rounded-md px-3 py-2 text-left text-sm transition-colors',
            activeSection === section.id ? 'bg-muted font-medium' : 'text-muted-foreground hover:bg-muted',
          ]"
          type="button"
          @click="setSection(section.id)"
        >
          <component :is="section.icon" aria-hidden="true" class="size-4 shrink-0" />
          <span class="min-w-0">
            <span class="block truncate">{{ section.label }}</span>
            <span class="block truncate text-xs font-normal text-muted-foreground">{{ section.description }}</span>
          </span>
        </button>
      </nav>

      <div class="mt-auto border-t p-4">
        <div class="grid gap-3 text-sm">
          <div class="flex items-center justify-between">
            <span class="text-muted-foreground">预览覆盖</span>
            <VBadge variant="secondary">4 个页面</VBadge>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-muted-foreground">数据来源</span>
            <VBadge variant="outline">mock</VBadge>
          </div>
          <div class="flex items-center gap-2 text-xs text-muted-foreground">
            <CheckCircle2 aria-hidden="true" class="size-4 text-success" />
            tokens、vue-ui、vue-ai 已接入
          </div>
        </div>
      </div>
    </aside>

    <main class="min-w-0">
      <div class="flex h-[100dvh] min-h-0 flex-col">
        <header class="border-b bg-background px-4 py-3">
          <div class="mx-auto flex w-full max-w-7xl items-center justify-between gap-4">
            <div class="min-w-0">
              <h1 class="truncate text-sm font-semibold">{{ activeMeta.label }}</h1>
              <p class="truncate text-xs text-muted-foreground">{{ activeMeta.description }}</p>
            </div>
            <div class="flex items-center gap-2">
              <VBadge variant="outline">Vue 可预览</VBadge>
              <VButton aria-label="设置" size="icon" variant="ghost">
                <Settings2 aria-hidden="true" class="size-4" />
              </VButton>
            </div>
          </div>
          <div class="mt-3 flex gap-2 overflow-x-auto lg:hidden">
            <VButton
              v-for="section in sections"
              :key="section.id"
              class="shrink-0"
              size="sm"
              :variant="activeSection === section.id ? 'default' : 'outline'"
              @click="setSection(section.id)"
            >
              {{ section.label }}
            </VButton>
          </div>
        </header>

        <div class="min-h-0 flex-1 overflow-y-auto overflow-x-hidden">
          <div class="mx-auto grid w-full max-w-7xl gap-6 p-4 lg:p-6">
            <template v-if="activeSection === 'overview'">
              <div class="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
                <PreviewSection description="包含用户消息、助手消息、streaming、error、工具调用、引用、附件、推理和输入区。" title="Assistant 示例">
                  <div class="h-[720px] overflow-hidden rounded-lg border bg-background">
                    <VChatPanel class="h-full">
                      <template #header>
                        <div class="flex items-center justify-between gap-3">
                          <div>
                            <div class="text-sm font-semibold">Vue 样式来源统一检查</div>
                            <div class="text-xs text-muted-foreground">shadcn/ui · AI Elements · assistant-ui examples</div>
                          </div>
                          <VBadge variant="outline">mock 数据</VBadge>
                        </div>
                      </template>
                      <VMessageList>
                        <VMessageItem v-for="message in messages" :key="message.id" :message="message" />
                      </VMessageList>
                      <template #composer>
                        <VComposer
                          :attachments="[{ id: 'draft', name: 'Vue 验收草稿.md', type: 'file', size: '3.1 KB' }]"
                          placeholder="继续输入你的 Vue 组件验收问题..."
                        />
                      </template>
                    </VChatPanel>
                  </div>
                </PreviewSection>

                <div class="grid content-start gap-6">
                  <PreviewSection title="项目状态">
                    <div class="grid gap-3">
                      <Metric title="基础组件" value="8" />
                      <Metric title="AI 组件" value="9" />
                      <Metric title="预览页面" value="4" />
                    </div>
                  </PreviewSection>
                  <PreviewSection title="参考来源">
                    <div class="grid gap-2 text-sm">
                      <ReferenceItem title="shadcn/ui" />
                      <ReferenceItem title="AI Elements" />
                      <ReferenceItem title="assistant-ui examples" />
                    </div>
                  </PreviewSection>
                </div>
              </div>
            </template>

            <template v-else-if="activeSection === 'vue-ui'">
              <PreviewSection description="覆盖 default、secondary、outline、ghost、destructive，以及 sm、md、lg、icon。" title="Button">
                <div class="grid gap-4">
                  <div class="flex flex-wrap gap-2">
                    <VButton>默认</VButton>
                    <VButton variant="secondary">次级</VButton>
                    <VButton variant="outline">描边</VButton>
                    <VButton variant="ghost">幽灵</VButton>
                    <VButton variant="destructive">危险</VButton>
                    <VButton disabled>禁用</VButton>
                  </div>
                  <div class="flex flex-wrap items-center gap-2">
                    <VButton size="sm">小尺寸</VButton>
                    <VButton size="md">中尺寸</VButton>
                    <VButton size="lg">大尺寸</VButton>
                    <VButton aria-label="搜索" size="icon" variant="outline">
                      <Search aria-hidden="true" class="size-4" />
                    </VButton>
                  </div>
                </div>
              </PreviewSection>

              <div class="grid gap-6 xl:grid-cols-2">
                <PreviewSection title="Input / Textarea">
                  <div class="grid gap-3">
                    <VInput placeholder="输入组件名称" />
                    <VInput disabled placeholder="禁用输入框" />
                    <VTextarea placeholder="记录组件验收意见" />
                  </div>
                </PreviewSection>

                <PreviewSection title="Badge">
                  <div class="flex flex-wrap gap-2">
                    <VBadge>默认</VBadge>
                    <VBadge variant="secondary">次级</VBadge>
                    <VBadge variant="outline">描边</VBadge>
                    <VBadge variant="destructive">危险</VBadge>
                  </div>
                </PreviewSection>
              </div>

              <div class="grid gap-6 xl:grid-cols-2">
                <PreviewSection title="Card">
                  <VCard>
                    <VCardHeader>
                      <VCardTitle>组件卡片</VCardTitle>
                      <VCardDescription>白底、细边框、轻圆角，保持 shadcn/ui 的信息层级。</VCardDescription>
                    </VCardHeader>
                    <VCardContent class="text-sm text-muted-foreground">卡片用于承载结构化内容，不做花哨阴影。</VCardContent>
                    <VCardFooter class="gap-2">
                      <VButton size="sm">确认</VButton>
                      <VButton size="sm" variant="outline">取消</VButton>
                    </VCardFooter>
                  </VCard>
                </PreviewSection>

                <PreviewSection title="Dialog">
                  <VDialog>
                    <VDialogTrigger>
                      <VButton variant="outline">打开弹窗</VButton>
                    </VDialogTrigger>
                    <VDialogContent>
                      <VDialogHeader>
                        <VDialogTitle>组件设置</VDialogTitle>
                        <VDialogDescription>Dialog 使用 overlay、content、title、description、footer 结构。</VDialogDescription>
                      </VDialogHeader>
                      <VInput placeholder="组件名称" />
                      <VDialogFooter>
                        <VDialogClose><VButton variant="outline">取消</VButton></VDialogClose>
                        <VDialogClose><VButton>保存</VButton></VDialogClose>
                      </VDialogFooter>
                    </VDialogContent>
                  </VDialog>
                </PreviewSection>
              </div>

              <div class="grid gap-6 xl:grid-cols-2">
                <PreviewSection title="Tabs">
                  <VTabs default-value="usage">
                    <VTabsList>
                      <VTabsTrigger value="usage">用法</VTabsTrigger>
                      <VTabsTrigger value="states">状态</VTabsTrigger>
                      <VTabsTrigger value="tokens">变量</VTabsTrigger>
                    </VTabsList>
                    <VTabsContent value="usage">
                      <div class="rounded-md border p-4 text-sm text-muted-foreground">分段切换适合后台和 AI 工作台。</div>
                    </VTabsContent>
                    <VTabsContent value="states">
                      <div class="rounded-md border p-4 text-sm text-muted-foreground">active 状态使用背景和轻阴影区分。</div>
                    </VTabsContent>
                    <VTabsContent value="tokens">
                      <div class="rounded-md border p-4 text-sm text-muted-foreground">颜色来自 CSS Variables。</div>
                    </VTabsContent>
                  </VTabs>
                </PreviewSection>

                <PreviewSection title="Empty">
                  <VEmpty>
                    <FileText aria-hidden="true" class="size-8 text-muted-foreground" />
                    <VEmptyTitle>暂无组件</VEmptyTitle>
                    <VEmptyDescription>空状态保持克制，不使用花哨插画。</VEmptyDescription>
                  </VEmpty>
                </PreviewSection>
              </div>
            </template>

            <template v-else-if="activeSection === 'vue-ai'">
              <PreviewSection description="支持 grid、inline、list 三种展示模式。" title="Attachments">
                <div class="grid gap-5">
                  <ComponentGroup label="grid"><VAttachments :items="attachmentItems" variant="grid" /></ComponentGroup>
                  <ComponentGroup label="inline"><VAttachments :items="attachmentItems" variant="inline" /></ComponentGroup>
                  <ComponentGroup label="list"><VAttachments :items="attachmentItems" variant="list" /></ComponentGroup>
                </div>
              </PreviewSection>

              <PreviewSection description="覆盖 pending、running、success、error。" title="ToolCallCard">
                <div class="grid gap-3 xl:grid-cols-2">
                  <VToolCallCard v-for="tool in toolCalls" :key="tool.id" :tool="tool" />
                </div>
              </PreviewSection>

              <div class="grid gap-6 xl:grid-cols-2">
                <PreviewSection title="CitationList">
                  <VCitationList
                    :citations="[
                      { id: 'citation-1', title: '组件样式要求', description: '定义样式来源、视觉约束和 playground 要求。' },
                      { id: 'citation-2', title: 'Vue playground', description: '完整 Vue 预览参考。' },
                    ]"
                  />
                </PreviewSection>

                <PreviewSection title="ReasoningBlock">
                  <VReasoningBlock default-open>默认可折叠；streaming 时可以展开；使用浅灰背景、细边框和低视觉权重。</VReasoningBlock>
                </PreviewSection>
              </div>

              <div class="grid gap-6 xl:grid-cols-2">
                <PreviewSection title="TaskTimeline">
                  <VTaskTimeline :steps="taskSteps" />
                </PreviewSection>

                <PreviewSection title="Composer">
                  <div class="grid gap-4">
                    <VComposer :attachments="attachmentItems.slice(0, 1)" placeholder="输入消息..." />
                    <VComposer is-loading placeholder="生成中不可编辑" />
                    <VComposer disabled placeholder="禁用状态" />
                  </div>
                </PreviewSection>
              </div>

              <PreviewSection description="覆盖 user、assistant、streaming、done、error。" title="MessageItem / MessageList">
                <div class="max-h-[620px] overflow-y-auto rounded-lg border bg-background">
                  <VMessageList>
                    <VMessageItem v-for="message in messages" :key="message.id" :message="message" />
                  </VMessageList>
                </div>
              </PreviewSection>
            </template>

            <template v-else>
              <PreviewSection v-for="group in tokenGroups" :key="group.title" :title="group.title">
                <div class="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
                  <div v-for="item in group.items" :key="item.label" class="overflow-hidden rounded-lg border">
                    <div :class="['flex h-24 items-end p-3 text-sm font-medium', item.className]">{{ item.label }}</div>
                    <div class="border-t bg-background p-3 text-xs text-muted-foreground">hsl(var(--{{ item.label }}))</div>
                  </div>
                </div>
              </PreviewSection>

              <div class="grid gap-6 xl:grid-cols-3">
                <PreviewSection title="Radius">
                  <div class="grid gap-3">
                    <div class="h-16 rounded-sm border bg-background" />
                    <div class="h-16 rounded-md border bg-background" />
                    <div class="h-16 rounded-lg border bg-background" />
                  </div>
                </PreviewSection>
                <PreviewSection title="Border">
                  <div class="grid gap-3">
                    <div class="rounded-md border bg-background p-4 text-sm">默认边框</div>
                    <div class="rounded-md border border-dashed bg-background p-4 text-sm">虚线边框</div>
                    <div class="rounded-md border bg-muted p-4 text-sm">弱背景</div>
                  </div>
                </PreviewSection>
                <PreviewSection title="Focus Ring">
                  <div class="grid gap-3">
                    <VButton class="ring-2 ring-ring ring-offset-2">按钮 focus</VButton>
                    <VInput class="ring-1 ring-ring" model-value="输入框 focus" readonly />
                  </div>
                </PreviewSection>
              </div>
            </template>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
