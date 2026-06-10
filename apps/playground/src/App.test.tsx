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

  it("总览使用更紧凑的 Assistant 示例区域", () => {
    render(<App />);

    const preview = screen.getByLabelText("紧凑 Assistant 示例");

    expect(preview).toHaveClass("h-[560px]");
  });

  it("内容滚动时更新滚动边界状态", () => {
    render(<App />);

    const previewArea = screen.getByLabelText("组件预览内容");

    Object.defineProperty(previewArea, "clientHeight", {
      configurable: true,
      value: 400,
    });
    Object.defineProperty(previewArea, "scrollHeight", {
      configurable: true,
      value: 1000,
    });

    expect(previewArea).toHaveAttribute("data-scroll-state", "top");

    previewArea.scrollTop = 120;
    fireEvent.scroll(previewArea);

    expect(previewArea).toHaveAttribute("data-scroll-state", "middle");
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
    expect(screen.getByRole("heading", { name: "Typography" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Select" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Checkbox / RadioGroup" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Table" })).toBeInTheDocument();
  });
});
