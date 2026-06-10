import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import { VList, VListItem } from "./list";
import {
  VTable,
  VTableBody,
  VTableCell,
  VTableHead,
  VTableHeader,
  VTableRow,
} from "./table";
import { VTypography } from "./typography";

describe("Vue data display", () => {
  it("渲染 typography variants", () => {
    const wrapper = mount({
      components: { VTypography },
      template: `
        <div>
          <VTypography variant="h1">标题</VTypography>
          <VTypography variant="muted">辅助说明</VTypography>
          <VTypography variant="code">npm run dev</VTypography>
        </div>
      `,
    });

    expect(wrapper.find("h1").classes()).toContain("text-3xl");
    expect(wrapper.text()).toContain("辅助说明");
    expect(wrapper.find("code").classes()).toContain("font-mono");
  });

  it("渲染 list item", () => {
    const wrapper = mount(VList, {
      slots: {
        default: '<VListItem title="Select" description="下拉选择" />',
      },
      global: {
        components: { VListItem },
      },
    });

    expect(wrapper.text()).toContain("Select");
    expect(wrapper.text()).toContain("下拉选择");
  });

  it("渲染 table 结构", () => {
    const wrapper = mount({
      components: {
        VTable,
        VTableBody,
        VTableCell,
        VTableHead,
        VTableHeader,
        VTableRow,
      },
      template: `
        <VTable>
          <VTableHeader>
            <VTableRow>
              <VTableHead>组件</VTableHead>
              <VTableHead>状态</VTableHead>
            </VTableRow>
          </VTableHeader>
          <VTableBody>
            <VTableRow>
              <VTableCell>Table</VTableCell>
              <VTableCell>可用</VTableCell>
            </VTableRow>
          </VTableBody>
        </VTable>
      `,
    });

    expect(wrapper.find("table").exists()).toBe(true);
    expect(wrapper.find("th").classes()).toContain("h-10");
    expect(wrapper.text()).toContain("可用");
  });
});
