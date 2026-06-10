import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Checkbox } from "./checkbox";
import { RadioGroup, RadioGroupItem } from "./radio-group";
import { Select } from "./select";

describe("form controls", () => {
  it("renders select options and exposes selected value", () => {
    render(
      <Select aria-label="组件类型" defaultValue="table">
        <option value="button">Button</option>
        <option value="table">Table</option>
      </Select>,
    );

    const select = screen.getByRole("combobox", { name: "组件类型" });
    expect(select).toHaveValue("table");
    expect(select).toHaveClass("rounded-md");
  });

  it("renders checkbox with label", () => {
    render(<Checkbox label="显示禁用状态" defaultChecked />);

    const checkbox = screen.getByRole("checkbox", { name: "显示禁用状态" });
    expect(checkbox).toBeChecked();
  });

  it("renders radio group items", () => {
    render(
      <RadioGroup aria-label="尺寸" defaultValue="md">
        <RadioGroupItem label="小" value="sm" />
        <RadioGroupItem label="中" value="md" />
      </RadioGroup>,
    );

    expect(screen.getByRole("radio", { name: "中" })).toBeChecked();
    fireEvent.click(screen.getByRole("radio", { name: "小" }));
    expect(screen.getByRole("radio", { name: "小" })).toBeChecked();
  });
});
