import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Attachments } from "./attachments";

describe("Attachments", () => {
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

  it("renders list mode with attachment metadata", () => {
    render(<Attachments items={items} variant="list" />);

    expect(screen.getByText("研究资料.pdf")).toBeInTheDocument();
    expect(screen.getByText("2.4 MB")).toBeInTheDocument();
  });

  it("renders inline mode using compact items", () => {
    render(<Attachments items={items} variant="inline" />);

    const list = screen.getByRole("list");
    expect(list).toHaveClass("flex-row");
  });
});
