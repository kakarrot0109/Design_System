import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Button } from "./button";

describe("Button", () => {
  it("renders shadcn-style variant and size classes", () => {
    render(
      <Button variant="outline" size="sm">
        保存
      </Button>,
    );

    const button = screen.getByRole("button", { name: "保存" });
    expect(button).toHaveClass("border");
    expect(button).toHaveClass("h-8");
  });

  it("supports icon sizing", () => {
    render(<Button size="icon" aria-label="发送" />);

    const button = screen.getByRole("button", { name: "发送" });
    expect(button).toHaveClass("size-9");
  });
});
