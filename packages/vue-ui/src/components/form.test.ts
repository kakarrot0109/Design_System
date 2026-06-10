import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import { VCheckbox } from "./checkbox";
import { VRadioGroup, VRadioGroupItem } from "./radio-group";
import { VSelect } from "./select";

describe("Vue form controls", () => {
  it("渲染 select 选项和值", () => {
    const wrapper = mount(VSelect, {
      props: { ariaLabel: "组件类型", modelValue: "table" },
      slots: {
        default:
          '<option value="button">Button</option><option value="table">Table</option>',
      },
    });

    expect(wrapper.find("select").element.value).toBe("table");
    expect(wrapper.find("select").classes()).toContain("rounded-md");
  });

  it("渲染 checkbox 和 label", async () => {
    const wrapper = mount(VCheckbox, {
      props: { label: "显示禁用状态", modelValue: true },
    });

    expect(wrapper.text()).toContain("显示禁用状态");
    expect((wrapper.find("input").element as HTMLInputElement).checked).toBe(true);
  });

  it("渲染 radio group", async () => {
    const wrapper = mount(VRadioGroup, {
      props: { modelValue: "md", ariaLabel: "尺寸" },
      slots: {
        default: [
          '<VRadioGroupItem label="小" value="sm" />',
          '<VRadioGroupItem label="中" value="md" />',
        ],
      },
      global: {
        components: { VRadioGroupItem },
      },
    });

    const checked = wrapper.find('input[value="md"]').element as HTMLInputElement;
    expect(checked.checked).toBe(true);
  });
});
