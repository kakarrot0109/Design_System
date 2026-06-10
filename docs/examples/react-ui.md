# react-ui 示例

```tsx
import { Button, Card, CardContent, CardHeader, CardTitle, Input } from "@design-system/react-ui";

export function BasicForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>组件检查</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3">
        <Input placeholder="输入组件名" />
        <Button>保存</Button>
      </CardContent>
    </Card>
  );
}
```

样式约束：

- 变体通过 `class-variance-authority` 管理。
- class 合并通过 `cn`。
- 颜色使用 Tailwind 映射的 CSS Variables。
