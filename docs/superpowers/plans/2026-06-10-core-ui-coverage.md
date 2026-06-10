# 核心 UI 覆盖扩展 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 为 React/Vue 设计系统补齐 Typography、Select、Checkbox、RadioGroup、List、Table，并在 playground 展示。

**Architecture:** React 和 Vue 组件包保持同名能力、各自实现，不引入跨框架抽象。Playground 只扩展 UI 页展示，AI 页和 tokens 页不变。

**Tech Stack:** React、Vue 3、TypeScript、Tailwind、Vitest、Testing Library、@vue/test-utils。

---

### Task 1: 测试先行

**Files:**
- Create: `packages/react-ui/src/components/form.test.tsx`
- Create: `packages/react-ui/src/components/data-display.test.tsx`
- Create: `packages/vue-ui/src/components/form.test.ts`
- Create: `packages/vue-ui/src/components/data-display.test.ts`

- [x] 写 React 表单组件测试：Select、Checkbox、RadioGroup。
- [x] 写 React 数据展示测试：Typography、List、Table。
- [x] 写 Vue 表单组件测试：VSelect、VCheckbox、VRadioGroup。
- [x] 写 Vue 数据展示测试：VTypography、VList、VTable。
- [x] 运行 React/Vue UI 包测试，确认因组件缺失失败。

### Task 2: React UI 组件

**Files:**
- Create: `packages/react-ui/src/components/typography.tsx`
- Create: `packages/react-ui/src/components/select.tsx`
- Create: `packages/react-ui/src/components/checkbox.tsx`
- Create: `packages/react-ui/src/components/radio-group.tsx`
- Create: `packages/react-ui/src/components/list.tsx`
- Create: `packages/react-ui/src/components/table.tsx`
- Modify: `packages/react-ui/src/index.ts`

- [x] 实现新增 React 组件。
- [x] 导出新增 React 组件。
- [x] 运行 `pnpm --filter @design-system/react-ui test`。

### Task 3: Vue UI 组件

**Files:**
- Create: `packages/vue-ui/src/components/typography.ts`
- Create: `packages/vue-ui/src/components/select.ts`
- Create: `packages/vue-ui/src/components/checkbox.ts`
- Create: `packages/vue-ui/src/components/radio-group.ts`
- Create: `packages/vue-ui/src/components/list.ts`
- Create: `packages/vue-ui/src/components/table.ts`
- Modify: `packages/vue-ui/src/index.ts`

- [x] 实现新增 Vue 组件。
- [x] 导出新增 Vue 组件。
- [x] 运行 `pnpm --filter @design-system/vue-ui test`。

### Task 4: Playground 展示

**Files:**
- Modify: `apps/playground-react/src/pages.tsx`
- Modify: `apps/playground-vue/src/App.vue`
- Modify: `apps/playground/src/vue-preview.ts`
- Modify: `apps/playground/src/App.test.tsx`
- Modify: `README.md`
- Modify: `tasks/todo.md`

- [x] React UI 页增加 Typography、Form、Data Display 分组。
- [x] Vue UI 页增加同样分组。
- [x] 统一 playground 的 Vue island 同步展示。
- [x] 测试统一入口 React/Vue UI 页能看到新增组件。

### Task 5: 完整验证和提交

- [x] 运行 `pnpm --filter @design-system/react-ui test`。
- [x] 运行 `pnpm --filter @design-system/vue-ui test`。
- [x] 运行 `pnpm --filter @design-system/playground test`。
- [x] 运行 `pnpm test`。
- [x] 运行 `pnpm build`。
- [x] 启动 playground 并浏览器验证 React/Vue UI 页。
- [x] 提交并推送。
