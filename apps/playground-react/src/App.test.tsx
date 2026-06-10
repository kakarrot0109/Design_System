import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import App from "./App";

describe("playground", () => {
  it("renders the formal preview overview", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", { name: "总览" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Assistant 示例")).toBeInTheDocument();
  });

  it("navigates to react-ui component gallery", () => {
    render(<App />);

    fireEvent.click(screen.getAllByRole("button", { name: /react-ui/ })[0]);

    expect(screen.getByRole("heading", { name: "Button" })).toBeInTheDocument();
    expect(screen.getByText("Input / Textarea")).toBeInTheDocument();
  });
});
