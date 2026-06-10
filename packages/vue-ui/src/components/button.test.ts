import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import { VButton } from "./button";

describe("VButton", () => {
  it("渲染 variant 和 size class", () => {
    const wrapper = mount(VButton, {
      props: { variant: "outline", size: "sm" },
      slots: { default: "保存" },
    });

    expect(wrapper.text()).toBe("保存");
    expect(wrapper.classes()).toContain("border");
    expect(wrapper.classes()).toContain("h-8");
  });

  it("支持 icon 尺寸", () => {
    const wrapper = mount(VButton, {
      props: { size: "icon", ariaLabel: "发送" },
    });

    expect(wrapper.attributes("aria-label")).toBe("发送");
    expect(wrapper.classes()).toContain("size-9");
  });
});
