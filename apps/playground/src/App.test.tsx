import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import App from "./App";

describe("统一 playground", () => {
  it("默认渲染 React 总览", () => {
    render(<App />);

    expect(screen.getByRole("button", { name: "React" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getByRole("heading", { name: "总览" })).toBeInTheDocument();
    expect(screen.getByText("Assistant 示例")).toBeInTheDocument();
  });

  it("点击 Vue 后渲染 Vue 总览", async () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: "Vue" }));

    expect(await screen.findByText("Vue 样式来源统一检查")).toBeInTheDocument();
    expect(screen.getByText("vue-ui")).toBeInTheDocument();
  });

  it("Vue 模式可以切换到 UI 页面", async () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: "Vue" }));
    fireEvent.click(screen.getByRole("button", { name: "UI" }));

    expect(await screen.findByRole("heading", { name: "Button" })).toBeInTheDocument();
    expect(screen.getByText("Input / Textarea")).toBeInTheDocument();
  });
});
