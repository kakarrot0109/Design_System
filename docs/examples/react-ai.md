# react-ai 示例

```tsx
import {
  Attachments,
  Composer,
  MessageItem,
  MessageList,
  type MessageRecord,
} from "@design-system/react-ai";

const message: MessageRecord = {
  id: "assistant-1",
  role: "assistant",
  status: "done",
  content: "组件验收完成。",
  citations: [
    {
      id: "source-1",
      title: "组件样式要求",
      description: "样式来源和视觉约束。",
    },
  ],
};

export function AssistantExample() {
  return (
    <MessageList>
      <MessageItem message={message} />
      <Attachments
        items={[{ id: "file-1", name: "验收清单.md", type: "file" }]}
        variant="inline"
      />
      <Composer placeholder="继续输入..." />
    </MessageList>
  );
}
```

样式约束：

- 附件支持 `grid`、`inline`、`list`。
- 工具调用、引用资料、推理过程使用克制边框和浅灰背景。
- 组件只做展示和交互，不调用模型 API。
