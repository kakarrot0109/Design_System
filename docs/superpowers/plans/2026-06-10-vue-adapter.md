# Vue 适配实施计划

> **给 agentic worker：** 按任务执行并保持测试先行。步骤使用 checkbox 追踪。

**目标：** 为当前设计系统新增 Vue 组件包和 Vue playground。

**架构：** `vue-ui` 提供基础组件；`vue-ai` 依赖 `vue-ui` 组合 AI 场景组件；`playground-vue` 使用 Vue SFC 展示完整预览；所有样式复用 tokens。

**技术栈：** Vue 3、Vite、TypeScript、Tailwind、tsup、Vitest、@vue/test-utils。

---

### Task 1: workspace 集成

**Files:**
- Modify: `package.json`
- Create: `packages/vue-ui/package.json`
- Create: `packages/vue-ai/package.json`
- Create: `apps/playground-vue/package.json`

- [x] 增加 Vue 依赖和 workspace 包。
- [x] 运行 `pnpm install`。

### Task 2: 测试先行

**Files:**
- Create: `packages/vue-ui/src/components/button.test.ts`
- Create: `packages/vue-ai/src/components/attachments.test.ts`
- Create: `apps/playground-vue/src/App.test.ts`

- [x] 写 Vue 组件渲染测试。
- [x] 确认测试因实现缺失失败。

### Task 3: Vue 组件包

**Files:**
- Create: `packages/vue-ui/src/*`
- Create: `packages/vue-ai/src/*`

- [x] 实现基础组件。
- [x] 实现 AI 场景组件。
- [x] 运行 Vue 包测试。

### Task 4: Vue playground

**Files:**
- Create: `apps/playground-vue/*`

- [x] 实现总览、vue-ui、vue-ai、tokens 四页。
- [x] 接入 Tailwind 和 tokens。
- [x] 运行 playground 测试。

### Task 5: 完整验证

- [x] 运行 `pnpm test`。
- [x] 运行 `pnpm build`。
- [x] 启动 Vue playground 并浏览器检查。
- [ ] 提交并推送。
