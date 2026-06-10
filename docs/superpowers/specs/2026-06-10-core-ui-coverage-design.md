# 核心 UI 覆盖扩展设计规格

## 目标

补齐设计系统首批必备组件，让 playground 不只展示样例，而能覆盖基础排版、表单和数据展示。

## 范围

| 模块 | 新增内容 | 成功标准 |
|---|---|---|
| `react-ui` | Typography、Select、Checkbox、RadioGroup、List、Table | 组件可渲染并导出 |
| `vue-ui` | VTypography、VSelect、VCheckbox、VRadioGroup、VList、VTable | 组件可渲染并导出 |
| playground | UI 页新增 Typography、Form、Data Display 分组 | 统一入口和独立入口都能看到新增组件 |
| 文档任务 | README 和任务记录 | 明确 UI 页覆盖新增组件 |

## 组件边界

| 组件 | 做什么 | 不做什么 |
|---|---|---|
| Typography | h1/h2/h3/p/lead/muted/code/small | 不做富文本编辑 |
| Select | 原生 select 包装和状态样式 | 不做 command palette、搜索、多选 |
| Checkbox | 原生 checkbox + label | 不做复杂 indeterminate |
| RadioGroup | 原生 radio 组 | 不做 roving tabindex |
| List | 有序/无序/描述列表样式 | 不做虚拟列表 |
| Table | 基础表格结构和状态/操作列样式 | 不做排序、分页、固定列 |

## 验证

- `pnpm --filter @design-system/react-ui test`
- `pnpm --filter @design-system/vue-ui test`
- `pnpm --filter @design-system/playground test`
- `pnpm test`
- `pnpm build`
- 浏览器检查统一 playground 的 React/Vue UI 页。
