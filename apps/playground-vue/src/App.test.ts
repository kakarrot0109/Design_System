import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import App from "./App.vue";

describe("playground-vue", () => {
  it("渲染 Vue 正式预览总览", () => {
    const wrapper = mount(App);

    expect(wrapper.text()).toContain("Vue 总览");
    expect(wrapper.text()).toContain("Assistant 示例");
  });

  it("切换到 vue-ui 组件展厅", async () => {
    const wrapper = mount(App);

    await wrapper.find('[data-section="vue-ui"]').trigger("click");

    expect(wrapper.text()).toContain("Button");
    expect(wrapper.text()).toContain("Input / Textarea");
  });
});
