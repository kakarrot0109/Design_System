# AGENTS

## 0. 沟通方式

- 面向用户的所有文字使用简体中文。
- 先说假设、成功标准和取舍，再改代码。
- 不确定就明说，不把猜测写成结论。
- 说明改动只讲改了什么，不贴完整代码，除非用户明确要求。

## 1. 当前项目是什么

这是一个 React / Vue 设计系统 monorepo，核心是：

| 区域 | 作用 |
|---|---|
| `packages/tokens` | CSS Variables、颜色、状态色、圆角、边框、focus ring |
| `packages/react-ui` | shadcn/ui 风格基础组件 |
| `packages/react-ai` | AI Elements / assistant-ui 风格 AI 场景组件 |
| `packages/vue-ui` | Vue 版基础组件 |
| `packages/vue-ai` | Vue 版 AI 场景组件 |
| `apps/playground` | React / Vue 统一预览入口 |
| `apps/playground-react` | React 独立预览 |
| `apps/playground-vue` | Vue 独立预览 |

## 2. 修改项目时先看这些直观东西

改页面、组件或样式前，先检查这些可见结果：

| 要看什么 | 判断标准 |
|---|---|
| 页面密度 | 不能像整页被浏览器放大；区块、卡片、按钮、标题要有主次 |
| 组件展示 | React 和 Vue 预览都要同步，不允许只改一边 |
| 总览页 | Assistant 示例要像成熟工作台，不像普通表单堆叠 |
| UI 页 | 组件 demo 要完整，但每个模块不能都是大块展板 |
| AI 页 | 附件、工具调用、引用、推理、输入区要紧凑、可扫描 |
| tokens 页 | 色块、边框、圆角、focus ring 要展示清楚，不能装饰化 |
| 移动端 | 375px 宽度无横向溢出，按钮文字不挤压 |
| 交互反馈 | hover、focus、active、selected、滚动边界要能感知，但不能抢内容 |

## 3. 视觉和交互规则

- 基础组件对齐 shadcn/ui：黑白灰、细边框、轻圆角、克制 hover/focus。
- AI 组件参考 AI Elements 和 assistant-ui examples：信息密度适中，组件可组合。
- 所有颜色来自 CSS Variables 或 tokens。
- 状态色只用于 success / warning / error / info。
- 不做大面积彩色、渐变装饰、花哨阴影、卡通插画。
- playground 是工具型界面，不做营销页式 hero 和大动画。
- 微交互只用 CSS / Tailwind，默认 150-200ms。
- 必须尊重 `prefers-reduced-motion`。

## 4. 编码原则

- 最小改动，只碰用户请求直接需要的文件。
- 不顺手重构，不改无关格式。
- 不新增未要求的依赖、配置或抽象。
- 不改组件 API，除非用户明确要求。
- 样式优先复用现有 tokens、`cn`、Tailwind class 组织方式。
- 修改统一 playground 时，同时检查 React preview 和 Vue mirror。

## 5. 文档同步规则

- 改包结构、页面内容、命令、视觉规则、交互规则时，同步更新 `README.md`。
- `README.md` 要按当前项目真实状态重写，不做零散追加。
- `AGENTS.md` 写项目协作和修改规则，`README.md` 写给使用者看的项目说明。
- 任务过程记录写入 `tasks/todo.md`，不要塞进 README。

## 6. 工作流

- 非琐碎任务先写假设、成功标准和清单到 `tasks/todo.md`。
- Bug 修复先复现，再定位根因，再改代码。
- 行为变化优先写失败测试，再实现。
- 每完成一项，更新 `tasks/todo.md`。
- 被用户纠正后，把经验沉淀到 `tasks/lessons.md`。

## 7. 验证

常规验证：

```bash
pnpm test
pnpm build
```

涉及页面视觉时，还要检查：

- 桌面端统一 playground。
- 375px 移动端。
- React / Vue 切换。
- 总览、UI、AI、tokens 四页。
- 是否有横向溢出。
- 交互是否克制且可感知。

不能完成某项验证时，明确说明原因和风险。
