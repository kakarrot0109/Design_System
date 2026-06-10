# 统一 Playground 设计规格

## 目标

新增一个统一预览入口，让用户在同一个页面内切换 React 和 Vue 组件预览。

## 范围

| 模块 | 责任 | 成功标准 |
|---|---|---|
| `apps/playground` | 统一预览入口 | `React / Vue` 可切换，`总览 / UI / AI / tokens` 可切换 |
| 根命令 | 默认入口调整 | `pnpm dev` 打开统一 playground |
| 独立入口 | 保留调试能力 | `pnpm dev:react`、`pnpm dev:vue` 继续可用 |
| 文档和任务记录 | 说明新入口 | README 和任务清单不再暗示 React 是默认唯一入口 |

## 技术决策

| 决策 | 选择 | 原因 |
|---|---|---|
| 统一入口框架 | React 壳 | React playground 已拆成可复用页面，改动最小 |
| Vue 内容渲染 | React 内挂载 Vue island | 不用 iframe，能在同页真实渲染 Vue 组件 |
| 现有入口 | 保留 | 方便单独调试 React/Vue |
| 组件包 | 不改 API | 这次只改预览组织方式 |

## 交互

- 顶部提供 `React / Vue` 分段切换。
- 左侧导航保持四页：`总览`、`UI`、`AI`、`tokens`。
- 切到 React 时展示 React 组件实现。
- 切到 Vue 时展示 Vue 组件实现。
- 页面仍使用 tokens 和当前黑白灰工作台风格。

## 验证

- `pnpm --filter @design-system/playground test`
- `pnpm test`
- `pnpm build`
- 浏览器打开统一 playground，验证 React/Vue 与四页导航。
