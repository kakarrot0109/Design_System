import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import { VAttachments } from "./attachments";

const items = [
  {
    id: "1",
    name: "研究资料.pdf",
    type: "pdf" as const,
    size: "2.4 MB",
  },
  {
    id: "2",
    name: "界面.png",
    type: "image" as const,
    size: "840 KB",
  },
];

describe("VAttachments", () => {
  it("渲染 list 模式和附件信息", () => {
    const wrapper = mount(VAttachments, {
      props: { items, variant: "list" },
    });

    expect(wrapper.text()).toContain("研究资料.pdf");
    expect(wrapper.text()).toContain("2.4 MB");
  });

  it("渲染 inline 模式布局", () => {
    const wrapper = mount(VAttachments, {
      props: { items, variant: "inline" },
    });

    expect(wrapper.classes()).toContain("flex-row");
  });
});
