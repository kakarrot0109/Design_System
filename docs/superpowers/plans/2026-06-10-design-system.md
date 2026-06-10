# Design System 实施计划

> **给 agentic worker：** 需要使用 `superpowers:subagent-driven-development` 或 `superpowers:executing-plans` 按任务执行。步骤使用 checkbox 追踪。

**目标：** 搭建最小可运行的 `@design-system/*` React 组件 monorepo。

**架构：** `tokens` 提供 CSS Variables；`react-ui` 提供 shadcn 风格基础组件；`react-ai` 组合基础组件形成 AI 场景组件；`playground-react` 用 mock 数据展示完整 Assistant 页面。

**技术栈：** pnpm workspace、TypeScript、Vite、Tailwind、tsup、Vitest、Radix、lucide-react。

---

### Task 1: Workspace

**Files:**
- Create: `package.json`
- Create: `pnpm-workspace.yaml`
- Create: `tsconfig.base.json`
- Create: `.gitignore`

- [ ] 写 workspace 配置。
- [ ] 运行 `pnpm install`。
- [ ] 验证依赖安装完成。

### Task 2: Tests First

**Files:**
- Create: `packages/react-ui/src/components/button.test.tsx`
- Create: `packages/react-ai/src/components/attachments.test.tsx`

- [ ] 写基础组件和 AI 组件测试。
- [ ] 运行测试，确认因实现缺失失败。

### Task 3: Tokens

**Files:**
- Create: `packages/tokens/package.json`
- Create: `packages/tokens/src/index.ts`
- Create: `packages/tokens/src/index.css`

- [ ] 定义 CSS Variables。
- [ ] 输出 token 名称。
- [ ] 构建 token 包。

### Task 4: react-ui

**Files:**
- Create: `packages/react-ui/package.json`
- Create: `packages/react-ui/src/index.ts`
- Create: `packages/react-ui/src/lib/utils.ts`
- Create: `packages/react-ui/src/components/*.tsx`

- [ ] 实现 `Button/Input/Textarea/Card/Badge/Dialog/Tabs/Empty`。
- [ ] 运行组件测试。

### Task 5: react-ai

**Files:**
- Create: `packages/react-ai/package.json`
- Create: `packages/react-ai/src/index.ts`
- Create: `packages/react-ai/src/components/*.tsx`

- [ ] 实现 AI 组件。
- [ ] 运行组件测试。

### Task 6: Playground

**Files:**
- Create: `apps/playground-react/package.json`
- Create: `apps/playground-react/index.html`
- Create: `apps/playground-react/src/*`

- [ ] 实现完整 mock Assistant 页面。
- [ ] 运行 `pnpm build`。
- [ ] 启动 playground 并用浏览器验证。
