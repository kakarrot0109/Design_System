# 统一 Playground Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 新增 `apps/playground`，在一个页面内切换 React 和 Vue 预览。

**Architecture:** 使用 React 作为统一壳，复用 React preview 页面结构；Vue 模式通过 Vue island 在 React 页面中挂载 Vue 组件。根 `pnpm dev` 指向统一入口，独立 React/Vue playground 保留。

**Tech Stack:** React、Vue 3、Vite、TypeScript、Tailwind、Vitest、Testing Library、@vue/test-utils。

---

### Task 1: 统一入口测试骨架

**Files:**
- Create: `apps/playground/package.json`
- Create: `apps/playground/vite.config.ts`
- Create: `apps/playground/vitest.config.ts`
- Create: `apps/playground/src/App.test.tsx`

- [x] 写测试：默认渲染 React 总览。
- [x] 写测试：点击 `Vue` 后渲染 Vue 总览。
- [x] 写测试：Vue 模式切到 `UI` 后显示 `Button` 和 `Input / Textarea`。
- [x] 运行 `pnpm --filter @design-system/playground test`，确认因实现缺失失败。

### Task 2: 统一 React 壳

**Files:**
- Create: `apps/playground/index.html`
- Create: `apps/playground/src/main.tsx`
- Create: `apps/playground/src/App.tsx`
- Create: `apps/playground/src/sections.ts`
- Create: `apps/playground/src/styles.css`
- Create: `apps/playground/tailwind.config.ts`
- Create: `apps/playground/postcss.config.js`
- Create: `apps/playground/tsconfig.json`

- [x] 实现 `React / Vue` 分段切换。
- [x] 实现四页导航。
- [x] React 模式展示 React 预览页面。
- [x] 运行统一入口测试。

### Task 3: Vue island

**Files:**
- Create: `apps/playground/src/vue-preview.ts`
- Modify: `apps/playground/src/App.tsx`

- [x] 在 React 中挂载 Vue app。
- [x] Vue island 按当前 section 渲染总览、UI、AI、tokens。
- [x] 切换 section 或 framework 时正确卸载旧 Vue app。
- [x] 运行统一入口测试。

### Task 4: 根命令和文档

**Files:**
- Modify: `package.json`
- Modify: `README.md`
- Modify: `tasks/todo.md`

- [x] `pnpm dev` 指向 `@design-system/playground`。
- [x] README 说明统一入口和独立入口。
- [x] 任务清单记录完成状态。

### Task 5: 完整验证和提交

- [x] 运行 `pnpm --filter @design-system/playground test`。
- [x] 运行 `pnpm test`。
- [x] 运行 `pnpm build`。
- [x] 启动 `pnpm dev` 并浏览器验证 React/Vue 切换。
- [x] 提交并推送。
